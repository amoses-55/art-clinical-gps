let currentStep = 0;
let selectedSuds = 5;

let sessionData = {
    date: new Date().toLocaleDateString(),
    targetType: "",
    targetDescription: "",
    sceneType: "",
    sceneNote: "",
    utilityNote: "",
    eyeMovementComplete: false,
    initialSuds: "",
    finalSuds: "",
    bodyScanNote: "",
    futureTemplateNote: "",
    notes: ""
};

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getSudsDescription(value) {
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

    return descriptions[value] || "";
}

function getSudsColor(value) {
    if (value >= 9) return "#c62828";
    if (value >= 7) return "#e65100";
    if (value >= 5) return "#f9a825";
    if (value >= 3) return "#fdd835";
    if (value >= 1) return "#7cb342";

    return "#42a5f5";
}

function createSudsButtons() {
    let buttons = "";

    for (let value = 10; value >= 0; value--) {
        buttons += `
            <button
                type="button"
                id="suds-${value}"
                onclick="selectSuds(${value})"
            >
                <strong>${value}</strong>
                <span>${getSudsDescription(value)}</span>
            </button>
        `;
    }

    return buttons;
}

const sessionSteps = [
                    id="sceneNote"
                    rows="3"
                    placeholder="Use a brief, non-identifying description..."
                    oninput="saveSceneNote(this.value)"
                    style="
                        width:100%;
                        padding:12px;
                        font-size:16px;
                        border-radius:8px;
                        border:1px solid #bbb;
                        box-sizing:border-box;
                    "
                >${escapeHtml(sessionData.sceneNote)}</textarea>

            </div>
        `
    },

    {
        title: "Utility Check",
        prompt: `
            <div style="text-align:left; max-width:650px; margin:0 auto;">

                <h3>Purpose</h3>

                <p>
                    Identify useful information, protection, meaning,
                    or a lesson the client wants to keep.
                </p>

                <h3>Therapist Prompt</h3>

                <div style="
                    background:#f4f7fb;
                    padding:16px;
                    border-radius:10px;
                    margin-bottom:18px;
                ">
                    <p>
                        “Is there anything useful or important from this
                        experience that you want to keep?”
                    </p>
                </div>

                <h3>Utility Note</h3>

                <textarea
                    id="utilityNote"
                    rows="3"
                    placeholder="Optional brief, non-identifying note..."
                    oninput="saveUtilityNote(this.value)"
                    style="
                        width:100%;
                        padding:12px;
                        font-size:16px;
                        border-radius:8px;
                        border:1px solid #bbb;
                        box-sizing:border-box;
                    "
                >${escapeHtml(sessionData.utilityNote)}</textarea>

            </div>
        `
    },

    {
        title: "Eye Movements",
        prompt: `
            <div style="text-align:left; max-width:650px; margin:0 auto;">

                <h3>Eye-Movement Set</h3>

                <p>
                    Guide an eye-movement set while the client notices
                    the scene and any changes that occur.
                </p>

                <label style="display:block; margin:12px 0;">
                    <input
                        id="eyeMovementComplete"
                        type="checkbox"
                        onchange="saveEyeMovementComplete(this.checked)"
                    >
                    Eye-movement set completed
                </label>

            </div>
        `
    },

    {
        title: "SUDS Rating",
        prompt: `
            <div style="max-width:600px; margin:0 auto;">

                <h3>Subjective Units of Distress</h3>

                <div
                    id="sudsScore"
                    style="
                        font-size:52px;
                        font-weight:bold;
                        margin:15px 0;
                    "
                >
                    ${selectedSuds} / 10
                </div>

                <div
                    id="sudsDescription"
                    style="
                        font-size:18px;
                        margin-bottom:20px;
                    "
                >
                    ${getSudsDescription(selectedSuds)}
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
            <div style="text-align:left; max-width:650px; margin:0 auto;">

                <h3>Purpose</h3>

                <p>
                    Ask the client to notice any remaining tension,
                    discomfort, or activation in the body.
                </p>

                <h3>Body Scan Note</h3>

                <textarea
                    id="bodyScanNote"
                    rows="3"
                    placeholder="Optional brief, non-identifying note..."
                    oninput="saveBodyScanNote(this.value)"
                    style="
                        width:100%;
                        padding:12px;
                        font-size:16px;
                        border-radius:8px;
                        border:1px solid #bbb;
                        box-sizing:border-box;
                    "
                >${escapeHtml(sessionData.bodyScanNote)}</textarea>

            </div>
        `
    },

    {
        title: "Future Template",
        prompt: `
            <div style="text-align:left; max-width:650px; margin:0 auto;">

                <h3>Purpose</h3>

                <p>
                    Help the client imagine responding successfully
                    in a future situation.
                </p>

                <h3>Future Template Note</h3>

                <textarea
                    id="futureTemplateNote"
                    rows="3"
                    placeholder="Optional brief, non-identifying note..."
                    oninput="saveFutureTemplateNote(this.value)"
                    style="
                        width:100%;
                        padding:12px;
                        font-size:16px;
                        border-radius:8px;
                        border:1px solid #bbb;
                        box-sizing:border-box;
                    "
                >${escapeHtml(sessionData.futureTemplateNote)}</textarea>

            </div>
        `
    },

    {
        title: "Session Summary",
        prompt: `
            <div style="text-align:left; max-width:650px; margin:0 auto;">

                <p>
                    Review changes, remaining concerns,
                    and the client’s current distress level.
                </p>

                <p>
                    <strong>Initial SUDS:</strong>
                    <span id="summaryInitialSuds"></span>
                </p>

                <label for="finalSuds">
                    <strong>Final SUDS</strong>
                </label>

                <select
                    id="finalSuds"
                    onchange="saveFinalSuds(this.value)"
                    style="
                        width:100%;
                        padding:12px;
                        font-size:16px;
                        border-radius:8px;
                        border:1px solid #bbb;
                        margin:10px 0 18px;
                    "
                >
                    <option value="">Select final SUDS</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <button
                    type="button"
                    onclick="downloadSessionCsv()"
                    style="margin-top:12px;"
                >
                    Download Session Results
                </button>

            </div>
        `
    }
];

function selectSuds(value) {
    selectedSuds = value;

    if (sessionData.initialSuds === "") {
        sessionData.initialSuds = value;
    }

    const score = document.getElementById("sudsScore");
    const description = document.getElementById("sudsDescription");

    if (score) {
        score.textContent = `${value} / 10`;
    }

    if (description) {
        description.textContent = getSudsDescription(value);
    }

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
    const messageBox = document.getElementById("message");

    if (!messageBox) {
        return;
    }

    if (
        message === "Opening Script" ||
        message === "Start Session"
    ) {
        currentStep = 0;
        renderSessionStep();
        return;
    }

    messageBox.textContent = message;
    messageBox.scrollIntoView({
        behavior: "smooth"
    });
}

function renderSessionStep() {
    const messageBox = document.getElementById("message");

    if (!messageBox) {
        return;
    }

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

            <div>
                ${step.prompt}
            </div>

            <div
                style="
                    display:flex;
                    justify-content:center;
                    gap:12px;
                    margin-top:25px;
                "
            >
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
                        currentStep === sessionSteps.length - 1
                            ? "Finish"
                            : "Next"
                    }
                </button>
            </div>
        </div>
    `;

    restoreStepValues(step.title);

    messageBox.scrollIntoView({
        behavior: "smooth"
    });
}

