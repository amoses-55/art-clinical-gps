const sessionSteps = [
{
    title: "Opening Script",
    prompt: `
        <div style="text-align:left; max-width:650px; margin:0 auto;">

            <h3>Purpose</h3>
            <p>
                Explain the ART process, establish safety, and confirm that the client is ready to begin.
            </p>

            <h3>Therapist Prompt</h3>

            <div style="
                background:#f4f7fb;
                padding:16px;
                border-radius:10px;
                margin-bottom:18px;
            ">
                <p>
                    “Today we will work with a memory, image, situation, or body sensation that is causing distress.
                    You do not have to tell me every detail. I will guide you through the process while you remain in control.”
                </p>

                <p>
                    “I will ask you to follow my hand with your eyes. You can pause or stop at any time.”
                </p>
            </div>

            <h3>Checklist</h3>

            <label style="display:block; margin:10px 0;">
                <input type="checkbox">
                Explained eye movements
            </label>

            <label style="display:block; margin:10px 0;">
                <input type="checkbox">
                Confirmed client remains in control
            </label>

            <label style="display:block; margin:10px 0;">
                <input type="checkbox">
                Confirmed client can pause or stop
            </label>

            <label style="display:block; margin:10px 0;">
                <input type="checkbox">
                Client is ready to begin
            </label>

            <h3>Notes</h3>

            <textarea
                rows="4"
                placeholder="Optional session notes..."
                style="
                    width:100%;
                    padding:12px;
                    border-radius:8px;
                    border:1px solid #bbb;
                    box-sizing:border-box;
                    font-size:16px;
                "
            ></textarea>

        </div>
    `
},
    {
    title: "Target Memory",
    prompt: `
        <div style="text-align:left; max-width:650px; margin:0 auto;">

            <h3>Purpose</h3>
            <p>
                Identify the memory, image, trigger, future fear, or body sensation to address.
            </p>

            <h3>Target Type</h3>

            <select
                id="targetType"
                onchange="saveTargetType(this.value)"
                style="
                    width:100%;
                    padding:12px;
                    font-size:16px;
                    border-radius:8px;
                    border:1px solid #bbb;
                    margin-bottom:18px;
                "
            >
                <option value="">Select a target type</option>
                <option value="Memory">Memory</option>
                <option value="Image">Image</option>
                <option value="Body sensation">Body sensation</option>
                <option value="Present trigger">Present trigger</option>
                <option value="Future fear">Future fear</option>
            </select>

            <h3>Target Description</h3>

            <textarea
                id="targetDescription"
                rows="4"
                placeholder="Use a brief, non-identifying description..."
                oninput="saveTargetDescription(this.value)"
                style="
                    width:100%;
                    padding:12px;
                    font-size:16px;
                    border-radius:8px;
                    border:1px solid #bbb;
                    box-sizing:border-box;
                "
            ></textarea>

        </div>
    `
},

                <div
                    id="sudsDescription"
                    style="
                        font-size:18px;
                        margin-bottom:20px;
                    "
                >
                    Moderate distress
                </div>

                <div
                    id="sudsScale"
                    style="
                        display:flex;
                        flex-direction:column;
                        gap:6px;
                        margin:20px auto;
                        max-width:420px;
                    "
                >
                    ${createSudsButtons()}
                </div>

                <p style="font-size:14px;">
                    Tap the number that best represents the client’s current distress.
                </p>
            </div>
        `
    },
    {
        title: "Body Scan",
        prompt: `
            <p>Ask the client to notice any remaining tension, discomfort, or activation in the body.</p>
        `
    },
    {
        title: "Future Template",
        prompt: `
            <p>Help the client imagine responding successfully in a future situation.</p>
        `
    },
    {
        title: "Session Summary",
        prompt: `
            <p>Review changes, remaining concerns, and the client’s current distress level.</p>
            <p><strong>Recorded SUDS:</strong> <span id="summarySuds"></span></p>
        `
    }
];

let sessionData = {
    date: new Date().toLocaleDateString(),
    targetType: "",
    targetDescription: "",
    initialSuds: "",
    finalSuds: "",
    notes: ""
};

function createSudsButtons() {
    const descriptions = [
        "Peace and complete calm",
        "Very calm",
        "Slight distress",
        "Mild distress",
        "Noticeable distress",
        "Moderate distress",
        "Strong distress",
        "Quite distressed",
        "Very distressed",
        "Extremely distressed",
        "Unbearable distress"
    ];

    let buttons = "";

    for (let value = 10; value >= 0; value--) {
        buttons += `
            <button
                type="button"
                onclick="selectSuds(${value})"
                id="suds-${value}"
                style="
                    width:100%;
                    display:flex;
                    align-items:center;
                    gap:14px;
                    padding:11px 14px;
                    border-radius:8px;
                    border:2px solid transparent;
                    background:${getSudsColor(value)};
                    color:${value >= 7 ? "white" : "#222"};
                    text-align:left;
                    font-size:16px;
                "
            >
                <strong style="font-size:22px; min-width:30px;">
                    ${value}
                </strong>

                <span>
                    ${descriptions[value]}
                </span>
            </button>
        `;
    }

    return buttons;
}

function getSudsColor(value) {
    if (value >= 9) return "#c62828";
    if (value >= 7) return "#e65100";
    if (value >= 5) return "#f9a825";
    if (value >= 3) return "#fdd835";
    if (value >= 1) return "#7cb342";
    return "#42a5f5";
}

function selectSuds(value) {
    selectedSuds = value;

    const descriptions = [
        "Peace and complete calm",
        "Very calm",
        "Slight distress",
        "Mild distress",
        "Noticeable distress",
        "Moderate distress",
        "Strong distress",
        "Quite distressed",
        "Very distressed",
        "Extremely distressed",
        "Unbearable distress"
    ];

    document.getElementById("sudsScore").textContent = `${value} / 10`;
    document.getElementById("sudsDescription").textContent =
        descriptions[value];

    for (let number = 0; number <= 10; number++) {
        const button = document.getElementById(`suds-${number}`);

        if (button) {
            button.style.border =
                number === value
                    ? "4px solid #111"
                    : "2px solid transparent";

            button.style.transform =
                number === value
                    ? "scale(1.03)"
                    : "scale(1)";
        }
    }
}

function showMessage(message) {
    if (message !== "Opening Script") {
        const messageBox = document.getElementById("message");
        messageBox.textContent = message;
        messageBox.scrollIntoView({ behavior: "smooth" });
        return;
    }

    currentStep = 0;
    renderSessionStep();
}

function renderSessionStep() {
    const messageBox = document.getElementById("message");
    const step = sessionSteps[currentStep];

    messageBox.innerHTML = `
        <div
            class="session-card"
            style="
                background:white;
                border-radius:12px;
                padding:24px;
                margin:20px auto;
                max-width:700px;
                box-shadow:0 2px 10px rgba(0,0,0,.12);
            "
        >
            <p>
                <strong>
                    Step ${currentStep + 1} of ${sessionSteps.length}
                </strong>
            </p>

            <h2>${step.title}</h2>

            <div>${step.prompt}</div>

            <div
                style="
                    display:flex;
                    justify-content:center;
                    gap:12px;
                    margin-top:25px;
                "
            >
                <button
                    onclick="previousStep()"
                    ${currentStep === 0 ? "disabled" : ""}
                >
                    Previous
                </button>

                <button onclick="nextStep()">
                    ${
                        currentStep === sessionSteps.length - 1
                            ? "Finish"
                            : "Next"
                    }
                </button>
            </div>
        </div>
    `;

    if (step.title === "SUDS Rating") {
        selectSuds(selectedSuds);
    }

    if (step.title === "Session Summary") {
        const summary = document.getElementById("summarySuds");

        if (summary) {
            summary.textContent = `${selectedSuds} / 10`;
        }
    }

    messageBox.scrollIntoView({ behavior: "smooth" });
}

function nextStep() {
    if (currentStep < sessionSteps.length - 1) {
        currentStep++;
        renderSessionStep();
    } else {
        document.getElementById("message").innerHTML = `
            <div
                class="session-card"
                style="
                    background:white;
                    border-radius:12px;
                    padding:24px;
                    margin:20px auto;
                    max-width:700px;
                    box-shadow:0 2px 10px rgba(0,0,0,.12);
                "
            >
                <h2>Session Complete</h2>

                <p>
                    Recorded SUDS:
                    <strong>${selectedSuds} / 10</strong>
                </p>

                <button onclick="showMessage('Opening Script')">
                    Start Again
                </button>
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
function saveTargetType(value) {
    sessionData.targetType = value;
}

function saveTargetDescription(value) {
    sessionData.targetDescription = value;
}
