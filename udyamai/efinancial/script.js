// ============================================================
// UDYAMAI FINANCIAL CALCULATOR
// SIH 2026 | SIH26092
// Financial Logic + Scheme Matching
// ============================================================


// ============================================================
// GLOBAL STATE
// ============================================================

let schemeDatabase = [];


// ============================================================
// CURRENCY FORMATTER
// ============================================================

function formatCurrency(amount) {
    if (!Number.isFinite(amount)) {
        return "₹0.00";
    }

    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// ============================================================
// LOAN CALCULATION
// ============================================================

function calculateLoan(loanAmount, annualRate, years) {

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    let emi;

    // Zero-interest case
    if (monthlyRate === 0) {
        emi = loanAmount / months;
    } else {
        emi =
            loanAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    return {
        emi,
        totalInterest,
        totalPayment
    };
}


// ============================================================
// SAFE ELEMENT HELPERS
// ============================================================

function getElement(id) {
    return document.getElementById(id);
}


function setText(id, value) {
    const element = getElement(id);

    if (element) {
        element.textContent = value;
    }
}


function showElement(id) {
    const element = getElement(id);

    if (element) {
        element.style.display = "";
    }
}


function hideElement(id) {
    const element = getElement(id);

    if (element) {
        element.style.display = "none";
    }
}


// ============================================================
// MAIN EMI CALCULATOR
// ============================================================

function calculateEMI() {

    const loanAmountInput = getElement("loanAmount");
    const annualRateInput = getElement("annualRate");
    const yearsInput = getElement("years");
    const monthlyIncomeInput = getElement("monthlyIncome");

    if (
        !loanAmountInput ||
        !annualRateInput ||
        !yearsInput ||
        !monthlyIncomeInput
    ) {
        console.error("Calculator input elements are missing.");
        return;
    }

    const loanAmount = parseFloat(loanAmountInput.value);
    const annualRate = parseFloat(annualRateInput.value);
    const years = parseFloat(yearsInput.value);
    const monthlyIncome = parseFloat(monthlyIncomeInput.value);


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
        alert("Please enter a loan amount greater than ₹0.");
        loanAmountInput.focus();
        return;
    }


    if (
        !Number.isFinite(annualRate) ||
        annualRate < 0 ||
        annualRate > 100
    ) {
        alert("Please enter an interest rate between 0% and 100%.");
        annualRateInput.focus();
        return;
    }


    if (
        !Number.isFinite(years) ||
        years <= 0 ||
        years > 30
    ) {
        alert("Please enter a loan tenure between 1 and 30 years.");
        yearsInput.focus();
        return;
    }


    if (
        !Number.isFinite(monthlyIncome) ||
        monthlyIncome <= 0
    ) {
        alert(
            "Please enter a monthly business income greater than ₹0."
        );

        monthlyIncomeInput.focus();
        return;
    }


    // --------------------------------------------------------
    // CALCULATE
    // --------------------------------------------------------

    const result = calculateLoan(
        loanAmount,
        annualRate,
        years
    );


    // --------------------------------------------------------
    // MAIN RESULTS
    // --------------------------------------------------------

    setText("emi", formatCurrency(result.emi));
    setText(
        "totalInterest",
        formatCurrency(result.totalInterest)
    );

    setText(
        "totalPayment",
        formatCurrency(result.totalPayment)
    );


    // --------------------------------------------------------
    // REPAYMENT RATIO
    // --------------------------------------------------------

    const repaymentRatio =
        (result.emi / monthlyIncome) * 100;


    setText(
        "ratioValue",
        repaymentRatio.toFixed(1) + "%"
    );


    const ratioFill = getElement("ratioFill");

    if (ratioFill) {
        ratioFill.style.width =
            Math.min(Math.max(repaymentRatio, 0), 100) + "%";
    }


    let ratioMessage = "";

    if (repaymentRatio < 20) {

        ratioMessage =
            "Your estimated EMI represents less than 20% of the entered monthly business income.";

    } else if (repaymentRatio < 30) {

        ratioMessage =
            "Your estimated EMI represents 20%–30% of the entered monthly business income.";

    } else {

        ratioMessage =
            "Your estimated EMI represents 30% or more of the entered monthly business income.";
    }


    setText("ratioStatus", ratioMessage);


    // --------------------------------------------------------
    // REPAYMENT INSIGHT
    // --------------------------------------------------------

    setText(
        "insightText",

        `For a ${formatCurrency(loanAmount)} loan at ${annualRate}% interest for ${years} years, your estimated monthly EMI is ${formatCurrency(result.emi)}. Your EMI is approximately ${repaymentRatio.toFixed(1)}% of your entered monthly business income of ${formatCurrency(monthlyIncome)}. Total interest over the loan period is approximately ${formatCurrency(result.totalInterest)}.`
    );


    // --------------------------------------------------------
    // AFFORDABILITY VIEW
    // --------------------------------------------------------

    const remainingIncome =
        monthlyIncome - result.emi;


    setText(
        "affordIncome",
        formatCurrency(monthlyIncome)
    );


    setText(
        "affordEMI",
        formatCurrency(result.emi)
    );


    setText(
        "remainingIncome",
        formatCurrency(Math.max(remainingIncome, 0))
    );


    const affordabilityStatus =
        getElement("affordabilityStatus");


    if (affordabilityStatus) {

        if (repaymentRatio < 30) {

            affordabilityStatus.textContent =
                "EMI is below 30% of the entered monthly business income. This is an informational calculation, not an official eligibility rule.";

            affordabilityStatus.style.background =
                "#eef9ef";

            affordabilityStatus.style.color =
                "#237a20";

        } else {

            affordabilityStatus.textContent =
                "EMI is 30% or more of the entered monthly business income. This is an informational calculation, not an official eligibility rule.";

            affordabilityStatus.style.background =
                "#fff5e8";

            affordabilityStatus.style.color =
                "#a05a00";
        }
    }


    // --------------------------------------------------------
    // SHOW RESULT AREAS
    // --------------------------------------------------------

    revealCalculatorResults();

    console.log("EMI calculation completed:", result);
}


// ============================================================
// SHOW CALCULATOR RESULTS
// ============================================================

function revealCalculatorResults() {

    const possibleSelectors = [
        ".calculator-results",
        ".results-section",
        ".result-section",
        ".results-panel",
        ".calculation-results"
    ];


    possibleSelectors.forEach(selector => {

        document.querySelectorAll(selector).forEach(element => {
            element.style.display = "";
        });

    });
}


// ============================================================
// LOAN COMPARISON
// ============================================================

function compareLoans() {

    const currentAmount =
        parseFloat(
            getElement("loanAmount")?.value
        );

    const currentRate =
        parseFloat(
            getElement("annualRate")?.value
        );

    const currentYears =
        parseFloat(
            getElement("years")?.value
        );


    const alternativeAmount =
        parseFloat(
            getElement("compareAmount")?.value
        );

    const alternativeRate =
        parseFloat(
            getElement("compareRate")?.value
        );

    const alternativeYears =
        parseFloat(
            getElement("compareYears")?.value
        );


    // --------------------------------------------------------
    // VALIDATE CURRENT LOAN
    // --------------------------------------------------------

    if (
        !Number.isFinite(currentAmount) ||
        currentAmount <= 0 ||
        !Number.isFinite(currentRate) ||
        currentRate < 0 ||
        !Number.isFinite(currentYears) ||
        currentYears <= 0
    ) {

        alert(
            "Please enter valid current loan details first."
        );

        return;
    }


    // --------------------------------------------------------
    // VALIDATE ALTERNATIVE LOAN
    // --------------------------------------------------------

    if (
        !Number.isFinite(alternativeAmount) ||
        alternativeAmount <= 0
    ) {

        alert(
            "Please enter a valid alternative loan amount."
        );

        getElement("compareAmount")?.focus();

        return;
    }


    if (
        !Number.isFinite(alternativeRate) ||
        alternativeRate < 0 ||
        alternativeRate > 100
    ) {

        alert(
            "Please enter an alternative interest rate between 0% and 100%."
        );

        getElement("compareRate")?.focus();

        return;
    }


    if (
        !Number.isFinite(alternativeYears) ||
        alternativeYears <= 0 ||
        alternativeYears > 30
    ) {

        alert(
            "Please enter an alternative loan tenure between 1 and 30 years."
        );

        getElement("compareYears")?.focus();

        return;
    }


    // --------------------------------------------------------
    // CALCULATE BOTH OPTIONS
    // --------------------------------------------------------

    const current = calculateLoan(
        currentAmount,
        currentRate,
        currentYears
    );


    const alternative = calculateLoan(
        alternativeAmount,
        alternativeRate,
        alternativeYears
    );


    // --------------------------------------------------------
    // CURRENT LOAN
    // --------------------------------------------------------

    setText(
        "currentCompareEMI",
        formatCurrency(current.emi)
    );

    setText(
        "currentCompareInterest",
        formatCurrency(current.totalInterest)
    );

    setText(
        "currentComparePayment",
        formatCurrency(current.totalPayment)
    );


    // --------------------------------------------------------
    // ALTERNATIVE LOAN
    // --------------------------------------------------------

    setText(
        "alternativeEMI",
        formatCurrency(alternative.emi)
    );

    setText(
        "alternativeInterest",
        formatCurrency(alternative.totalInterest)
    );

    setText(
        "alternativePayment",
        formatCurrency(alternative.totalPayment)
    );


    // --------------------------------------------------------
    // COMPARISON SUMMARY
    // --------------------------------------------------------

    const interestDifference =
        Math.abs(
            current.totalInterest -
            alternative.totalInterest
        );


    setText(
        "comparisonSummary",

        `The two options differ by approximately ${formatCurrency(interestDifference)} in total interest. Based on the entered values, the current loan has total interest of ${formatCurrency(current.totalInterest)}, while the alternative has total interest of ${formatCurrency(alternative.totalInterest)}.`
    );


    const comparisonResults =
        document.querySelector(".comparison-results");


    if (comparisonResults) {
        comparisonResults.style.display = "";
    }


    console.log("Loan comparison completed.");
}


// ============================================================
// RESET CALCULATOR
// ============================================================

function resetCalculator() {

    const inputIds = [
        "loanAmount",
        "annualRate",
        "years",
        "monthlyIncome",
        "compareAmount",
        "compareRate",
        "compareYears"
    ];


    inputIds.forEach(id => {

        const element = getElement(id);

        if (element) {
            element.value = "";
        }

    });


    // Main results

    setText("emi", "₹0.00");
    setText("totalInterest", "₹0.00");
    setText("totalPayment", "₹0.00");


    // Insight

    setText(
        "insightText",
        "Enter your loan details above to estimate your monthly repayment and total interest."
    );


    // Ratio

    setText("ratioValue", "0%");

    setText(
        "ratioStatus",
        "Enter your details to see your repayment ratio."
    );


    const ratioFill = getElement("ratioFill");

    if (ratioFill) {
        ratioFill.style.width = "0%";
    }


    // Affordability

    setText("affordIncome", "₹0.00");
    setText("affordEMI", "₹0.00");
    setText("remainingIncome", "₹0.00");

    const affordabilityStatus =
        getElement("affordabilityStatus");

    if (affordabilityStatus) {

        affordabilityStatus.textContent =
            "Enter your details to check affordability.";

        affordabilityStatus.style.background =
            "";

        affordabilityStatus.style.color =
            "";
    }


    // Comparison

    setText("currentCompareEMI", "₹0.00");
    setText("currentCompareInterest", "₹0.00");
    setText("currentComparePayment", "₹0.00");

    setText("alternativeEMI", "₹0.00");
    setText("alternativeInterest", "₹0.00");
    setText("alternativePayment", "₹0.00");

    setText(
        "comparisonSummary",
        "Enter both loan options to compare them."
    );


    // Comparison result area

    const comparisonResults =
        document.querySelector(".comparison-results");

    if (comparisonResults) {
        comparisonResults.style.display = "none";
    }


    // Scheme matching

    resetSchemeMatcher();


    // Return focus

    getElement("loanAmount")?.focus();
}


// ============================================================
// SCHEME DATABASE
// ============================================================

async function loadSchemeDatabase() {

    try {

        const response =
            await fetch("schemes.json");


        if (!response.ok) {

            throw new Error(
                "Unable to load schemes.json"
            );
        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {

            throw new Error(
                "schemes.json does not contain an array."
            );
        }


        schemeDatabase = data;


        console.log(
            "UdyamAI scheme database loaded:",
            schemeDatabase.length,
            "schemes"
        );


    } catch (error) {

        console.error(
            "Scheme database loading error:",
            error
        );

        schemeDatabase = [];

        const message =
            getElement("schemeResultMessage");

        if (message) {

            message.textContent =
                "Scheme data could not be loaded. Please make sure schemes.json is in the same folder.";
        }
    }
}


// ============================================================
// SCHEME MATCHING
// ============================================================

function findSuitableScheme() {

    const projectType =
        getElement("projectType")?.value.trim();

    const projectCost =
        parseFloat(
            getElement("projectCost")?.value
        );

    const targetGroup =
        getElement("targetGroup")?.value.trim();

    const incomeLevel =
        getElement("incomeLevel")?.value.trim();

    const educationStatus =
        getElement("educationStatus")?.value.trim();


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!projectType) {

        alert("Please select a project type.");

        getElement("projectType")?.focus();

        return;
    }


    if (
        !Number.isFinite(projectCost) ||
        projectCost <= 0
    ) {

        alert(
            "Please enter an estimated project cost greater than ₹0."
        );

        getElement("projectCost")?.focus();

        return;
    }


    if (!targetGroup) {

        alert("Please select a target beneficiary group.");

        getElement("targetGroup")?.focus();

        return;
    }


    if (!incomeLevel) {

        alert("Please select an income level.");

        getElement("incomeLevel")?.focus();

        return;
    }


    if (!educationStatus) {

        alert("Please select an education status.");

        getElement("educationStatus")?.focus();

        return;
    }


    const resultsBox =
        getElement("schemeResults");

    const resultMessage =
        getElement("schemeResultMessage");

    const cardsContainer =
        getElement("schemeCards");


    if (resultsBox) {
        resultsBox.style.display = "";
    }


    if (cardsContainer) {
        cardsContainer.innerHTML = "";
    }


    if (!Array.isArray(schemeDatabase) ||
        schemeDatabase.length === 0) {

        if (resultMessage) {

            resultMessage.textContent =
                "The scheme database could not be loaded. Please make sure schemes.json is available.";
        }

        return;
    }


    // --------------------------------------------------------
    // MATCHING RULE
    // --------------------------------------------------------
    //
    // The supplied scheme reference data gives target
    // beneficiary information.
    //
    // Project type, income level and education status are
    // collected but are not treated as eligibility filters
    // because the supplied reference data does not provide
    // those conditions for every scheme.
    //
    // Therefore this prototype performs a target-beneficiary
    // data match only.
    // --------------------------------------------------------


    const normalizedTarget =
        normalizeText(targetGroup);


    const matchingSchemes =
        schemeDatabase.filter(scheme => {

            if (!scheme.targetBeneficiary) {
                return false;
            }


            return (
                normalizeText(
                    scheme.targetBeneficiary
                ) === normalizedTarget
            );

        });


    // --------------------------------------------------------
    // NO MATCH
    // --------------------------------------------------------

    if (matchingSchemes.length === 0) {

        if (resultMessage) {

            resultMessage.textContent =
                "No scheme matched the selected target beneficiary group in the supplied scheme reference data.";
        }

        return;
    }


    // --------------------------------------------------------
    // MATCH FOUND
    // --------------------------------------------------------

    if (resultMessage) {

        resultMessage.textContent =
            `${matchingSchemes.length} matching scheme${matchingSchemes.length > 1 ? "s" : ""} found based on the supplied target-beneficiary data.`;
    }


    matchingSchemes.forEach(scheme => {

        const card =
            createSchemeCard(scheme);

        if (cardsContainer) {
            cardsContainer.appendChild(card);
        }

    });


    console.log(
        "Scheme matching completed:",
        matchingSchemes
    );
}


// ============================================================
// NORMALIZE TEXT
// ============================================================

function normalizeText(value) {

    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}


// ============================================================
// CREATE SCHEME CARD
// ============================================================

function createSchemeCard(scheme) {

    const card =
        document.createElement("div");

    card.className =
        "scheme-card";


    card.innerHTML = `

        <div class="scheme-card-header">

            <div>

                <h4>
                    ${escapeHTML(
        scheme.schemeName ||
        "Unnamed Scheme"
    )}
                </h4>

                <span class="scheme-type">
                    ${escapeHTML(
        scheme.schemeType ||
        "Scheme"
    )}
                </span>

            </div>

        </div>


        <div class="scheme-card-details">

            <div class="scheme-detail">

                <span class="detail-label">
                    Nodal Body
                </span>

                <strong>
                    ${escapeHTML(
        scheme.organization ||
        "Not specified"
    )}
                </strong>

            </div>


            <div class="scheme-detail">

                <span class="detail-label">
                    Target Group
                </span>

                <strong>
                    ${escapeHTML(
        scheme.targetBeneficiary ||
        "Not specified"
    )}
                </strong>

            </div>


            <div class="scheme-detail">

                <span class="detail-label">
                    Loan Amount
                </span>

                <strong>
                    ${escapeHTML(
        scheme.loanAmount ||
        "Not specified"
    )}
                </strong>

            </div>


            <div class="scheme-detail">

                <span class="detail-label">
                    Project-Cost Financing
                </span>

                <strong>
                    ${escapeHTML(
        scheme.financing ||
        "Not specified"
    )}
                </strong>

            </div>


            <div class="scheme-detail">

                <span class="detail-label">
                    Interest / Credit
                </span>

                <strong>
                    ${escapeHTML(
        scheme.interestRate ||
        "Not specified"
    )}
                </strong>

            </div>


            <div class="scheme-detail">

                <span class="detail-label">
                    Repayment Tenure
                </span>

                <strong>
                    ${escapeHTML(
        scheme.tenure ||
        "Not specified"
    )}
                </strong>

            </div>

        </div>


        <div class="scheme-benefit">

            <span>
                Benefit / Support
            </span>

            <p>
                ${escapeHTML(
        scheme.benefits ||
        "Not specified"
    )}
            </p>

        </div>


        <div class="scheme-source">

            Source:
            ${escapeHTML(
        scheme.officialSource ||
        "Supplied SIH scheme reference data"
    )}

        </div>

    `;


    return card;
}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ============================================================
// RESET SCHEME MATCHER
// ============================================================

function resetSchemeMatcher() {

    const ids = [
        "projectType",
        "projectCost",
        "targetGroup",
        "incomeLevel",
        "educationStatus"
    ];


    ids.forEach(id => {

        const element = getElement(id);

        if (element) {
            element.value = "";
        }

    });


    const schemeResults =
        getElement("schemeResults");

    const schemeCards =
        getElement("schemeCards");

    const schemeResultMessage =
        getElement("schemeResultMessage");


    if (schemeResults) {
        schemeResults.style.display = "none";
    }


    if (schemeCards) {
        schemeCards.innerHTML = "";
    }


    if (schemeResultMessage) {
        schemeResultMessage.textContent = "";
    }
}


// ============================================================
// BUTTON CONNECTION
// ============================================================

function connectButtons() {

    // Calculate button
    const calculateButton =
        findButtonByKeywords([
            "calculate",
            "calculate emi",
            "calculate loan"
        ]);


    if (calculateButton) {

        calculateButton.addEventListener(
            "click",
            calculateEMI
        );
    }


    // Comparison button
    const comparisonButton =
        findButtonByKeywords([
            "compare",
            "compare loans",
            "compare loan"
        ]);


    if (comparisonButton) {

        comparisonButton.addEventListener(
            "click",
            compareLoans
        );
    }


    // Reset button
    const resetButton =
        findButtonByKeywords([
            "reset",
            "reset calculator",
            "clear"
        ]);


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetCalculator
        );
    }


    // Scheme matching button
    const schemeButton =
        getElement("findSchemeButton");


    if (schemeButton) {

        schemeButton.addEventListener(
            "click",
            findSuitableScheme
        );
    }


    console.log("UdyamAI buttons connected.");
}


// ============================================================
// FIND BUTTON USING VISIBLE TEXT
// ============================================================

function findButtonByKeywords(keywords) {

    const buttons =
        Array.from(
            document.querySelectorAll(
                "button, input[type='button'], input[type='submit']"
            )
        );


    return buttons.find(button => {

        const text =
            (
                button.textContent ||
                button.value ||
                ""
            )
                .trim()
                .toLowerCase();


        return keywords.some(keyword =>
            text === keyword.toLowerCase()
        );

    });
}


// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        await loadSchemeDatabase();

        connectButtons();

        console.log(
            "UdyamAI Financial Calculator initialized."
        );

    }
);


// ============================================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ============================================================

window.calculateEMI = calculateEMI;
window.compareLoans = compareLoans;
window.resetCalculator = resetCalculator;
window.findSuitableScheme = findSuitableScheme;
window.loadSchemeDatabase = loadSchemeDatabase;