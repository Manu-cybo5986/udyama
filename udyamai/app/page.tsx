"use client";

import React, { useState } from "react";
import schemesData from "@/data/schemes.json";

interface DistrictCenter {
  id: string;
  name: string;
  state: string;
  type: string;
  address: string;
  phone: string;
  nodalOfficer: string;
}

const districtCenters: DistrictCenter[] = [
  {
    id: "dl-1",
    name: "MSME Development & Facilitation Office (MSME-DFO)",
    state: "Delhi",
    type: "Central MSME Institute",
    address: "Shaheed Captain Gaur Marg, Okhla Industrial Area Phase-III, New Delhi 110020",
    phone: "011-26838226 / 26838068",
    nodalOfficer: "Director, MSME-DFO New Delhi",
  },
  {
    id: "dl-2",
    name: "District Industries Centre (DIC) North-West",
    state: "Delhi",
    type: "State DIC Office",
    address: "Udyog Sadan, Plot No. 419, FIE, Patparganj Industrial Area, Delhi 110092",
    phone: "011-22156470",
    nodalOfficer: "General Manager, DIC Delhi",
  },
  {
    id: "mh-1",
    name: "MSME Development & Facilitation Office (MSME-DFO)",
    state: "Maharashtra",
    type: "Central MSME Institute",
    address: "Kurla-Andheri Road, Saki Naka, Mumbai 400072",
    phone: "022-28576090 / 28573063",
    nodalOfficer: "Joint Director & HOO, Mumbai",
  },
  {
    id: "mh-2",
    name: "District Industries Centre (DIC) Pune",
    state: "Maharashtra",
    type: "State DIC Office",
    address: "Agriculture College Campus, Shivajinagar, Pune 411005",
    phone: "020-25537298",
    nodalOfficer: "General Manager, DIC Pune",
  },
  {
    id: "up-1",
    name: "MSME Development & Facilitation Office (MSME-DFO)",
    state: "Uttar Pradesh",
    type: "Central MSME Institute",
    address: "107, Industrial Estate, Fazalganj, Kanpur 208012",
    phone: "0512-2295070 / 2295071",
    nodalOfficer: "Director, MSME-DFO Kanpur",
  },
  {
    id: "up-2",
    name: "District Industries Centre (DIC) Lucknow",
    state: "Uttar Pradesh",
    type: "State DIC Office",
    address: "Sarojini Nagar Industrial Area, Lucknow 226008",
    phone: "0522-2476012",
    nodalOfficer: "Deputy Commissioner Industries, Lucknow",
  },
  {
    id: "gj-1",
    name: "MSME Development & Facilitation Office (MSME-DFO)",
    state: "Gujarat",
    type: "Central MSME Institute",
    address: "Harsiddh Chambers, 4th Floor, Ashram Road, Ahmedabad 380014",
    phone: "079-27540619 / 27544248",
    nodalOfficer: "Joint Director, Ahmedabad",
  },
  {
    id: "ka-1",
    name: "MSME Development & Facilitation Office (MSME-DFO)",
    state: "Karnataka",
    type: "Central MSME Institute",
    address: "Industrial Estate, Rajajinagar, Bengaluru 560010",
    phone: "080-23146939 / 23146940",
    nodalOfficer: "Director, MSME-DFO Bengaluru",
  },
  {
    id: "tn-1",
    name: "MSME Development & Facilitation Office (MSME-DFO)",
    state: "Tamil Nadu",
    type: "Central MSME Institute",
    address: "65/1, GST Road, Guindy, Chennai 600032",
    phone: "044-22501011 / 22501012",
    nodalOfficer: "Director, MSME-DFO Chennai",
  },
  {
    id: "rj-1",
    name: "MSME Development & Facilitation Office (MSME-DFO)",
    state: "Rajasthan",
    type: "Central MSME Institute",
    address: "22 Godam Industrial Estate, Jaipur 302006",
    phone: "0141-2212098 / 2213099",
    nodalOfficer: "Director, MSME-DFO Jaipur",
  },
];

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [fontScale, setFontScale] = useState<number>(100);
  const [selectedState, setSelectedState] = useState<string>("All");
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    doc1: false,
    doc2: false,
    doc3: false,
    doc4: false,
    doc5: false,
    doc6: false,
  });

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCenters =
    selectedState === "All"
      ? districtCenters
      : districtCenters.filter((c) => c.state === selectedState);

  const isHindi = lang === "hi";

  return (
    <div
      className="min-h-screen flex flex-col bg-[#f4f6f9] text-[#142a52]"
      style={{ fontSize: `${fontScale}%` }}
      lang={lang}
    >
      {/* =======================================================
          1. GOVERNMENT-STYLE TOP UTILITY BAR
      ======================================================== */}
      <div className="gov-top-bar" role="region" aria-label="Official Top Bar">
        <div className="portal-container">
          <div className="gov-top-bar-inner">
            <div className="gov-utility-left">
              <span className="gov-dot-indicator"></span>
              <strong>
                {isHindi
                  ? "भारत सरकार सार्वजनिक सेवा प्रोटोटाइप"
                  : "Government Public-Service Prototype"}
              </strong>
              <span className="gov-divider">|</span>
              <span>Smart India Hackathon 2026 (SIH26092)</span>
            </div>

            <div className="gov-utility-right">
              <span className="gov-helpline-tag">
                <span>☎</span>
                <span>
                  {isHindi ? "हेल्पलाइन:" : "Helpline:"} 1800-11-2026
                </span>
              </span>

              <button
                type="button"
                className="gov-btn"
                aria-label="Decrease Font Size"
                onClick={() => setFontScale((s) => Math.max(85, s - 5))}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                type="button"
                className="gov-btn"
                aria-label="Reset Font Size"
                onClick={() => setFontScale(100)}
                title="Reset Font Size"
              >
                A
              </button>
              <button
                type="button"
                className="gov-btn"
                aria-label="Increase Font Size"
                onClick={() => setFontScale((s) => Math.min(120, s + 5))}
                title="Increase Font Size"
              >
                A+
              </button>

              <button
                type="button"
                className="gov-btn"
                onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
                style={{ fontWeight: 700, minWidth: "60px" }}
              >
                {isHindi ? "English" : "हिन्दी"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          2. MAIN BRANDING HEADER
      ======================================================== */}
      <header className="portal-main-header">
        <div className="portal-container">
          <div className="portal-header-inner">
            <div className="portal-brand-block">
              <div className="portal-emblem-badge" aria-hidden="true">
                ✺
              </div>
              <div className="portal-title-block">
                <h1>
                  Udyam<span>AI</span>
                </h1>
                <span className="portal-official-tag">
                  {isHindi
                    ? "राष्ट्रीय उद्यमी सेवा मंच • SIH 2026"
                    : "National Entrepreneur Support Portal • SIH 2026"}
                </span>
                <p className="portal-brand-subtitle">
                  {isHindi
                    ? "सूक्ष्म, लघु एवं मध्यम उद्यमों के लिए योजना मिलान व वित्तीय निर्णय मंच"
                    : "Single-Window Scheme Matching & Financial Planning for MSMEs"}
                </p>
              </div>
            </div>

            <div className="portal-header-meta">
              <strong>
                {isHindi
                  ? "स्मार्ट इंडिया हैकथॉन 2026 प्रोटोटाइप"
                  : "Smart India Hackathon 2026 Prototype"}
              </strong>
              <p>
                {isHindi
                  ? "पारदर्शी नियम-आधारित योजना मिलान, ईएमआई विश्लेषण व सहायता केंद्र"
                  : "Transparent rule-based scheme matching, EMI analysis & district assistance."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tricolor Ribbon Divider */}
      <div className="tricolor-ribbon" aria-hidden="true"></div>

      {/* =======================================================
          3. HORIZONTAL TOP NAVIGATION
      ======================================================== */}
      <nav className="portal-navbar" aria-label="Main Navigation">
        <div className="portal-container">
          <div className="portal-nav-inner">
            <div className="portal-nav-links">
              <a href="#top" className="portal-nav-link active">
                <span>⌂</span>
                <span>{isHindi ? "मुख्य पृष्ठ (Home)" : "Home"}</span>
              </a>

              <a
                href="/financial?tab=schemeMatching"
                className="portal-nav-link"
              >
                <span>◇</span>
                <span>
                  {isHindi ? "योजना मिलान" : "Scheme Matching"}
                </span>
              </a>

              <a
                href="/financial?tab=financialCalculator"
                className="portal-nav-link"
              >
                <span>₹</span>
                <span>
                  {isHindi ? "वित्तीय कैलकुलेटर" : "Financial Calculator"}
                </span>
              </a>

              <a
                href="/financial?tab=loanComparison"
                className="portal-nav-link"
              >
                <span>⇄</span>
                <span>
                  {isHindi ? "ऋण तुलना" : "Loan Comparison"}
                </span>
              </a>

              <a href="#nearby" className="portal-nav-link">
                <span>⌖</span>
                <span>
                  {isHindi ? "निकटतम सहायता" : "Nearby Help"}
                </span>
              </a>

              <a href="#application" className="portal-nav-link">
                <span>▣</span>
                <span>
                  {isHindi ? "आवेदन सहायता" : "Application Support"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT WRAPPER */}
      <main id="top" className="flex-grow">
        {/* =======================================================
            4. MAIN HERO SECTION
        ======================================================== */}
        <section className="portal-hero-section">
          <div className="portal-container">
            <div className="hero-sub-label">
              <span>●</span>
              <span>
                {isHindi
                  ? "सार्वजनिक डिजिटल सेवा • निःशुल्क एवं पारदर्शी"
                  : "PUBLIC DIGITAL SERVICE • TRANSPARENT & RULE-BASED"}
              </span>
            </div>

            <h2 className="hero-heading">
              {isHindi
                ? "उद्यमियों व एमएसएमई के लिए पारदर्शी सरकारी योजना व वित्तीय सहायता"
                : "Single-Window Entrepreneur Support & Scheme Matching"}
              <span className="hero-heading-hindi">
                {isHindi
                  ? "Discover Eligible Schemes, Calculate Loans & Access Local Assistance"
                  : "भारत के उद्यमियों के लिए अधिकारिक योजनाएं, ईएमआई गणना व सहायता केंद्र"}
              </span>
            </h2>

            <p className="hero-description">
              {isHindi
                ? "उद्यमAI भारत के सूक्ष्म, लघु एवं मध्यम उद्यमियों को उनके प्रोजेक्ट लागत, लक्षित श्रेणी व पात्रता मानकों के अनुसार सही सरकारी योजनाओं से जोड़ता है। ऋण ईएमआई, कुल ब्याज, वहन क्षमता व निकटतम उद्योग केंद्रों की संपूर्ण जानकारी एक ही स्थान पर।"
                : "UdyamAI empowers India's micro, small and medium enterprises by matching business requirements with verified government assistance schemes. Calculate reducing-balance EMIs, compare loan proposals, check 30% affordability benchmarks, and locate nearby District Industries Centres."}
            </p>

            <div className="hero-cta-group">
              <a
                href="/financial?tab=schemeMatching"
                className="btn-primary-gov"
              >
                <span>
                  {isHindi
                    ? "योग्य योजनाएं खोजें"
                    : "Find Eligible Schemes"}
                </span>
                <span>→</span>
              </a>

              <a
                href="/financial?tab=financialCalculator"
                className="btn-secondary-gov"
              >
                <span>
                  {isHindi ? "वित्तीय कैलकुलेटर" : "Financial Calculator"}
                </span>
              </a>

              <a href="#nearby" className="btn-outline-gov">
                <span>
                  {isHindi ? "निकटतम सहायता केंद्र" : "Nearby District Help"}
                </span>
                <span>↓</span>
              </a>
            </div>

            {/* Quick Stats Strip */}
            <div className="gov-stats-strip">
              <div className="gov-stat-item">
                <span className="gov-stat-number">15+</span>
                <span className="gov-stat-label">
                  {isHindi
                    ? "सत्यापित केंद्रीय व राज्य योजनाएं"
                    : "Verified Government Schemes"}
                </span>
              </div>

              <div className="gov-stat-item">
                <span className="gov-stat-number">6</span>
                <span className="gov-stat-label">
                  {isHindi
                    ? "लक्षित उद्यमी श्रेणियां"
                    : "Target Entrepreneur Categories"}
                </span>
              </div>

              <div className="gov-stat-item">
                <span className="gov-stat-number">100%</span>
                <span className="gov-stat-label">
                  {isHindi
                    ? "पारदर्शी नियम-आधारित मिलान"
                    : "Rule-Based Matching Engine"}
                </span>
              </div>

              <div className="gov-stat-item">
                <span className="gov-stat-number">24/7</span>
                <span className="gov-stat-label">
                  {isHindi
                    ? "खुला डिजिटल सेवा प्रोटोटाइप"
                    : "Public Access Portal (SIH 2026)"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            5. SERVICE CARDS SECTION (5 CARDS)
        ======================================================== */}
        <section className="services-section">
          <div className="portal-container">
            <div className="section-head-gov">
              <span className="section-kicker">
                {isHindi ? "प्रमुख नागरिक सेवाएं" : "Core Public Services"}
              </span>
              <h2>
                {isHindi
                  ? "उद्यमी सहायता सेवाएं एवं डिजिटल उपकरण"
                  : "Entrepreneur Services & Planning Tools"}
              </h2>
              <p>
                {isHindi
                  ? "अपनी व्यावसायिक आवश्यकताओं के अनुसार नीचे दिए गए विकल्प चुनें:"
                  : "Select an official service below to begin your journey:"}
              </p>
            </div>

            <div className="services-grid-5">
              {/* CARD 1: SCHEME MATCHING */}
              <div className="service-card-gov">
                <div className="service-card-top">
                  <span className="service-card-number">SERVICE 01</span>
                  <div className="service-card-icon">◇</div>
                </div>
                <h3>Scheme Matching</h3>
                <span className="service-card-hindi">
                  {isHindi ? "योजना मिलान इंजन" : "Intelligent Scheme Finder"}
                </span>
                <p>
                  {isHindi
                    ? "प्रोजेक्ट प्रकार, लागत, सामाजिक श्रेणी और शिक्षा के आधार पर 15+ केंद्रीय व राज्य योजनाओं में अपनी पात्रता जांचें।"
                    : "Evaluate eligibility across 15+ central & state schemes like PMEGP, Mudra, and Stand-Up India based on your investment and category."}
                </p>
                <ul className="service-card-features">
                  <li>
                    {isHindi
                      ? "लक्षित सामाजिक श्रेणी मिलान"
                      : "Target beneficiary & social category filters"}
                  </li>
                  <li>
                    {isHindi
                      ? "प्रोजेक्ट लागत सीमा सत्यापन"
                      : "Project cost and margin money checks"}
                  </li>
                  <li>
                    {isHindi
                      ? "सब्सिडी व ब्याज रियायत विवरण"
                      : "Subsidy & concessional rate details"}
                  </li>
                </ul>
                <a
                  href="/financial?tab=schemeMatching"
                  className="service-card-btn"
                >
                  <span>
                    {isHindi ? "योजनाएं खोजें" : "Match Schemes"}
                  </span>
                  <span>→</span>
                </a>
              </div>

              {/* CARD 2: FINANCIAL CALCULATOR */}
              <div className="service-card-gov">
                <div className="service-card-top">
                  <span className="service-card-number">SERVICE 02</span>
                  <div className="service-card-icon">₹</div>
                </div>
                <h3>Financial Calculator</h3>
                <span className="service-card-hindi">
                  {isHindi ? "वित्तीय एवं ईएमआई कैलकुलेटर" : "EMI & Cost Calculator"}
                </span>
                <p>
                  {isHindi
                    ? "ऋण राशि, ब्याज दर और अवधि दर्ज कर मासिक ईएमआई, कुल ब्याज और मासिक आय के अनुसार 30% वहन क्षमता की गणना करें।"
                    : "Calculate exact reducing-balance monthly EMIs, total interest burden, and perform income affordability stress checks."}
                </p>
                <ul className="service-card-features">
                  <li>
                    {isHindi
                      ? "घटते शेष पर सटीक ईएमआई"
                      : "Reducing balance EMI calculation"}
                  </li>
                  <li>
                    {isHindi
                      ? "30% आय वहन क्षमता विश्लेषण"
                      : "30% income affordability benchmark"}
                  </li>
                  <li>
                    {isHindi
                      ? "कुल ब्याज व भुगतान विभाजन"
                      : "Total interest & principal breakdown"}
                  </li>
                </ul>
                <a
                  href="/financial?tab=financialCalculator"
                  className="service-card-btn"
                >
                  <span>
                    {isHindi ? "ईएमआई गणना करें" : "Calculate EMI"}
                  </span>
                  <span>→</span>
                </a>
              </div>

              {/* CARD 3: LOAN COMPARISON */}
              <div className="service-card-gov">
                <div className="service-card-top">
                  <span className="service-card-number">SERVICE 03</span>
                  <div className="service-card-icon">⇄</div>
                </div>
                <h3>Loan Comparison</h3>
                <span className="service-card-hindi">
                  {isHindi ? "ऋण परिदृश्य तुलना" : "Side-by-Side Comparison"}
                </span>
                <p>
                  {isHindi
                    ? "दो अलग-अलग ब्याज दरों और अवधियों के प्रस्तावों की एक साथ तुलना करें ताकि आप सबसे किफायती ऋण का चयन कर सकें।"
                    : "Compare current loan proposals with alternative interest rates and tenures side-by-side to minimize financing overhead."}
                </p>
                <ul className="service-card-features">
                  <li>
                    {isHindi
                      ? "ब्याज अंतर का सीधा आकलन"
                      : "Direct interest savings calculation"}
                  </li>
                  <li>
                    {isHindi
                      ? "मासिक ईएमआई तुलनात्मक तालिका"
                      : "Side-by-side monthly installment table"}
                  </li>
                  <li>
                    {isHindi
                      ? "अवधि प्रभाव का स्पष्ट विश्लेषण"
                      : "Tenure impact & repayment insights"}
                  </li>
                </ul>
                <a
                  href="/financial?tab=loanComparison"
                  className="service-card-btn"
                >
                  <span>
                    {isHindi ? "ऋण तुलना करें" : "Compare Scenarios"}
                  </span>
                  <span>→</span>
                </a>
              </div>

              {/* CARD 4: NEARBY HELP */}
              <div className="service-card-gov">
                <div className="service-card-top">
                  <span className="service-card-number">SERVICE 04</span>
                  <div className="service-card-icon">⌖</div>
                </div>
                <h3>Nearby Assistance</h3>
                <span className="service-card-hindi">
                  {isHindi ? "निकटतम उद्योग व सहायता केंद्र" : "District Help Centers"}
                </span>
                <p>
                  {isHindi
                    ? "अपने राज्य व जिले के जिला उद्योग केंद्र (DIC), एमएसएमई विकास संस्थान और अग्रणी बैंक शाखाओं का संपर्क विवरण प्राप्त करें।"
                    : "Locate District Industries Centres (DIC), MSME Development & Facilitation Offices, and Lead Banks across all states."}
                </p>
                <ul className="service-card-features">
                  <li>
                    {isHindi
                      ? "राज्य-वार सहायता केंद्र निर्देशिका"
                      : "State-wise district centre directory"}
                  </li>
                  <li>
                    {isHindi
                      ? "अधिकारिक दूरभाष व नोडल अधिकारी"
                      : "Official phone numbers & nodal officers"}
                  </li>
                  <li>
                    {isHindi
                      ? "राष्ट्रीय एमएसएमई टोल-फ्री हेल्पलाइन"
                      : "National MSME & Champions helplines"}
                  </li>
                </ul>
                <a href="#nearby" className="service-card-btn">
                  <span>
                    {isHindi ? "सहायता केंद्र खोजें" : "Locate Centres"}
                  </span>
                  <span>↓</span>
                </a>
              </div>

              {/* CARD 5: APPLICATION SUPPORT */}
              <div className="service-card-gov">
                <div className="service-card-top">
                  <span className="service-card-number">SERVICE 05</span>
                  <div className="service-card-icon">▣</div>
                </div>
                <h3>Application Support</h3>
                <span className="service-card-hindi">
                  {isHindi ? "आवेदन तैयारी एवं चेकलिस्ट" : "Readiness Checklist & Links"}
                </span>
                <p>
                  {isHindi
                    ? "सरकारी पोर्टल पर आवेदन करने से पूर्व आवश्यक दस्तावेजों की संरचित चेकलिस्ट व आधिकारिक आवेदन पोर्टल लिंक प्राप्त करें।"
                    : "Verify document readiness with a structured checklist for Udyam URN, DPR project reports, ITR, and official government portals."}
                </p>
                <ul className="service-card-features">
                  <li>
                    {isHindi
                      ? "अनिवार्य दस्तावेज़ तैयारी चेकलिस्ट"
                      : "Document readiness pre-check tool"}
                  </li>
                  <li>
                    {isHindi
                      ? "उद्यम व जनसमर्थ आधिकारिक लिंक"
                      : "Direct official government portal links"}
                  </li>
                  <li>
                    {isHindi
                      ? "बैंक शाखा प्रस्तुति मार्गदर्शन"
                      : "Bank submission preparation guide"}
                  </li>
                </ul>
                <a href="#application" className="service-card-btn">
                  <span>
                    {isHindi ? "चेकलिस्ट देखें" : "View Checklist"}
                  </span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            6. FEATURED SCHEMES DIRECTORY (SIH REFERENCE DATA)
        ======================================================== */}
        <section className="scheme-highlight-section">
          <div className="portal-container">
            <div className="section-head-gov">
              <span className="section-kicker">
                {isHindi ? "सरकारी योजना निर्देशिका" : "Official Scheme Reference"}
              </span>
              <h2>
                {isHindi
                  ? "सत्यापित केंद्रीय एवं राज्य योजनाएं"
                  : "Verified Central & State Schemes (SIH Dataset)"}
              </h2>
              <p>
                {isHindi
                  ? "उद्यमAI डेटाबेस में शामिल प्रमुख योजनाएं, उनकी नोडल संस्थाएं व ऋण सीमाएं:"
                  : "Key credit-linked and enterprise assistance schemes available in UdyamAI:"}
              </p>
            </div>

            <div className="scheme-table-container">
              <table className="scheme-gov-table">
                <thead>
                  <tr>
                    <th>{isHindi ? "योजना का नाम" : "Scheme Name"}</th>
                    <th>{isHindi ? "नोडल संस्था" : "Nodal Organization"}</th>
                    <th>{isHindi ? "प्रकार" : "Scheme Type"}</th>
                    <th>{isHindi ? "लक्षित लाभार्थी" : "Target Beneficiary"}</th>
                    <th>{isHindi ? "ऋण राशि / सहायता" : "Loan Amount / Limits"}</th>
                    <th>{isHindi ? "कार्रवाई" : "Action"}</th>
                  </tr>
                </thead>
                <tbody>
                  {schemesData.slice(0, 6).map((scheme) => (
                    <tr key={scheme.id}>
                      <td>
                        <strong>{scheme.schemeName}</strong>
                      </td>
                      <td>
                        <span className="badge-tag-gov">
                          {scheme.organization}
                        </span>
                      </td>
                      <td>{scheme.schemeType}</td>
                      <td>{scheme.targetBeneficiary}</td>
                      <td>{scheme.loanAmount}</td>
                      <td>
                        <a
                          href="/financial?tab=schemeMatching"
                          style={{
                            color: "#172354",
                            fontWeight: 700,
                            textDecoration: "underline",
                            fontSize: "12px",
                          }}
                        >
                          {isHindi ? "पात्रता जांचें →" : "Check Eligibility →"}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#4c648b" }}>
                {isHindi
                  ? "कुल 15 सरकारी योजनाएं उपलब्ध हैं (NSFDC / NBCFDC / MSME दिशानिर्देश)"
                  : "Showing 6 of 15 verified schemes from the SIH 2026 dataset (NSFDC & NBCFDC)"}
              </span>
              <a
                href="/financial?tab=schemeMatching"
                className="btn-primary-gov"
                style={{ padding: "8px 16px", fontSize: "12px" }}
              >
                {isHindi
                  ? "सभी 15 योजनाएं देखें व मिलान करें →"
                  : "View All 15 Schemes & Run Match →"}
              </a>
            </div>
          </div>
        </section>

        {/* =======================================================
            7. NEARBY HELP & GEOLOCATION DESK
        ======================================================== */}
        <section id="nearby" className="nearby-section">
          <div className="portal-container">
            <div className="section-head-gov">
              <span className="section-kicker">
                {isHindi ? "जिला सहायता केंद्र" : "District Nodal Assistance"}
              </span>
              <h2>
                {isHindi
                  ? "निकटतम उद्योग केंद्र एवं सहायता डेस्क"
                  : "Nearby Assistance Points & District Centers"}
              </h2>
              <p>
                {isHindi
                  ? "योजना परामर्श, मार्जिन मनी व आवेदन मार्गदर्शन हेतु अपने निकटतम केंद्र से संपर्क करें:"
                  : "Locate District Industries Centres (DIC) and MSME Facilitation Offices for on-ground scheme counseling:"}
              </p>
            </div>

            <div className="nearby-layout">
              {/* FILTER CARD */}
              <div className="nearby-filter-card">
                <h4>{isHindi ? "राज्य अनुसार खोजें" : "Filter by State"}</h4>

                <div className="filter-group">
                  <label htmlFor="state-filter">
                    {isHindi ? "राज्य चुनें:" : "Select State:"}
                  </label>
                  <select
                    id="state-filter"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="All">
                      {isHindi ? "-- सभी राज्य --" : "-- All States --"}
                    </option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Rajasthan">Rajasthan</option>
                  </select>
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#4c648b",
                    lineHeight: "1.5",
                  }}
                >
                  <p>
                    {isHindi
                      ? "जिला उद्योग केंद्र (DIC) सूक्ष्म व लघु उद्यमियों को ऋण आवेदन, पीएमईजीपी सत्यापन व सब्सिडी अनुमोदन में सहायता प्रदान करते हैं।"
                      : "DIC offices provide ground assistance for PMEGP verification, subsidy release, and enterprise registration."}
                  </p>
                </div>
              </div>

              {/* CENTERS LIST */}
              <div>
                <div className="nearby-centers-grid">
                  {filteredCenters.map((center) => (
                    <div className="center-card" key={center.id}>
                      <div className="center-card-header">
                        <h5>{center.name}</h5>
                        <span className="center-badge">{center.state}</span>
                      </div>
                      <div className="badge-tag-gov" style={{ marginBottom: "6px" }}>
                        {center.type}
                      </div>
                      <p className="center-address">
                        <strong>Address:</strong> {center.address}
                      </p>
                      <div className="center-contact-row">
                        <span>📞 {center.phone}</span>
                        <span>{center.nodalOfficer}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* HELPLINE BANNER */}
                <div className="helplines-box">
                  <div className="helpline-item">
                    <strong>
                      {isHindi
                        ? "एमएसएमई चैंपियंस हेल्पलाइन"
                        : "MSME Champions Toll-Free"}
                    </strong>
                    <span>1800-546-5600</span>
                  </div>

                  <div className="helpline-item">
                    <strong>
                      {isHindi
                        ? "उद्यमAI प्रोटोटाइप सहायता"
                        : "UdyamAI SIH Support Desk"}
                    </strong>
                    <span>1800-11-2026</span>
                  </div>

                  <div className="helpline-item">
                    <strong>
                      {isHindi
                        ? "स्टैंड-अप इंडिया हेल्पलाइन"
                        : "Stand-Up India Helpdesk"}
                    </strong>
                    <span>1800-180-1111</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            8. APPLICATION SUPPORT & CHECKLIST
        ======================================================== */}
        <section id="application" className="application-section">
          <div className="portal-container">
            <div className="section-head-gov">
              <span className="section-kicker">
                {isHindi ? "आवेदन पूर्व तैयारी" : "Pre-Application Readiness"}
              </span>
              <h2>
                {isHindi
                  ? "दस्तावेज़ चेकलिस्ट एवं आधिकारिक पोर्टल"
                  : "Application Support & Required Documents"}
              </h2>
              <p>
                {isHindi
                  ? "बैंक अथवा सरकारी पोर्टल पर आवेदन से पूर्व आवश्यक प्रलेख तैयार रखें:"
                  : "Check off your documents before submitting loan applications on official government portals:"}
              </p>
            </div>

            <div className="checklist-grid">
              {/* CHECKLIST */}
              <div className="checklist-card">
                <h4>
                  {isHindi
                    ? "अनिवार्य दस्तावेज़ चेकलिस्ट"
                    : "Essential Documentation Checklist"}
                </h4>

                <ul className="checklist-items">
                  <li className="checklist-item">
                    <input
                      type="checkbox"
                      id="doc1"
                      checked={checklist.doc1}
                      onChange={() => toggleCheck("doc1")}
                    />
                    <div className="checklist-content">
                      <label htmlFor="doc1">
                        <strong>
                          1. {isHindi ? "पहचान व पते का प्रमाण" : "Identity & Address Proof"}
                        </strong>
                        <span>
                          {isHindi
                            ? "आधार कार्ड, पैन कार्ड एवं स्थायी निवास प्रमाण पत्र"
                            : "Aadhaar Card, PAN Card, and Voter ID / Electricity Bill"}
                        </span>
                      </label>
                    </div>
                  </li>

                  <li className="checklist-item">
                    <input
                      type="checkbox"
                      id="doc2"
                      checked={checklist.doc2}
                      onChange={() => toggleCheck("doc2")}
                    />
                    <div className="checklist-content">
                      <label htmlFor="doc2">
                        <strong>
                          2. {isHindi ? "उद्यम पंजीकरण प्रमाण पत्र" : "Udyam Registration Certificate (URN)"}
                        </strong>
                        <span>
                          {isHindi
                            ? "आधिकारिक पोर्टल से निःशुल्क एमएसएमई यूआरएन नंबर"
                            : "Zero-cost registration certificate from udyamregistration.gov.in"}
                        </span>
                      </label>
                    </div>
                  </li>

                  <li className="checklist-item">
                    <input
                      type="checkbox"
                      id="doc3"
                      checked={checklist.doc3}
                      onChange={() => toggleCheck("doc3")}
                    />
                    <div className="checklist-content">
                      <label htmlFor="doc3">
                        <strong>
                          3. {isHindi ? "विस्तृत प्रोजेक्ट रिपोर्ट (DPR)" : "Detailed Project Report (DPR)"}
                        </strong>
                        <span>
                          {isHindi
                            ? "मशीनरी लागत, कार्यशील पूंजी व अनुमानित आय-व्यय विवरण"
                            : "Machinery quotes, working capital cycle, and revenue projections"}
                        </span>
                      </label>
                    </div>
                  </li>

                  <li className="checklist-item">
                    <input
                      type="checkbox"
                      id="doc4"
                      checked={checklist.doc4}
                      onChange={() => toggleCheck("doc4")}
                    />
                    <div className="checklist-content">
                      <label htmlFor="doc4">
                        <strong>
                          4. {isHindi ? "बैंक स्टेटमेंट व आय प्रमाण" : "Bank Statements (6-12 Months)"}
                        </strong>
                        <span>
                          {isHindi
                            ? "उद्यमी के बैंक खाते का विवरण एवं विगत वर्ष का आयकर रिटर्न (यदि उपलब्ध हो)"
                            : "Current/Savings account statements and past ITR filings (if applicable)"}
                        </span>
                      </label>
                    </div>
                  </li>

                  <li className="checklist-item">
                    <input
                      type="checkbox"
                      id="doc5"
                      checked={checklist.doc5}
                      onChange={() => toggleCheck("doc5")}
                    />
                    <div className="checklist-content">
                      <label htmlFor="doc5">
                        <strong>
                          5. {isHindi ? "श्रेणी प्रमाण पत्र (सब्सिडी हेतु)" : "Target Category / Caste Certificate"}
                        </strong>
                        <span>
                          {isHindi
                            ? "SC/ST/OBC/महिला/दिव्यांग प्रमाण पत्र विशेष सब्सिडी पात्रता के लिए"
                            : "SC/ST/OBC/Women/Minority proof for special subsidy eligibility"}
                        </span>
                      </label>
                    </div>
                  </li>

                  <li className="checklist-item">
                    <input
                      type="checkbox"
                      id="doc6"
                      checked={checklist.doc6}
                      onChange={() => toggleCheck("doc6")}
                    />
                    <div className="checklist-content">
                      <label htmlFor="doc6">
                        <strong>
                          6. {isHindi ? "व्यावसायिक परिसर प्रमाण" : "Business Premises Proof"}
                        </strong>
                        <span>
                          {isHindi
                            ? "स्वामित्व दस्तावेज, किराया अनुबंध अथवा एनओसी"
                            : "Ownership registry, lease/rental agreement, or local body NOC"}
                        </span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              {/* OFFICIAL PORTAL LINKS */}
              <div className="portal-links-card">
                <h4>
                  {isHindi
                    ? "आधिकारिक सरकारी आवेदन पोर्टल"
                    : "Direct Official Government Portals"}
                </h4>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#4c648b",
                    margin: "0 0 16px",
                  }}
                >
                  {isHindi
                    ? "उद्यमAI योजना चयन में सहायता करता है। वास्तविक ऋण आवेदन नीचे दिए गए आधिकारिक सरकारी पोर्टलों पर किए जाते हैं:"
                    : "UdyamAI assists in scheme discovery. Final credit applications must be submitted on the respective official government portals:"}
                </p>

                <div className="portal-link-list">
                  <a
                    href="https://udyamregistration.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-link-button"
                  >
                    <span>
                      {isHindi
                        ? "उद्यम पंजीकरण पोर्टल (निःशुल्क)"
                        : "Udyam Registration Portal (Official MSME)"}
                    </span>
                    <span>↗</span>
                  </a>

                  <a
                    href="https://www.jansamarth.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-link-button"
                  >
                    <span>
                      {isHindi
                        ? "जनसमर्थ पोर्टल (राष्ट्रीय ऋण लिंक्ड योजनाएं)"
                        : "JanSamarth Portal (Credit-Linked Schemes)"}
                    </span>
                    <span>↗</span>
                  </a>

                  <a
                    href="https://www.kviconline.gov.in/pmegpeportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-link-button"
                  >
                    <span>
                      {isHindi
                        ? "पीएमईजीपी ई-पोर्टल (PMEGP Official)"
                        : "PMEGP e-Portal (KVIC Online Application)"}
                    </span>
                    <span>↗</span>
                  </a>

                  <a
                    href="https://www.standupmitra.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-link-button"
                  >
                    <span>
                      {isHindi
                        ? "स्टैंड-अप इंडिया पोर्टल (Stand-Up Mitra)"
                        : "Stand-Up India Portal (SC/ST/Women)"}
                    </span>
                    <span>↗</span>
                  </a>

                  <a
                    href="https://www.mudra.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-link-button"
                  >
                    <span>
                      {isHindi
                        ? "प्रधानमंत्री मुद्रा योजना (PMMY Portal)"
                        : "Pradhan Mantri Mudra Yojana (PMMY Portal)"}
                    </span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            9. OFFICIAL NOTICE & DISCLAIMER BANNER
        ======================================================== */}
        <div className="portal-container">
          <section className="gov-notice-banner" role="note">
            <span className="gov-notice-icon">ℹ</span>
            <div className="gov-notice-content">
              <strong>
                {isHindi
                  ? "महत्वपूर्ण सार्वजनिक सूचना एवं अस्वीकरण (SIH 2026 प्रोटोटाइप):"
                  : "Important Public Notice & Prototype Disclaimer (SIH 2026):"}
              </strong>
              <p>
                {isHindi
                  ? "उद्यमAI स्मार्ट इंडिया हैकथॉन 2026 (समस्या कोड SIH26092) के अंतर्गत विकसित एक अकादमिक सार्वजनिक सेवा निर्णय-सहायता प्रोटोटाइप है। यह मंच उद्यमियों को योजनाएं समझने, ईएमआई गणना करने व आवश्यक दस्तावेज तैयार करने में सहायता करता है। ऋण की अंतिम स्वीकृति, मार्जिन मनी सब्सिडी, ब्याज दर और पात्रता का निर्धारण संबंधित मंत्रालय, राज्य सरकार और ऋणदाता बैंक द्वारा आधिकारिक नियमों के अनुसार किया जाता है।"
                  : "UdyamAI is an academic public-service decision-support prototype developed for Smart India Hackathon 2026 (Problem Statement SIH26092). It is designed to assist entrepreneurs in identifying applicable government schemes, calculating estimated loan obligations, and understanding documentation requirements. Final eligibility, loan sanction, subsidy disbursement, and interest rates remain solely under the authority of the respective government ministries, state departments, and financing institutions."}
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* =======================================================
          10. MULTI-COLUMN GOVERNMENT FOOTER
      ======================================================== */}
      <footer className="portal-footer">
        <div className="portal-container">
          <div className="footer-top-grid">
            {/* Col 1 */}
            <div className="footer-col">
              <h4>UdyamAI • SIH 2026</h4>
              <p>
                {isHindi
                  ? "राष्ट्रीय उद्यमी सहायता एवं पारदर्शी योजना मिलान पोर्टल। सूक्ष्म, लघु एवं मध्यम उद्यमों (MSME) को सशक्त बनाने हेतु समर्पित प्रोटोटाइप।"
                  : "National Entrepreneur Support & Scheme Matching Portal. A public-service digital prototype dedicated to empowering Indian MSMEs."}
              </p>
              <p style={{ fontSize: "12px", color: "#64748b" }}>
                Problem Statement SIH26092 • Smart India Hackathon 2026
              </p>
            </div>

            {/* Col 2 */}
            <div className="footer-col">
              <h4>{isHindi ? "प्रमुख योजनाएं" : "Key Schemes"}</h4>
              <ul className="footer-links-list">
                <li>
                  <a href="/financial?tab=schemeMatching">
                    PMEGP (KVIC)
                  </a>
                </li>
                <li>
                  <a href="/financial?tab=schemeMatching">
                    Mudra Yojana (PMMY)
                  </a>
                </li>
                <li>
                  <a href="/financial?tab=schemeMatching">
                    Stand-Up India
                  </a>
                </li>
                <li>
                  <a href="/financial?tab=schemeMatching">
                    PM Vishwakarma
                  </a>
                </li>
                <li>
                  <a href="/financial?tab=schemeMatching">
                    NSFDC & NBCFDC Loans
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="footer-col">
              <h4>{isHindi ? "सरकारी पोर्टल" : "Govt Portals"}</h4>
              <ul className="footer-links-list">
                <li>
                  <a
                    href="https://msme.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ministry of MSME
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.jansamarth.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    JanSamarth Portal
                  </a>
                </li>
                <li>
                  <a
                    href="https://udyamregistration.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Udyam Registration
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.india.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    National Portal of India
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="footer-col">
              <h4>{isHindi ? "सहायता एवं संपर्क" : "Public Help"}</h4>
              <ul className="footer-links-list">
                <li>
                  <a href="#nearby">
                    {isHindi ? "जिला सहायता केंद्र" : "District Help Centers"}
                  </a>
                </li>
                <li>
                  <a href="#application">
                    {isHindi ? "दस्तावेज़ चेकलिस्ट" : "Document Checklist"}
                  </a>
                </li>
                <li>
                  <a href="/financial?tab=help">
                    {isHindi ? "एफएक्यू एवं दिशानिर्देश" : "FAQs & Guidelines"}
                  </a>
                </li>
                <li>
                  <span style={{ fontSize: "12px", color: "#fbd38d" }}>
                    Toll-Free: 1800-11-2026
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-strip">
            <div>
              © 2026 UdyamAI • Smart India Hackathon 2026 Prototype (SIH26092).
              All Rights Reserved.
            </div>
            <div className="footer-bottom-links">
              <a href="#top">{isHindi ? "नियम व शर्तें" : "Terms"}</a>
              <a href="#top">{isHindi ? "गोपनीयता नीति" : "Privacy Policy"}</a>
              <a href="#top">{isHindi ? "अभिगम्यता" : "Accessibility"}</a>
              <a href="#top">{isHindi ? "अस्वीकरण" : "Disclaimer"}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}