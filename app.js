let currentStep = 0;

const basicSteps = [
    "Opening Script",
    "Target Memory",
    "Initial SUDS",
    "Eye Movements",
    "Final SUDS",
    "Body Scan",
    "Future Template",
    "Session Summary"
];

function startBasicSession() {
    currentStep = 0;
    renderBasicStep();
}

function renderBasicStep() {
    const messageBox = document.getElementById("message");
    const stepTitle = basicSteps[currentStep];

    messageBox.innerHTML = `
        <div class="card">

            <p>
                <strong>
                    Step ${currentStep + 1} of ${basicSteps.length}
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
                    onclick="previousBasicStep()"
                    ${currentStep === 0 ? "disabled" : ""}
                >
                    Previous
                </button>

                <button
                    type="button"
                    onclick="nextBasicStep()"
                >
                    ${
                        currentStep === basicSteps.length - 1
                            ? "Finish"
                            : "Next"
                    }
                </button>
            </div>

        </div>
    `;
}

function nextBasicStep() {
    if (currentStep < basicSteps.length - 1) {
        currentStep++;
        renderBasicStep();
        return;
    }

    document.getElementById("message").innerHTML = `
        <div class="card">
            <h2>Basic Session Complete</h2>

            <button
                type="button"
                onclick="startBasicSession()"
            >
                Start Again
            </button>
        </div>
    `;
}

function previousBasicStep() {
    if (currentStep > 0) {
        currentStep--;
        renderBasicStep();
    }
}

function startTypicalSession() {
    document.getElementById("message").innerHTML = `
        <div class="card">
            <h2>Typical Session</h2>
            <p>We will build this after the Basic Session is stable.</p>
        </div>
    `;
}

function showMessage(message) {
    document.getElementById("message").innerHTML = `
        <div class="card">
            <h2>${message}</h2>
        </div>
    `;
}
