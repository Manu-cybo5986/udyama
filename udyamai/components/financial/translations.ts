// ============================================================
// UDYAMAI FINANCIAL CALCULATOR - BILINGUAL TRANSLATIONS
// English (en) / Hindi (hi)
// Preserves all text and options from index.html
// ============================================================

export type Language = "en" | "hi";

export interface DropdownOption {
  value: string;
  labelEn: string;
  labelHi: string;
}

export const projectTypeOptions: DropdownOption[] = [
  { value: "Business", labelEn: "Business", labelHi: "व्यवसाय" },
  { value: "Self Employment", labelEn: "Self Employment", labelHi: "स्वरोजगार" },
  { value: "Agriculture", labelEn: "Agriculture", labelHi: "कृषि" },
  { value: "Professional", labelEn: "Professional", labelHi: "पेशेवर" },
  { value: "Artisan / Craft", labelEn: "Artisan / Craft", labelHi: "कारीगर / हस्तशिल्प" },
  { value: "Other", labelEn: "Other", labelHi: "अन्य" },
];

export const targetGroupOptions: DropdownOption[] = [
  { value: "Scheduled Castes", labelEn: "Scheduled Castes", labelHi: "अनुसूचित जाति" },
  { value: "SC", labelEn: "SC", labelHi: "अनुसूचित जाति" },
  { value: "SC women", labelEn: "SC women", labelHi: "अनुसूचित जाति की महिलाएँ" },
  { value: "SC women farmers", labelEn: "SC women farmers", labelHi: "अनुसूचित जाति की महिला किसान" },
  { value: "SC students", labelEn: "SC students", labelHi: "अनुसूचित जाति के विद्यार्थी" },
  { value: "OBC / Backward Classes", labelEn: "OBC / Backward Classes", labelHi: "OBC / पिछड़ा वर्ग" },
  { value: "OBC women", labelEn: "OBC women", labelHi: "OBC महिलाएँ" },
  { value: "Young OBC professionals", labelEn: "Young OBC professionals", labelHi: "युवा OBC पेशेवर" },
  { value: "OBC artisans / craftspersons", labelEn: "OBC artisans / craftspersons", labelHi: "OBC कारीगर / शिल्पकार" },
  { value: "Religious minorities", labelEn: "Religious minorities", labelHi: "धार्मिक अल्पसंख्यक" },
  { value: "ST women", labelEn: "ST women", labelHi: "अनुसूचित जनजाति की महिलाएँ" },
  { value: "Safai Karamcharis / Dependents", labelEn: "Safai Karamcharis / Dependents", labelHi: "सफाई कर्मचारी / आश्रित" },
  { value: "SC/ST and women entrepreneurs", labelEn: "SC/ST and women entrepreneurs", labelHi: "SC/ST एवं महिला उद्यमी" },
];

export const incomeLevelOptions: DropdownOption[] = [
  { value: "Low",    labelEn: "Under ₹1,03,000/yr",             labelHi: "₹1,03,000/वर्ष से कम" },
  { value: "Middle", labelEn: "₹1,03,000 to ₹3,00,000/yr",     labelHi: "₹1,03,000 से ₹3,00,000/वर्ष" },
  { value: "High",   labelEn: "₹3,00,000 to ₹8,00,000/yr",     labelHi: "₹3,00,000 से ₹8,00,000/वर्ष" },
];

export const educationStatusOptions: DropdownOption[] = [
  { value: "School", labelEn: "School", labelHi: "स्कूल" },
  { value: "Graduate", labelEn: "Graduate", labelHi: "स्नातक" },
  { value: "Post Graduate", labelEn: "Post Graduate", labelHi: "स्नातकोत्तर" },
  { value: "Vocational", labelEn: "Vocational", labelHi: "व्यावसायिक" },
  { value: "Other", labelEn: "Other", labelHi: "अन्य" },
];