function restoreStepValues(title) {
    if (title === "Target Memory") {
        const targetType =
            document.getElementById("targetType");

        if (targetType) {
            targetType.value = sessionData.targetType;
        }
    }

    if (title === "Scene Match") {
        const sceneType =
            document.getElementById("sceneType");

        if (sceneType) {
            sceneType.value = sessionData.sceneType;
        }
    }

    if (title === "Eye Movements") {
        const checkbox =
            document.getElementById("eyeMovementComplete");

        if (checkbox) {
            checkbox.checked =
                sessionData.eyeMovementComplete;
        }
    }

    if (title === "SUDS Rating") {
        selectSuds(selectedSuds);
    }

    if (title === "Session Summary") {
        const initialSuds =
            document.getElementById("summaryInitialSuds");

        const finalSuds =
            document.getElementById("finalSuds");

        if (initialSuds) {
            initialSuds.textContent =
                sessionData.initialSuds === ""
                    ? "Not recorded"
                    : `${sessionData.initialSuds} / 10`;
        }

        if (finalSuds) {
            finalSuds.value =
                sessionData.finalSuds;
        }
    }
}

function nextStep() {
    if (currentStep < sessionSteps.length - 1) {
        currentStep++;
        renderSessionStep();
        return;
    }

    const messageBox =
        document.getElementById("message");

    if (!messageBox) {
        return;
    }

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
            <h2>Session Complete</h2>

            <p>
                Initial SUDS:
                <strong>
                    ${
                        sessionData.initialSuds === ""
                            ? "Not recorded"
                            : sessionData.initialSuds + " / 10"
                    }
                </strong>
            </p>

            <p>
                Final SUDS:
                <strong>
                    ${
                        sessionData.finalSuds === ""
                            ? "Not recorded"
                            : sessionData.finalSuds + " / 10"
                    }
                </strong>
            </p>

            <button
                type="button"
                onclick="downloadSessionCsv()"
            >
                Download Session Results
            </button>

            <button
                type="button"
                onclick="resetSession()"
                style="margin-left:10px;"
            >
                Start Again
            </button>
        </div>
    `;
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        renderSessionStep();
    }
}

function resetSession() {
    currentStep = 0;
    selectedSuds = 5;

    sessionData = {
        date: new Date().toLocaleDateString(),
        targetType: "",
        targetDescription: "",
        sceneType: "",
        sceneNote: "",
        utilityNote: "",
        eyeMovementComplete: false,
        initialSuds: "",
        finalSuds: "",
        bodyScanNote: "",
        futureTemplateNote: "",
        notes: ""
    };

    renderSessionStep();
}

function saveOpeningNotes(value) {
    sessionData.notes = value;
}

function saveTargetType(value) {
    sessionData.targetType = value;
}

function saveTargetDescription(value) {
    sessionData.targetDescription = value;
}

function saveSceneType(value) {
    sessionData.sceneType = value;
}

function saveSceneNote(value) {
    sessionData.sceneNote = value;
}

function saveUtilityNote(value) {
    sessionData.utilityNote = value;
}

function saveEyeMovementComplete(value) {
    sessionData.eyeMovementComplete =
        Boolean(value);
}

function saveBodyScanNote(value) {
    sessionData.bodyScanNote = value;
}

function saveFutureTemplateNote(value) {
    sessionData.futureTemplateNote = value;
}

function saveFinalSuds(value) {
    sessionData.finalSuds = value;
}

function csvEscape(value) {
    const text = String(value ?? "");

    return `"${text.replaceAll('"', '""')}"`;
}

