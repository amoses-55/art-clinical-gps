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
    prompt: `
        <p>Ask the client to rate their current distress.</p>

        <div class="suds-scale">
            <label for="sudsRange">
                Current SUDS: <strong><span id="sudsValue">5</span></strong>
            </label>

            <input
                type="range"
                id="sudsRange"
                min="0"
                max="10"
                value="5"
                step="1"
                oninput="updateSuds(this.value)"
            >

            <div class="suds-labels">
                <span>0<br>Calm</span>
                <span>5<br>Moderate</span>
                <span>10<br>Extreme</span>
            </div>

            <p id="sudsDescription">
                Moderate distress. Uncomfortable but still functional.
            </p>
        </div>
    `
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