export const translations = {
  en: {
    // Top bar
    govPrototype: "Government Scheme Assistance Prototype",
    sihTag: "SIH 2026 • SIH26092",
    langButton: "हिन्दी",

    // Header
    brandTag: "SIH 2026 Prototype",
    portalTitle: "National Scheme Matching & Financial Assistance Portal",
    serviceHeaderTitle: "Financial Assistance Services",
    serviceHeaderDesc: "Scheme information, loan calculations and repayment estimates.",

    // Navigation
    navHome: "Home",
    navSchemeMatching: "Scheme Matching",
    navFinancialCalculator: "Financial Calculator",
    navLoanComparison: "Loan Comparison",
    navHelp: "Help & Information",
    navLocator: "Channel Partner Locator",

    // Home
    homeServiceLabel: "UDYAMAI SERVICES",
    homeTitle: "Government Scheme Assistance",
    homeDesc:
      "A student-built prototype for exploring government scheme records and estimating loan repayment values for entrepreneurs.",
    homeCard1Title: "Scheme Matching",
    homeCard1Desc:
      "Enter basic beneficiary details to identify matching scheme records from the supplied scheme dataset.",
    homeCard1Btn: "Find Schemes",
    homeCard2Title: "Financial Calculator",
    homeCard2Desc:
      "Estimate monthly EMI, total interest and total repayment for entered loan details.",
    homeCard2Btn: "Open Calculator",
    homeCard3Title: "Loan Comparison",
    homeCard3Desc:
      "Enter a second loan option and compare the calculated repayment values.",
    homeCard3Btn: "Compare Loans",
    homeNoticeTitle: "Prototype Information",
    homeNoticeDesc:
      "Scheme information shown in this prototype is based on the supplied SIH scheme reference data. Fields marked as not specified are not assumed or invented.",

    // Scheme Matching
    schemeSectionNumber: "01",
    schemeTitle: "Scheme Matching",
    schemeDesc:
      "Enter basic details to identify scheme records matching the selected beneficiary group.",
    projectTypeLabel: "PROJECT TYPE",
    projectTypePlaceholder: "Select project type",
    projectCostLabel: "ESTIMATED PROJECT COST (₹)",
    projectCostPlaceholder: "Enter amount",
    targetGroupLabel: "TARGET BENEFICIARY GROUP",
    targetGroupPlaceholder: "Select beneficiary group",
    incomeLevelLabel: "INCOME LEVEL",
    incomeLevelPlaceholder: "Select income level",
    educationStatusLabel: "EDUCATION STATUS",
    educationStatusPlaceholder: "Select education status",
    findSchemesBtn: "Find Suitable Schemes",
    noMatchMessage:
      "No scheme matched the selected target beneficiary group in the supplied scheme reference data.",
    nodalBodyLabel: "Nodal Body",
    targetGroupCardLabel: "Target Group",
    loanAmountCardLabel: "Loan Amount",
    financingCardLabel: "Project-Cost Financing",
    interestCardLabel: "Interest / Credit",
    tenureCardLabel: "Repayment Tenure",
    benefitCardLabel: "Benefit / Support",
    sourceCardLabel: "Source:",
    notSpecified: "Not specified",

    // Financial Calculator
    calcServiceLabel: "FINANCIAL SERVICES",
    calcTitle: "Financial Calculator",
    calcDesc:
      "Calculate estimated monthly EMI, total interest and total repayment for a loan.",
    step1: "STEP 1",
    step1Label: "Loan Details",
    step2: "STEP 2",
    step2Label: "Calculation",
    step3: "STEP 3",
    step3Label: "Results",
    loanAmountLabel: "LOAN AMOUNT (₹)",
    loanAmountPlaceholder: "Enter loan amount",
    annualRateLabel: "ANNUAL INTEREST RATE (%)",
    annualRatePlaceholder: "Example: 8.5",
    yearsLabel: "LOAN TENURE (YEARS)",
    yearsPlaceholder: "Example: 5",
    monthlyIncomeLabel: "MONTHLY BUSINESS INCOME (₹)",
    monthlyIncomePlaceholder: "Enter monthly income",
    calculateEmiBtn: "Calculate EMI",
    resetBtn: "Reset",

    calcResultsTitle: "Calculation Results",
    monthlyEmiLabel: "MONTHLY EMI",
    totalInterestLabel: "TOTAL INTEREST",
    totalPaymentLabel: "TOTAL REPAYMENT",

    repaymentInsightTitle: "Repayment Insight",
    defaultInsightText:
      "Enter your loan details above to estimate your monthly repayment and total interest.",
    ratioHeader: "EMI / Monthly Income",
    defaultRatioStatus: "Enter your details to see your repayment ratio.",
    ratioLowMsg:
      "Your estimated EMI represents less than 20% of the entered monthly business income.",
    ratioMidMsg:
      "Your estimated EMI represents 20%–30% of the entered monthly business income.",
    ratioHighMsg:
      "Your estimated EMI represents 30% or more of the entered monthly business income.",

    affordabilityTitle: "Income Affordability View",
    affordIncomeLabel: "MONTHLY INCOME",
    affordEmiLabel: "ESTIMATED EMI",
    remainingIncomeLabel: "REMAINING INCOME",
    defaultAffordabilityStatus: "Enter your details to check affordability.",
    affordabilityBelow30:
      "EMI is below 30% of the entered monthly business income. This is an informational calculation, not an official eligibility rule.",
    affordabilityAbove30:
      "EMI is 30% or more of the entered monthly business income. This is an informational calculation, not an official eligibility rule.",

    // Loan Comparison
    compareTitle: "Loan Comparison",
    compareDesc: "Compare the repayment values of two entered loan options.",
    compareMiniTitle: "Alternative Loan Details",
    compareAmountLabel: "ALTERNATIVE LOAN AMOUNT (₹)",
    compareAmountPlaceholder: "Enter amount",
    compareRateLabel: "ALTERNATIVE INTEREST RATE (%)",
    compareRatePlaceholder: "Example: 10",
    compareYearsLabel: "ALTERNATIVE TENURE (YEARS)",
    compareYearsPlaceholder: "Example: 5",
    compareLoansBtn: "Compare Loans",
    compareResultsTitle: "Comparison Results",
    particularHeader: "Particular",
    currentLoanHeader: "Current Loan",
    alternativeLoanHeader: "Alternative Loan",
    defaultCompareSummary: "Enter both loan options to compare them.",

    // Channel Partner Locator
    locatorSectionNumber: "04",
    locatorTitle: "Channel Partner Locator",
    locatorDesc: "Locate nearby State Credit Agencies, Rural Banks, NBFCs and other lending institutions on the map. Use the filters to find the right partner for your scheme.",
    locatorCategoryLabel: "Filter by Category",
    locatorRegionLabel: "Filter by Region",
    locatorAllCategories: "All Categories",
    locatorAllRegions: "All Regions",
    locatorNPANotice: "Partners with high NPA are excluded from this map as per lending norms.",

    // Help & Information
    helpTitle: "Help & Information",
    helpDesc: "Important information about this prototype and its calculations.",
    help1Title: "Scheme Data",
    help1Desc:
      "Scheme information displayed by the prototype comes from the supplied SIH scheme reference data.",
    help2Title: "Financial Calculator",
    help2Desc:
      "EMI, total interest and total repayment are calculated from the loan amount, annual interest rate and tenure entered by the user.",
    help3Title: "Unspecified Values",
    help3Desc:
      "Where the supplied scheme reference does not specify an interest rate, loan limit or repayment tenure, the prototype displays Not specified rather than assuming a value.",
    help4Title: "Important Note",
    help4Desc:
      "Calculator outputs are estimates based on the values entered by the user. They are not an official sanction, approval or eligibility decision.",

    // Footer
    footerPrototypeTag: "Financial Assistance Prototype",
  },

  hi: {
    // Top bar
    govPrototype: "सरकारी योजना सहायता प्रोटोटाइप",
    sihTag: "SIH 2026 • SIH26092",
    langButton: "English",

    // Header
    brandTag: "SIH 2026 प्रोटोटाइप",
    portalTitle: "राष्ट्रीय योजना मिलान एवं वित्तीय सहायता पोर्टल",
    serviceHeaderTitle: "वित्तीय सहायता सेवाएँ",
    serviceHeaderDesc: "योजना की जानकारी, ऋण गणना और पुनर्भुगतान का अनुमान।",

    // Navigation
    navHome: "होम",
    navSchemeMatching: "योजना मिलान",
    navFinancialCalculator: "वित्तीय कैलकुलेटर",
    navLoanComparison: "ऋण तुलना",
    navHelp: "सहायता एवं जानकारी",
    navLocator: "चैनल पार्टनर लोकेटर",

    // Home
    homeServiceLabel: "उद्यमAI सेवाएँ",
    homeTitle: "सरकारी योजना सहायता",
    homeDesc:
      "उद्यमियों के लिए सरकारी योजना रिकॉर्ड देखने और ऋण पुनर्भुगतान का अनुमान लगाने हेतु छात्र द्वारा बनाया गया प्रोटोटाइप।",
    homeCard1Title: "योजना मिलान",
    homeCard1Desc:
      "दिए गए योजना डेटासेट से मिलान करने वाली योजना रिकॉर्ड खोजने के लिए लाभार्थी की मूल जानकारी दर्ज करें।",
    homeCard1Btn: "योजनाएँ खोजें",
    homeCard2Title: "वित्तीय कैलकुलेटर",
    homeCard2Desc:
      "दर्ज ऋण विवरण के आधार पर मासिक EMI, कुल ब्याज और कुल पुनर्भुगतान का अनुमान लगाएँ।",
    homeCard2Btn: "कैलकुलेटर खोलें",
    homeCard3Title: "ऋण तुलना",
    homeCard3Desc:
      "दूसरे ऋण विकल्प का विवरण दर्ज करके पुनर्भुगतान मूल्यों की तुलना करें।",
    homeCard3Btn: "ऋणों की तुलना करें",
    homeNoticeTitle: "प्रोटोटाइप जानकारी",
    homeNoticeDesc:
      "इस प्रोटोटाइप में दिखाई गई योजना जानकारी उपलब्ध कराए गए SIH योजना संदर्भ डेटा पर आधारित है। 'Not specified' वाले क्षेत्रों के लिए कोई मान अनुमानित या बनाया नहीं गया है।",

    // Scheme Matching
    schemeSectionNumber: "01",
    schemeTitle: "योजना मिलान",
    schemeDesc:
      "चयनित लाभार्थी समूह से संबंधित योजना रिकॉर्ड खोजने के लिए मूल जानकारी दर्ज करें।",
    projectTypeLabel: "परियोजना का प्रकार",
    projectTypePlaceholder: "परियोजना का प्रकार चुनें",
    projectCostLabel: "अनुमानित परियोजना लागत (₹)",
    projectCostPlaceholder: "राशि दर्ज करें",
    targetGroupLabel: "लक्षित लाभार्थी समूह",
    targetGroupPlaceholder: "लाभार्थी समूह चुनें",
    incomeLevelLabel: "आय स्तर",
    incomeLevelPlaceholder: "आय स्तर चुनें",
    educationStatusLabel: "शैक्षणिक स्थिति",
    educationStatusPlaceholder: "शैक्षणिक स्थिति चुनें",
    findSchemesBtn: "उपयुक्त योजनाएँ खोजें",
    noMatchMessage:
      "दिए गए योजना संदर्भ डेटा में चयनित लक्षित लाभार्थी समूह से कोई योजना मेल नहीं खाती।",
    nodalBodyLabel: "नोडल संस्था",
    targetGroupCardLabel: "लक्षित समूह",
    loanAmountCardLabel: "ऋण राशि",
    financingCardLabel: "परियोजना लागत वित्तपोषण",
    interestCardLabel: "ब्याज / ऋण सहायता",
    tenureCardLabel: "पुनर्भुगतान अवधि",
    benefitCardLabel: "लाभ / सहायता",
    sourceCardLabel: "स्रोत:",
    notSpecified: "निर्दिष्ट नहीं है",

    // Financial Calculator
    calcServiceLabel: "वित्तीय सेवाएँ",
    calcTitle: "वित्तीय कैलकुलेटर",
    calcDesc:
      "ऋण के लिए अनुमानित मासिक EMI, कुल ब्याज और कुल पुनर्भुगतान की गणना करें।",
    step1: "चरण 1",
    step1Label: "ऋण विवरण",
    step2: "चरण 2",
    step2Label: "गणना",
    step3: "चरण 3",
    step3Label: "परिणाम",
    loanAmountLabel: "ऋण राशि (₹)",
    loanAmountPlaceholder: "ऋण राशि दर्ज करें",
    annualRateLabel: "वार्षिक ब्याज दर (%)",
    annualRatePlaceholder: "उदाहरण: 8.5",
    yearsLabel: "ऋण अवधि (वर्ष)",
    yearsPlaceholder: "उदाहरण: 5",
    monthlyIncomeLabel: "मासिक व्यावसायिक आय (₹)",
    monthlyIncomePlaceholder: "मासिक आय दर्ज करें",
    calculateEmiBtn: "EMI की गणना करें",
    resetBtn: "रीसेट",

    calcResultsTitle: "गणना परिणाम",
    monthlyEmiLabel: "मासिक EMI",
    totalInterestLabel: "कुल ब्याज",
    totalPaymentLabel: "कुल पुनर्भुगतान",

    repaymentInsightTitle: "पुनर्भुगतान जानकारी",
    defaultInsightText:
      "मासिक पुनर्भुगतान और कुल ब्याज का अनुमान लगाने के लिए ऊपर ऋण विवरण दर्ज करें।",
    ratioHeader: "EMI / मासिक आय",
    defaultRatioStatus: "पुनर्भुगतान अनुपात देखने के लिए अपना विवरण दर्ज करें।",
    ratioLowMsg:
      "आपकी अनुमानित EMI दर्ज मासिक व्यावसायिक आय के 20% से कम है।",
    ratioMidMsg:
      "आपकी अनुमानित EMI दर्ज मासिक व्यावसायिक आय का 20%–30% है।",
    ratioHighMsg:
      "आपकी अनुमानित EMI दर्ज मासिक व्यावसायिक आय का 30% या अधिक है।",

    affordabilityTitle: "आय वहनीयता विवरण",
    affordIncomeLabel: "मासिक आय",
    affordEmiLabel: "अनुमानित EMI",
    remainingIncomeLabel: "शेष आय",
    defaultAffordabilityStatus: "वहनीयता देखने के लिए अपना विवरण दर्ज करें।",
    affordabilityBelow30:
      "EMI दर्ज मासिक व्यावसायिक आय के 30% से कम है। यह एक सूचनात्मक गणना है, आधिकारिक पात्रता नियम नहीं।",
    affordabilityAbove30:
      "EMI दर्ज मासिक व्यावसायिक आय का 30% या अधिक है। यह एक सूचनात्मक गणना है, आधिकारिक पात्रता नियम नहीं।",

    // Loan Comparison
    compareTitle: "ऋण तुलना",
    compareDesc: "दो दर्ज किए गए ऋण विकल्पों के पुनर्भुगतान मूल्यों की तुलना करें।",
    compareMiniTitle: "वैकल्पिक ऋण विवरण",
    compareAmountLabel: "वैकल्पिक ऋण राशि (₹)",
    compareAmountPlaceholder: "राशि दर्ज करें",
    compareRateLabel: "वैकल्पिक ब्याज दर (%)",
    compareRatePlaceholder: "उदाहरण: 10",
    compareYearsLabel: "वैकल्पिक अवधि (वर्ष)",
    compareYearsPlaceholder: "उदाहरण: 5",
    compareLoansBtn: "ऋणों की तुलना करें",
    compareResultsTitle: "तुलना परिणाम",
    particularHeader: "विवरण",
    currentLoanHeader: "वर्तमान ऋण",
    alternativeLoanHeader: "वैकल्पिक ऋण",
    defaultCompareSummary: "तुलना करने के लिए दोनों ऋण विकल्प दर्ज करें।",

    // Channel Partner Locator
    locatorSectionNumber: "04",
    locatorTitle: "चैनल पार्टनर लोकेटर",
    locatorDesc: "मानचित्र पर नजदीकी राज्य क्रेडिट एजेंसियों, ग्रामीण बैंकों, NBFCs और अन्य ऋण संस्थाओं का पता लगाएं। सही पार्टनर खोजने के लिए फ़िल्टर का उपयोग करें।",
    locatorCategoryLabel: "श्रेणी के अनुसार फ़िल्टर करें",
    locatorRegionLabel: "क्षेत्र के अनुसार फ़िल्टर करें",
    locatorAllCategories: "सभी श्रेणियाँ",
    locatorAllRegions: "सभी क्षेत्र",
    locatorNPANotice: "ऋण मानदंडों के अनुसार उच्च NPA वाले पार्टनरों को इस मानचित्र से बाहर रखा गया है।",

    // Help & Information
    helpTitle: "सहायता एवं जानकारी",
    helpDesc: "इस प्रोटोटाइप और इसकी गणनाओं से संबंधित महत्वपूर्ण जानकारी।",
    help1Title: "योजना डेटा",
    help1Desc:
      "प्रोटोटाइप में दिखाई गई योजना जानकारी उपलब्ध कराए गए SIH योजना संदर्भ डेटा से ली गई है।",
    help2Title: "वित्तीय कैलकुलेटर",
    help2Desc:
      "EMI, कुल ब्याज और कुल पुनर्भुगतान की गणना उपयोगकर्ता द्वारा दर्ज ऋण राशि, वार्षिक ब्याज दर और अवधि से की जाती है।",
    help3Title: "निर्दिष्ट नहीं किए गए मान",
    help3Desc:
      "जहाँ उपलब्ध योजना संदर्भ में ब्याज दर, ऋण सीमा या पुनर्भुगतान अवधि निर्दिष्ट नहीं है, वहाँ प्रोटोटाइप कोई मान मानने के बजाय Not specified दिखाता है।",
    help4Title: "महत्वपूर्ण सूचना",
    help4Desc:
      "कैलकुलेटर के परिणाम उपयोगकर्ता द्वारा दर्ज मानों पर आधारित अनुमान हैं। ये किसी आधिकारिक स्वीकृति, अनुमोदन या पात्रता का निर्णय नहीं हैं।",

    // Footer
    footerPrototypeTag: "वित्तीय सहायता प्रोटोटाइप",
  },
};
