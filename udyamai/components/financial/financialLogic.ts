// ============================================================
// UDYAMAI FINANCIAL CALCULATOR - CORE LOGIC & TYPES
// SIH 2026 | SIH26092
// Converted from script.js to TypeScript
// ============================================================

export interface Scheme {
  id: number;
  schemeName: string;
  organization: string;
  schemeType: string;
  targetBeneficiary: string;
  loanAmount: string;
  financing: string;
  interestRate: string;
  tenure: string;
  benefits: string;
  officialSource: string;
}

export interface LoanCalculationResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

export interface LoanComparisonResult {
  current: LoanCalculationResult;
  alternative: LoanCalculationResult;
  interestDifference: number;
}

export interface AffordabilityResult {
  repaymentRatio: number;
  remainingIncome: number;
  isAffordable: boolean;
}

// ============================================================
// CURRENCY FORMATTER
// ============================================================

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) {
    return "₹0.00";
  }

  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ============================================================
// LOAN CALCULATION (Exact implementation from script.js)
// ============================================================

export function calculateLoan(
  loanAmount: number,
  annualRate: number,
  years: number
): LoanCalculationResult {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  let emi: number;

  // Zero-interest case
  if (monthlyRate === 0) {
    emi = loanAmount / months;
  } else {
    emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  return {
    emi,
    totalInterest,
    totalPayment,
  };
}

// ============================================================
// AFFORDABILITY CALCULATION
// ============================================================

export function calculateAffordability(
  emi: number,
  monthlyIncome: number
): AffordabilityResult {
  const repaymentRatio = monthlyIncome > 0 ? (emi / monthlyIncome) * 100 : 0;
  const remainingIncome = Math.max(monthlyIncome - emi, 0);
  const isAffordable = repaymentRatio < 30;

  return {
    repaymentRatio,
    remainingIncome,
    isAffordable,
  };
}

// ============================================================
// LOAN COMPARISON
// ============================================================

export function compareLoanScenarios(
  currentAmount: number,
  currentRate: number,
  currentYears: number,
  alternativeAmount: number,
  alternativeRate: number,
  alternativeYears: number
): LoanComparisonResult {
  const current = calculateLoan(currentAmount, currentRate, currentYears);
  const alternative = calculateLoan(
    alternativeAmount,
    alternativeRate,
    alternativeYears
  );
  const interestDifference = Math.abs(
    current.totalInterest - alternative.totalInterest
  );

  return {
    current,
    alternative,
    interestDifference,
  };
}

// ============================================================
// TEXT NORMALIZATION & SCHEME MATCHING
// ============================================================

export function normalizeText(value: string): string {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function filterSchemes(
  schemes: Scheme[],
  targetGroup: string
): Scheme[] {
  const normalizedTarget = normalizeText(targetGroup);

  if (!normalizedTarget) return [];

  return schemes.filter((scheme) => {
    if (!scheme.targetBeneficiary) return false;
    return normalizeText(scheme.targetBeneficiary) === normalizedTarget;
  });
}

// ============================================================
// VALIDATION HELPERS
// ============================================================

export interface ValidationResult {
  isValid: boolean;
  field?: string;
  errorMessageEn: string;
  errorMessageHi: string;
}

export function validateLoanInputs(
  loanAmount: number,
  annualRate: number,
  years: number,
  monthlyIncome: number
): ValidationResult {
  if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
    return {
      isValid: false,
      field: "loanAmount",
      errorMessageEn: "Please enter a loan amount greater than ₹0.",
      errorMessageHi: "कृपया ₹0 से अधिक की ऋण राशि दर्ज करें।",
    };
  }

  if (!Number.isFinite(annualRate) || annualRate < 0 || annualRate > 100) {
    return {
      isValid: false,
      field: "annualRate",
      errorMessageEn: "Please enter an interest rate between 0% and 100%.",
      errorMessageHi: "कृपया 0% से 100% के बीच ब्याज दर दर्ज करें।",
    };
  }

  if (!Number.isFinite(years) || years <= 0 || years > 30) {
    return {
      isValid: false,
      field: "years",
      errorMessageEn: "Please enter a loan tenure between 1 and 30 years.",
      errorMessageHi: "कृपया 1 से 30 वर्ष के बीच ऋण अवधि दर्ज करें।",
    };
  }

  if (!Number.isFinite(monthlyIncome) || monthlyIncome <= 0) {
    return {
      isValid: false,
      field: "monthlyIncome",
      errorMessageEn: "Please enter a monthly business income greater than ₹0.",
      errorMessageHi: "कृपया ₹0 से अधिक मासिक व्यावसायिक आय दर्ज करें।",
    };
  }

  return { isValid: true, errorMessageEn: "", errorMessageHi: "" };
}

export function validateAlternativeLoan(
  amount: number,
  rate: number,
  years: number
): ValidationResult {
  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      isValid: false,
      field: "compareAmount",
      errorMessageEn: "Please enter a valid alternative loan amount.",
      errorMessageHi: "कृपया एक वैध वैकल्पिक ऋण राशि दर्ज करें।",
    };
  }

  if (!Number.isFinite(rate) || rate < 0 || rate > 100) {
    return {
      isValid: false,
      field: "compareRate",
      errorMessageEn:
        "Please enter an alternative interest rate between 0% and 100%.",
      errorMessageHi: "कृपया 0% से 100% के बीच वैकल्पिक ब्याज दर दर्ज करें।",
    };
  }

  if (!Number.isFinite(years) || years <= 0 || years > 30) {
    return {
      isValid: false,
      field: "compareYears",
      errorMessageEn:
        "Please enter an alternative loan tenure between 1 and 30 years.",
      errorMessageHi: "कृपया 1 से 30 वर्ष के बीच वैकल्पिक ऋण अवधि दर्ज करें।",
    };
  }

  return { isValid: true, errorMessageEn: "", errorMessageHi: "" };
}

export function validateSchemeInputs(
  projectType: string,
  projectCost: number,
  targetGroup: string,
  incomeLevel: string,
  educationStatus: string
): ValidationResult {
  if (!projectType) {
    return {
      isValid: false,
      field: "projectType",
      errorMessageEn: "Please select a project type.",
      errorMessageHi: "कृपया परियोजना का प्रकार चुनें।",
    };
  }

  if (!Number.isFinite(projectCost) || projectCost <= 0) {
    return {
      isValid: false,
      field: "projectCost",
      errorMessageEn: "Please enter an estimated project cost greater than ₹0.",
      errorMessageHi: "कृपया ₹0 से अधिक अनुमानित परियोजना लागत दर्ज करें।",
    };
  }

  if (!targetGroup) {
    return {
      isValid: false,
      field: "targetGroup",
      errorMessageEn: "Please select a target beneficiary group.",
      errorMessageHi: "कृपया लक्षित लाभार्थी समूह चुनें।",
    };
  }

  if (!incomeLevel) {
    return {
      isValid: false,
      field: "incomeLevel",
      errorMessageEn: "Please select an income level.",
      errorMessageHi: "कृपया आय स्तर चुनें।",
    };
  }

  if (!educationStatus) {
    return {
      isValid: false,
      field: "educationStatus",
      errorMessageEn: "Please select an education status.",
      errorMessageHi: "कृपया शैक्षणिक स्थिति चुनें।",
    };
  }

  return { isValid: true, errorMessageEn: "", errorMessageHi: "" };
}