function downloadSessionCsv() {
    const headers = [
        "Date",
        "Target Type",
        "Target Description",
        "Scene Type",
        "Scene Note",
        "Utility Note",
        "Eye Movements Completed",
        "Initial SUDS",
        "Final SUDS",
        "SUDS Change",
        "Body Scan Note",
        "Future Template Note",
        "Session Notes"
    ];

    let sudsChange = "";

    if (
        sessionData.initialSuds !== "" &&
        sessionData.finalSuds !== ""
    ) {
        sudsChange =
            Number(sessionData.initialSuds) -
            Number(sessionData.finalSuds);
    }

    const values = [
        sessionData.date,
        sessionData.targetType,
        sessionData.targetDescription,
        sessionData.sceneType,
        sessionData.sceneNote,
        sessionData.utilityNote,
        sessionData.eyeMovementComplete
            ? "Yes"
            : "No",
        sessionData.initialSuds,
        sessionData.finalSuds,
        sudsChange,
        sessionData.bodyScanNote,
        sessionData.futureTemplateNote,
        sessionData.notes
    ];

    const csv =
        "\uFEFF" +
        headers.map(csvEscape).join(",") +
        "\n" +
        values.map(csvEscape).join(",") +
        "\n";

    const blob = new Blob(
        [csv],
        {
            type: "text/csv;charset=utf-8;"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        `ART-session-${new Date()
            .toISOString()
            .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}
