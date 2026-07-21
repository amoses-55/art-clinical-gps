let sessionType = "";
let currentStep = 0;

const basicSessionSteps = [
    "Opening Script",
    "Target Memory",
    "Initial SUDS",
    "Eye Movements",
    "Final SUDS",
    "Body Scan",
    "Future Template",
    "Session Summary"
];

const typicalSessionSteps = [
    "Opening Script",
    "Target Memory",
    "Scene Match",
    "Utility Check",
    "Initial ARTometer",
    "Initial SUDS",
    "Eye Movements",
    "ARTometer Recheck",
    "SUDS Recheck",
    "Body Scan",
    "Future Template",
    "Session Summary"
];

function startBasicSession() {
    sessionType = "basic";
    currentStep = 0;
    renderSessionStep();
}

function startTypicalSession() {
    sessionType = "typical";
    currentStep = 0;
    renderSessionStep();
}

function getCurrentSteps() {
    if (sessionType === "typical") {
        return typicalSessionSteps;
    }

    return basicSessionSteps;
}

function renderSessionStep() {
    const messageBox = document.getElementById("message");
    const steps = getCurrentSteps();
    const stepTitle = steps[currentStep];

    messageBox.innerHTML = `
        <div class="card session-card">

            <p>
                <strong>
                    Step ${currentStep + 1} of ${steps.length}
                </strong>
            </p>

            <h2>${stepTitle}</h2>

            <p>
                The content for this step will be added next.
            </p>

            <div style="
                display:flex;
                justify-content:center;
                gap:12px;
                margin-top:20px;
            ">
                <button
                    type="button"
                    onclick="previousStep()"
                    ${currentStep === 0 ? "disabled" : ""}
                >
                    Previous
                </button>

                <button
                    type="button"
                    onclick="nextStep()"
                >
                    ${
                        currentStep === steps.length - 1
                            ? "Finish"
                            : "Next"
                    }
                </button>
            </div>

        </div>
    `;

    messageBox.scrollIntoView({
        behavior: "smooth"
    });
}

function nextStep() {
    const steps = getCurrentSteps();

    if (currentStep < steps.length - 1) {
        currentStep++;
        renderSessionStep();
        return;
    }

    showSessionComplete();
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        renderSessionStep();
    }
}

function showSessionComplete() {
    const messageBox = document.getElementById("message");

    messageBox.innerHTML = `
        <div class="card session-card">

            <h2>Session Complete</h2>

            <p>
                ${
                    sessionType === "typical"
                        ? "Typical ART session completed."
                        : "Basic ART session completed."
                }
            </p>

            <button
                type="button"
                onclick="returnHome()"
            >
                Return Home
            </button>

        </div>
    `;
}

function returnHome() {
    sessionType = "";
    currentStep = 0;

    const messageBox = document.getElementById("message");
    messageBox.innerHTML = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function showMessage(message) {
    const messageBox = document.getElementById("message");

    messageBox.innerHTML = `
        <div class="card session-card">
            <h2>${message}</h2>
        </div>
    `;

    messageBox.scrollIntoView({
        behavior: "smooth"
    });
}
