"use client";

import React, { useState, useEffect, useId } from "react";
import dynamic from "next/dynamic";
import "./financial.css";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: "460px",
      background: "#e8edf5",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#172354",
      fontSize: "14px",
      fontWeight: 600,
      border: "1px solid #ccd7e6",
    }}>Loading map…</div>
  ),
});
import schemesData from "@/data/schemes.json";
import {
  Scheme,
  LoanCalculationResult,
  LoanComparisonResult,
  AffordabilityResult,
  calculateLoan,
  calculateAffordability,
  compareLoanScenarios,
  filterSchemes,
  formatCurrency,
  validateLoanInputs,
  validateAlternativeLoan,
  validateSchemeInputs,
} from "./financialLogic";
import {
  Language,
  translations,
  projectTypeOptions,
  targetGroupOptions,
  incomeLevelOptions,
  educationStatusOptions,
} from "./translations";

type TabSection =
  | "home"
  | "schemeMatching"
  | "financialCalculator"
  | "loanComparison"
  | "locator"
  | "help";

export default function FinancialCalculator() {
  const [lang, setLanguage] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState<TabSection>("home");
  const [fontScale, setFontScale] = useState<number>(100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as TabSection | null;
      if (
        tabParam &&
        [
          "home",
          "schemeMatching",
          "financialCalculator",
          "loanComparison",
          "locator",
          "help",
        ].includes(tabParam)
      ) {
        setActiveTab(tabParam);
      }
      const langParam = params.get("lang") as Language | null;
      if (langParam && (langParam === "en" || langParam === "hi")) {
        setLanguage(langParam);
      }
    }
  }, []);

  // Form IDs for accessibility
  const projectTypeId = useId();
  const projectCostId = useId();
  const targetGroupId = useId();
  const incomeLevelId = useId();
  const educationStatusId = useId();

  const loanAmountId = useId();
  const annualRateId = useId();
  const yearsId = useId();
  const monthlyIncomeId = useId();

  const compareAmountId = useId();
  const compareRateId = useId();
  const compareYearsId = useId();

  const t = translations[lang];

  // -------------------------------------------------------------------------
  // Financial Calculator State
  // -------------------------------------------------------------------------
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [annualRate, setAnnualRate] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");

  const [calcResult, setCalcResult] = useState<LoanCalculationResult | null>(
    null
  );
  const [affordability, setAffordability] =
    useState<AffordabilityResult | null>(null);
  const [calcError, setCalcError] = useState<string>("");

  // -------------------------------------------------------------------------
  // Loan Comparison State
  // -------------------------------------------------------------------------
  const [compareAmount, setCompareAmount] = useState<string>("");
  const [compareRate, setCompareRate] = useState<string>("");
  const [compareYears, setCompareYears] = useState<string>("");

  const [comparisonResult, setComparisonResult] =
    useState<LoanComparisonResult | null>(null);
  const [compareError, setCompareError] = useState<string>("");

  // -------------------------------------------------------------------------
  // Scheme Matching State
  // -------------------------------------------------------------------------
  const [projectType, setProjectType] = useState<string>("");
  const [projectCost, setProjectCost] = useState<string>("");
  const [targetGroup, setTargetGroup] = useState<string>("");
  const [incomeLevel, setIncomeLevel] = useState<string>("");
  const [educationStatus, setEducationStatus] = useState<string>("");

  const [matchedSchemes, setMatchedSchemes] = useState<Scheme[] | null>(null);
  const [schemeError, setSchemeError] = useState<string>("");

  // -------------------------------------------------------------------------
  // Handlers: Calculation
  // -------------------------------------------------------------------------
  const handleCalculateEMI = () => {
    setCalcError("");

    const p = parseFloat(loanAmount);
    const r = parseFloat(annualRate);
    const y = parseFloat(years);
    const inc = parseFloat(monthlyIncome);

    const validation = validateLoanInputs(p, r, y, inc);
    if (!validation.isValid) {
      setCalcError(
        lang === "hi" ? validation.errorMessageHi : validation.errorMessageEn
      );
      return;
    }

    const result = calculateLoan(p, r, y);
    const afford = calculateAffordability(result.emi, inc);

    setCalcResult(result);
    setAffordability(afford);
  };

  const handleResetCalculator = () => {
    setLoanAmount("");
    setAnnualRate("");
    setYears("");
    setMonthlyIncome("");
    setCalcResult(null);
    setAffordability(null);
    setCalcError("");

    setCompareAmount("");
    setCompareRate("");
    setCompareYears("");
    setComparisonResult(null);
    setCompareError("");
  };

  // -------------------------------------------------------------------------
  // Handlers: Loan Comparison
  // -------------------------------------------------------------------------
  const handleCompareLoans = () => {
    setCompareError("");

    const currentP = parseFloat(loanAmount);
    const currentR = parseFloat(annualRate);
    const currentY = parseFloat(years);

    // Validate current baseline loan details first
    if (
      !Number.isFinite(currentP) ||
      currentP <= 0 ||
      !Number.isFinite(currentR) ||
      currentR < 0 ||
      !Number.isFinite(currentY) ||
      currentY <= 0
    ) {
      setCompareError(
        lang === "hi"
          ? "कृपया पहले वर्तमान ऋण का वैध विवरण दर्ज करें।"
          : "Please enter valid current loan details in the calculator section first."
      );
      return;
    }

    const altP = parseFloat(compareAmount);
    const altR = parseFloat(compareRate);
    const altY = parseFloat(compareYears);

    const validation = validateAlternativeLoan(altP, altR, altY);
    if (!validation.isValid) {
      setCompareError(
        lang === "hi" ? validation.errorMessageHi : validation.errorMessageEn
      );
      return;
    }

    const comparison = compareLoanScenarios(
      currentP,
      currentR,
      currentY,
      altP,
      altR,
      altY
    );
    setComparisonResult(comparison);
  };

  // -------------------------------------------------------------------------
  // Handlers: Scheme Matching
  // -------------------------------------------------------------------------
  const handleFindSchemes = () => {
    setSchemeError("");

    const cost = parseFloat(projectCost);
    const validation = validateSchemeInputs(
      projectType,
      cost,
      targetGroup,
      incomeLevel,
      educationStatus
    );

    if (!validation.isValid) {
      setSchemeError(
        lang === "hi" ? validation.errorMessageHi : validation.errorMessageEn
      );
      return;
    }

    const matched = filterSchemes(schemesData as Scheme[], targetGroup);
    setMatchedSchemes(matched);
  };

  // -------------------------------------------------------------------------
  // Narrative insight text generator (matching script.js)
  // -------------------------------------------------------------------------
  const getInsightParagraph = () => {
    if (!calcResult || !affordability) {
      return t.defaultInsightText;
    }

    const p = parseFloat(loanAmount);
    const r = parseFloat(annualRate);
    const y = parseFloat(years);
    const inc = parseFloat(monthlyIncome);
    const ratioStr = affordability.repaymentRatio.toFixed(1);

    if (lang === "hi") {
      return `${formatCurrency(p)} के ऋण के लिए ${r}% ब्याज पर ${y} वर्षों हेतु आपकी अनुमानित मासिक EMI ${formatCurrency(calcResult.emi)} है। यह EMI आपकी दर्ज मासिक आय ${formatCurrency(inc)} का लगभग ${ratioStr}% है। संपूर्ण ऋण अवधि में कुल ब्याज लगभग ${formatCurrency(calcResult.totalInterest)} होगा।`;
    }

    return `For a ${formatCurrency(p)} loan at ${r}% interest for ${y} years, your estimated monthly EMI is ${formatCurrency(calcResult.emi)}. Your EMI is approximately ${ratioStr}% of your entered monthly business income of ${formatCurrency(inc)}. Total interest over the loan period is approximately ${formatCurrency(calcResult.totalInterest)}.`;
  };

  const getRatioStatusText = () => {
    if (!affordability) return t.defaultRatioStatus;
    const ratio = affordability.repaymentRatio;
    if (ratio < 20) return t.ratioLowMsg;
    if (ratio < 30) return t.ratioMidMsg;
    return t.ratioHighMsg;
  };

  // -------------------------------------------------------------------------
  // Comparison summary generator (matching script.js)
  // -------------------------------------------------------------------------
  const getComparisonSummary = () => {
    if (!comparisonResult) return t.defaultCompareSummary;

    const diff = formatCurrency(comparisonResult.interestDifference);
    const curInt = formatCurrency(comparisonResult.current.totalInterest);
    const altInt = formatCurrency(comparisonResult.alternative.totalInterest);

    if (lang === "hi") {
      return `दोनों विकल्पों के कुल ब्याज में लगभग ${diff} का अंतर है। दर्ज मानों के आधार पर, वर्तमान ऋण पर कुल ब्याज ${curInt} है, जबकि वैकल्पिक ऋण पर कुल ब्याज ${altInt} है।`;
    }

    return `The two options differ by approximately ${diff} in total interest. Based on the entered values, the current loan has total interest of ${curInt}, while the alternative has total interest of ${altInt}.`;
  };

  return (
    <div
      className="financial-portal"
      style={{ fontSize: `${fontScale}%` }}
      lang={lang}
    >
      {/* =======================================================
          TOP BAR (Gov Bar)
      ======================================================== */}
      <div className="gov-bar">
        <div className="gov-left">
          <span className="gov-dot"></span>
          <strong>{t.govPrototype}</strong>
          <span className="gov-divider">|</span>
          <span>{t.sihTag}</span>
        </div>

        <div className="gov-right">
          <button
            type="button"
            aria-label="Helpline"
            onClick={() => alert("Helpline: 1800-11-2026 (SIH Prototype)")}
          >
            ☎
          </button>
          <button
            type="button"
            aria-label="Decrease Font Size"
            onClick={() => setFontScale((s) => Math.max(85, s - 5))}
          >
            A-
          </button>
          <button
            type="button"
            aria-label="Reset Font Size"
            onClick={() => setFontScale(100)}
          >
            A
          </button>
          <button
            type="button"
            aria-label="Increase Font Size"
            onClick={() => setFontScale((s) => Math.min(120, s + 5))}
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => setLanguage((l) => (l === "en" ? "hi" : "en"))}
          >
            {t.langButton}
          </button>
        </div>
      </div>

      {/* =======================================================
          MAIN HEADER
      ======================================================== */}
      <header className="main-header">
        <div className="brand-area">
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              color: "inherit",
            }}
            title="Go to UdyamAI Portal Home"
          >
            <div className="brand-emblem">✺</div>
            <div className="brand-text">
              <h1>
                Udyam<span>AI</span>
              </h1>
              <div className="brand-tag">{t.brandTag}</div>
              <p>{t.portalTitle}</p>
            </div>
          </a>
        </div>

        <div className="header-information">
          <strong>{t.serviceHeaderTitle}</strong>
          <p>{t.serviceHeaderDesc}</p>
        </div>
      </header>

      {/* =======================================================
          NAVIGATION TABS
      ======================================================== */}
      <nav className="main-nav" aria-label="Financial Navigation">
        <div className="nav-inner">
          <a
            href="/"
            className="nav-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            ← {lang === "hi" ? "मुख्य पृष्ठ" : "Portal Home"}
          </a>
          <button
            type="button"
            className={`nav-link ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            {t.navHome}
          </button>
          <button
            type="button"
            className={`nav-link ${
              activeTab === "schemeMatching" ? "active" : ""
            }`}
            onClick={() => setActiveTab("schemeMatching")}
          >
            {t.navSchemeMatching}
          </button>
          <button
            type="button"
            className={`nav-link ${
              activeTab === "financialCalculator" ? "active" : ""
            }`}
            onClick={() => setActiveTab("financialCalculator")}
          >
            {t.navFinancialCalculator}
          </button>
          <button
            type="button"
            className={`nav-link ${
              activeTab === "loanComparison" ? "active" : ""
            }`}
            onClick={() => setActiveTab("loanComparison")}
          >
            {t.navLoanComparison}
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === "locator" ? "active" : ""}`}
            onClick={() => setActiveTab("locator")}
          >
            {t.navLocator}
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === "help" ? "active" : ""}`}
            onClick={() => setActiveTab("help")}
          >
            {t.navHelp}
          </button>
        </div>
      </nav>

      {/* =======================================================
          MAIN CONTENT AREA
      ======================================================== */}
      <main className="page-section">
        <div className="page-container">
          {/* ----------------------------------------------------
              SECTION: HOME
          ----------------------------------------------------- */}
          {activeTab === "home" && (
            <section className="hero-section">
              <div className="service-label">{t.homeServiceLabel}</div>
              <h2>{t.homeTitle}</h2>
              <p className="hero-description">{t.homeDesc}</p>

              <div className="home-grid">
                {/* CARD 1 */}
                <div className="home-card">
                  <div className="home-card-number">01</div>
                  <h3>{t.homeCard1Title}</h3>
                  <p>{t.homeCard1Desc}</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setActiveTab("schemeMatching")}
                  >
                    {t.homeCard1Btn}
                  </button>
                </div>

                {/* CARD 2 */}
                <div className="home-card">
                  <div className="home-card-number">02</div>
                  <h3>{t.homeCard2Title}</h3>
                  <p>{t.homeCard2Desc}</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setActiveTab("financialCalculator")}
                  >
                    {t.homeCard2Btn}
                  </button>
                </div>

                {/* CARD 3 */}
                <div className="home-card">
                  <div className="home-card-number">03</div>
                  <h3>{t.homeCard3Title}</h3>
                  <p>{t.homeCard3Desc}</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setActiveTab("loanComparison")}
                  >
                    {t.homeCard3Btn}
                  </button>
                </div>

                {/* CARD 4 */}
                <div className="home-card">
                  <div className="home-card-number">04</div>
                  <h3>{t.locatorTitle}</h3>
                  <p>
                    Locate nearby Channel Partners — SCAs, RRBs, NBFCs and
                    Banks — on an interactive map.
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setActiveTab("locator")}
                  >
                    Open Map
                  </button>
                </div>
              </div>

              <div className="home-notice">
                <strong>{t.homeNoticeTitle}</strong>
                <p>{t.homeNoticeDesc}</p>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------
              SECTION: SCHEME MATCHING
          ----------------------------------------------------- */}
          {activeTab === "schemeMatching" && (
            <section>
              <div className="section-header">
                <div>
                  <span className="section-number">
                    {t.schemeSectionNumber}
                  </span>
                  <h2>{t.schemeTitle}</h2>
                </div>
                <p>{t.schemeDesc}</p>
              </div>

              <div className="form-card">
                <div className="form-grid">
                  {/* PROJECT TYPE */}
                  <div className="form-group">
                    <label htmlFor={projectTypeId}>{t.projectTypeLabel}</label>
                    <select
                      id={projectTypeId}
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                    >
                      <option value="">{t.projectTypePlaceholder}</option>
                      {projectTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {lang === "hi" ? opt.labelHi : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PROJECT COST */}
                  <div className="form-group">
                    <label htmlFor={projectCostId}>{t.projectCostLabel}</label>
                    <input
                      type="number"
                      id={projectCostId}
                      value={projectCost}
                      placeholder={t.projectCostPlaceholder}
                      onChange={(e) => setProjectCost(e.target.value)}
                      min="1"
                      step="1"
                    />
                  </div>

                  {/* TARGET GROUP */}
                  <div className="form-group">
                    <label htmlFor={targetGroupId}>{t.targetGroupLabel}</label>
                    <select
                      id={targetGroupId}
                      value={targetGroup}
                      onChange={(e) => setTargetGroup(e.target.value)}
                    >
                      <option value="">{t.targetGroupPlaceholder}</option>
                      {targetGroupOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {lang === "hi" ? opt.labelHi : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* INCOME LEVEL */}
                  <div className="form-group">
                    <label htmlFor={incomeLevelId}>{t.incomeLevelLabel}</label>
                    <select
                      id={incomeLevelId}
                      value={incomeLevel}
                      onChange={(e) => setIncomeLevel(e.target.value)}
                    >
                      <option value="">{t.incomeLevelPlaceholder}</option>
                      {incomeLevelOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {lang === "hi" ? opt.labelHi : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* EDUCATION STATUS */}
                  <div className="form-group">
                    <label htmlFor={educationStatusId}>
                      {t.educationStatusLabel}
                    </label>
                    <select
                      id={educationStatusId}
                      value={educationStatus}
                      onChange={(e) => setEducationStatus(e.target.value)}
                    >
                      <option value="">{t.educationStatusPlaceholder}</option>
                      {educationStatusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {lang === "hi" ? opt.labelHi : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {schemeError && (
                  <div className="validation-banner">{schemeError}</div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleFindSchemes}
                  >
                    {t.findSchemesBtn}
                  </button>
                </div>
              </div>

              {/* SCHEME RESULTS */}
              {matchedSchemes !== null && (
                <div className="scheme-results">
                  <div className="result-message">
                    {matchedSchemes.length === 0
                      ? t.noMatchMessage
                      : lang === "hi"
                      ? `दिए गए लक्षित लाभार्थी डेटा के आधार पर ${
                          matchedSchemes.length
                        } योजना${
                          matchedSchemes.length > 1 ? "एँ" : ""
                        } पाई गईं।`
                      : `${matchedSchemes.length} matching scheme${
                          matchedSchemes.length > 1 ? "s" : ""
                        } found based on the supplied target-beneficiary data.`}
                  </div>

                  <div className="scheme-cards">
                    {matchedSchemes.map((scheme) => (
                      <div className="scheme-card" key={scheme.id}>
                        <div>
                          <h4>{scheme.schemeName}</h4>
                          <span className="scheme-type">
                            {scheme.schemeType}
                          </span>
                        </div>

                        <div className="scheme-card-details">
                          <div className="scheme-detail">
                            <span className="detail-label">
                              {t.nodalBodyLabel}
                            </span>
                            <strong>
                              {scheme.organization || t.notSpecified}
                            </strong>
                          </div>

                          <div className="scheme-detail">
                            <span className="detail-label">
                              {t.targetGroupCardLabel}
                            </span>
                            <strong>
                              {scheme.targetBeneficiary || t.notSpecified}
                            </strong>
                          </div>

                          <div className="scheme-detail">
                            <span className="detail-label">
                              {t.loanAmountCardLabel}
                            </span>
                            <strong>
                              {scheme.loanAmount || t.notSpecified}
                            </strong>
                          </div>

                          <div className="scheme-detail">
                            <span className="detail-label">
                              {t.financingCardLabel}
                            </span>
                            <strong>
                              {scheme.financing || t.notSpecified}
                            </strong>
                          </div>

                          <div className="scheme-detail">
                            <span className="detail-label">
                              {t.interestCardLabel}
                            </span>
                            <strong>
                              {scheme.interestRate || t.notSpecified}
                            </strong>
                          </div>

                          <div className="scheme-detail">
                            <span className="detail-label">
                              {t.tenureCardLabel}
                            </span>
                            <strong>{scheme.tenure || t.notSpecified}</strong>
                          </div>
                        </div>

                        <div className="scheme-benefit">
                          <span>{t.benefitCardLabel}</span>
                          <p>{scheme.benefits || t.notSpecified}</p>
                        </div>

                        <div className="scheme-source">
                          {t.sourceCardLabel}{" "}
                          {scheme.officialSource ||
                            "Supplied SIH scheme reference data"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ----------------------------------------------------
              SECTION: FINANCIAL CALCULATOR
          ----------------------------------------------------- */}
          {activeTab === "financialCalculator" && (
            <section>
              <div className="service-label">{t.calcServiceLabel}</div>
              <h2>{t.calcTitle}</h2>
              <p className="section-description">{t.calcDesc}</p>

              {/* STEPS */}
              <div className="step-container">
                <div className={`step ${!calcResult ? "active" : ""}`}>
                  <span className="step-number">1</span>
                  <div>
                    <small>{t.step1}</small>
                    <strong>{t.step1Label}</strong>
                  </div>
                </div>
                <div className="step-line"></div>
                <div className="step">
                  <span className="step-number">2</span>
                  <div>
                    <small>{t.step2}</small>
                    <strong>{t.step2Label}</strong>
                  </div>
                </div>
                <div className="step-line"></div>
                <div className={`step ${calcResult ? "active" : ""}`}>
                  <span className="step-number">3</span>
                  <div>
                    <small>{t.step3}</small>
                    <strong>{t.step3Label}</strong>
                  </div>
                </div>
              </div>

              {/* INPUT FORM */}
              <div className="form-card">
                <div className="section-mini-title">{t.step1Label}</div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor={loanAmountId}>{t.loanAmountLabel}</label>
                    <input
                      type="number"
                      id={loanAmountId}
                      value={loanAmount}
                      placeholder={t.loanAmountPlaceholder}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      min="1"
                      step="1"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={annualRateId}>{t.annualRateLabel}</label>
                    <input
                      type="number"
                      id={annualRateId}
                      value={annualRate}
                      placeholder={t.annualRatePlaceholder}
                      onChange={(e) => setAnnualRate(e.target.value)}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={yearsId}>{t.yearsLabel}</label>
                    <input
                      type="number"
                      id={yearsId}
                      value={years}
                      placeholder={t.yearsPlaceholder}
                      onChange={(e) => setYears(e.target.value)}
                      min="1"
                      max="30"
                      step="1"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={monthlyIncomeId}>
                      {t.monthlyIncomeLabel}
                    </label>
                    <input
                      type="number"
                      id={monthlyIncomeId}
                      value={monthlyIncome}
                      placeholder={t.monthlyIncomePlaceholder}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      min="1"
                      step="1"
                    />
                  </div>
                </div>

                {calcError && (
                  <div className="validation-banner">{calcError}</div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleCalculateEMI}
                  >
                    {t.calculateEmiBtn}
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleResetCalculator}
                  >
                    {t.resetBtn}
                  </button>
                </div>
              </div>

              {/* CALCULATION RESULTS */}
              <div className="results-panel">
                <div className="section-mini-title">{t.calcResultsTitle}</div>
                <div className="result-grid">
                  <div className="result-card">
                    <span>{t.monthlyEmiLabel}</span>
                    <strong>
                      {calcResult
                        ? formatCurrency(calcResult.emi)
                        : formatCurrency(0)}
                    </strong>
                  </div>

                  <div className="result-card">
                    <span>{t.totalInterestLabel}</span>
                    <strong>
                      {calcResult
                        ? formatCurrency(calcResult.totalInterest)
                        : formatCurrency(0)}
                    </strong>
                  </div>

                  <div className="result-card">
                    <span>{t.totalPaymentLabel}</span>
                    <strong>
                      {calcResult
                        ? formatCurrency(calcResult.totalPayment)
                        : formatCurrency(0)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* REPAYMENT INSIGHT */}
              <div className="info-panel">
                <div className="section-mini-title">
                  {t.repaymentInsightTitle}
                </div>
                <p>{getInsightParagraph()}</p>

                <div className="ratio-row">
                  <strong>{t.ratioHeader}</strong>
                  <span className="ratio-value">
                    {affordability
                      ? `${affordability.repaymentRatio.toFixed(1)}%`
                      : "0%"}
                  </span>
                </div>

                <div className="ratio-bar">
                  <div
                    className="ratio-fill"
                    style={{
                      width: affordability
                        ? `${Math.min(
                            Math.max(affordability.repaymentRatio, 0),
                            100
                          )}%`
                        : "0%",
                    }}
                  ></div>
                </div>

                <p className="small-note">{getRatioStatusText()}</p>
              </div>

              {/* INCOME AFFORDABILITY VIEW */}
              <div className="info-panel">
                <div className="section-mini-title">
                  {t.affordabilityTitle}
                </div>
                <div className="affordability-grid">
                  <div>
                    <span>{t.affordIncomeLabel}</span>
                    <strong>
                      {formatCurrency(parseFloat(monthlyIncome) || 0)}
                    </strong>
                  </div>
                  <div>
                    <span>{t.affordEmiLabel}</span>
                    <strong>
                      {calcResult
                        ? formatCurrency(calcResult.emi)
                        : formatCurrency(0)}
                    </strong>
                  </div>
                  <div>
                    <span>{t.remainingIncomeLabel}</span>
                    <strong>
                      {affordability
                        ? formatCurrency(affordability.remainingIncome)
                        : formatCurrency(0)}
                    </strong>
                  </div>
                </div>

                <div
                  className={`status-message ${
                    affordability
                      ? affordability.isAffordable
                        ? "affordable"
                        : "high-burden"
                      : ""
                  }`}
                >
                  {!affordability
                    ? t.defaultAffordabilityStatus
                    : affordability.isAffordable
                    ? t.affordabilityBelow30
                    : t.affordabilityAbove30}
                </div>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------
              SECTION: LOAN COMPARISON
          ----------------------------------------------------- */}
          {activeTab === "loanComparison" && (
            <section>
              <div className="service-label">{t.calcServiceLabel}</div>
              <h2>{t.compareTitle}</h2>
              <p className="section-description">{t.compareDesc}</p>

              <div className="form-card">
                <div className="section-mini-title">{t.compareMiniTitle}</div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor={compareAmountId}>
                      {t.compareAmountLabel}
                    </label>
                    <input
                      type="number"
                      id={compareAmountId}
                      value={compareAmount}
                      placeholder={t.compareAmountPlaceholder}
                      onChange={(e) => setCompareAmount(e.target.value)}
                      min="1"
                      step="1"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={compareRateId}>
                      {t.compareRateLabel}
                    </label>
                    <input
                      type="number"
                      id={compareRateId}
                      value={compareRate}
                      placeholder={t.compareRatePlaceholder}
                      onChange={(e) => setCompareRate(e.target.value)}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={compareYearsId}>
                      {t.compareYearsLabel}
                    </label>
                    <input
                      type="number"
                      id={compareYearsId}
                      value={compareYears}
                      placeholder={t.compareYearsPlaceholder}
                      onChange={(e) => setCompareYears(e.target.value)}
                      min="1"
                      max="30"
                      step="1"
                    />
                  </div>
                </div>

                {compareError && (
                  <div className="validation-banner">{compareError}</div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleCompareLoans}
                  >
                    {t.compareLoansBtn}
                  </button>
                </div>
              </div>

              {/* COMPARISON RESULTS */}
              {comparisonResult && (
                <div className="comparison-results">
                  <div className="section-mini-title">
                    {t.compareResultsTitle}
                  </div>

                  <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                      <thead>
                        <tr>
                          <th>{t.particularHeader}</th>
                          <th>{t.currentLoanHeader}</th>
                          <th>{t.alternativeLoanHeader}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{t.monthlyEmiLabel}</td>
                          <td>
                            {formatCurrency(comparisonResult.current.emi)}
                          </td>
                          <td>
                            {formatCurrency(comparisonResult.alternative.emi)}
                          </td>
                        </tr>
                        <tr>
                          <td>{t.totalInterestLabel}</td>
                          <td>
                            {formatCurrency(
                              comparisonResult.current.totalInterest
                            )}
                          </td>
                          <td>
                            {formatCurrency(
                              comparisonResult.alternative.totalInterest
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>{t.totalPaymentLabel}</td>
                          <td>
                            {formatCurrency(
                              comparisonResult.current.totalPayment
                            )}
                          </td>
                          <td>
                            {formatCurrency(
                              comparisonResult.alternative.totalPayment
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="comparison-summary">
                    {getComparisonSummary()}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ----------------------------------------------------
              SECTION: CHANNEL PARTNER LOCATOR
          ----------------------------------------------------- */}
          {activeTab === "locator" && (
            <section>
              <div className="section-header">
                <div>
                  <span className="section-number">{t.locatorSectionNumber}</span>
                  <h2>{t.locatorTitle}</h2>
                </div>
                <p>{t.locatorDesc}</p>
              </div>

              <div className="form-card" style={{ padding: "20px 24px" }}>
                <div className="information-item" style={{ marginBottom: "12px", padding: "10px 14px", background: "#fffbeb", border: "1px solid #fde68a", borderLeft: "4px solid #f59e0b", borderRadius: "4px" }}>
                  <p style={{ margin: 0, fontSize: "13px", color: "#78350f" }}>ℹ {t.locatorNPANotice}</p>
                </div>
                <MapComponent />
              </div>
            </section>
          )}

          {/* ----------------------------------------------------
              SECTION: HELP & INFORMATION
          ----------------------------------------------------- */}
          {activeTab === "help" && (
            <section>
              <div className="service-label">INFORMATION</div>
              <h2>{t.helpTitle}</h2>
              <p className="section-description">{t.helpDesc}</p>

              <div className="information-card">
                <div className="information-item">
                  <h3>{t.help1Title}</h3>
                  <p>{t.help1Desc}</p>
                </div>

                <div className="information-item">
                  <h3>{t.help2Title}</h3>
                  <p>{t.help2Desc}</p>
                </div>

                <div className="information-item">
                  <h3>{t.help3Title}</h3>
                  <p>{t.help3Desc}</p>
                </div>

                <div className="information-item">
                  <h3>{t.help4Title}</h3>
                  <p>{t.help4Desc}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* =======================================================
          FOOTER
      ======================================================== */}
      <footer className="site-footer">
        <div>
          <strong>UdyamAI</strong>
          <span>{t.footerPrototypeTag}</span>
        </div>
        <div>SIH 2026 • SIH26092</div>
      </footer>
    </div>
  );
}
