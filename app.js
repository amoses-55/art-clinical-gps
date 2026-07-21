const sessionSteps = [
    {
        title: "Opening Script",
        prompt: "Introduce the ART process, explain eye movements, and confirm that the client feels ready to begin."
    },
    {
        title: "Target Memory",
        prompt: "Ask the client to identify the memory, image, or situation they want to work on."
    },
    {
        title: "Scene Match",
        prompt: "Ask the client to notice whether the current scene matches the original event or another related memory."
    },
    {
        title: "Utility Check",
        prompt: "Ask whether there is any useful information, protection, or lesson the client wants to keep."
    },
    {
        title: "Eye Movements",
        prompt: "Guide one set of approximately 40 eye movements while the client notices the scene."
    },
    {
        title: "SUDS Rating",
        prompt: "Ask the client to rate distress from 0 to 10."
    },
    {
        title: "Body Scan",
        prompt: "Ask the client to notice any remaining tension, discomfort, or activation in the body."
    },
    {
        title: "Future Template",
        prompt: "Help the client imagine responding successfully in a future situation."
    },
    {
        title: "Session Summary",
        prompt: "Review changes, remaining concerns, and the client’s current level of distress."
    }
];

let currentStep = 0;

function showMessage() {
    currentStep = 0;
    renderSessionStep();
}

function renderSessionStep() {
    const messageBox = document.getElementById("message");
    const step = sessionSteps[currentStep];

    messageBox.innerHTML = `
        <div class="session-card">
            <p>Step ${currentStep + 1} of ${sessionSteps.length}</p>
            <h2>${step.title}</h2>
            <p>${step.prompt}</p>

            <div class="session-buttons">
                <button onclick="previousStep()" ${currentStep === 0 ? "disabled" : ""}>
                    Previous
                </button>

                <button onclick="nextStep()">
                    ${currentStep === sessionSteps.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
        </div>
    `;

    messageBox.scrollIntoView({ behavior: "smooth" });
}

function nextStep() {
    if (currentStep < sessionSteps.length - 1) {
        currentStep++;
        renderSessionStep();
    } else {
        document.getElementById("message").innerHTML = `
            <div class="session-card">
                <h2>Session Complete</h2>
                <p>The guided session sequence is finished.</p>
                <button onclick="showMessage()">Start Again</button>
            </div>
        `;
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        renderSessionStep();
    }
}
