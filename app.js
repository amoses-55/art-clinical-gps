const sessionSteps = [
    {
        title: "Opening Script",
        prompt: `
        <p>Introduce the ART process.</p>

        <ul>
            <li>Explain bilateral eye movements.</li>
            <li>Confirm the client understands the process.</li>
            <li>Confirm the client is ready to begin.</li>
        </ul>
        `
    },

    {
        title: "Target Memory",
        prompt: `
        <p>Ask the client to identify the target memory.</p>
        `
    },

    {
        title: "Scene Match",
        prompt: `
        <p>Help determine whether the image matches the original event.</p>
        `
    },

    {
        title: "Utility Check",
        prompt: `
        <p>Ask if there is anything useful about the memory that should be kept.</p>
        `
    },

    {
        title: "Eye Movements",
        prompt: `
        <h3>40 Eye Movements</h3>

        <p>Complete one full set of bilateral eye movements.</p>

        <button onclick="alert('Future versions will include a built-in eye movement timer.')">
            Start Eye Movement Set
        </button>
        `
    },

    {
        title: "SUDS Rating",

        prompt: `

        <h3>Subjective Units of Distress Scale</h3>

        <p><strong>Current SUDS:
        <span id="sudsValue">5</span>/10</strong></p>

        <input
            type="range"
            id="sudsRange"
            min="0"
            max="10"
            value="5"
            step="1"
            oninput="updateSuds(this.value)"
            style="width:100%;"
        >

        <div style="display:flex;justify-content:space-between;font-size:14px;">
            <span>0</span>
            <span>5</span>
            <span>10</span>
        </div>

        <br>

        <div id="sudsDescription">

        Moderate distress.<br>
        Uncomfortable but still functional.

        </div>

        `
    },

    {
        title: "Body Scan",
        prompt: `
        <p>Ask the client to notice any remaining body sensations.</p>
        `
    },

    {
        title: "Future Template",
        prompt: `
        <p>Imagine successfully handling a similar future situation.</p>
        `
    },

    {
        title: "Session Summary",
        prompt: `
        <p>Review progress, remaining distress, and homework.</p>
        `
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

            <h2>${step.title}</h2>

            <p><strong>Step ${currentStep + 1} of ${sessionSteps.length}</strong></p>

            ${step.prompt}

            <br><br>

            <button onclick="previousStep()"
            ${currentStep===0?"disabled":""}>
            ◀ Previous
            </button>

            <button onclick="nextStep()">
            ${currentStep===sessionSteps.length-1?"Finish":"Next ▶"}
            </button>

        </div>

    `;
}

function nextStep(){

    if(currentStep<sessionSteps.length-1){

        currentStep++;

        renderSessionStep();

    }

    else{

        document.getElementById("message").innerHTML=`

        <div class="session-card">

        <h2>Session Complete</h2>

        <p>The ART protocol is complete.</p>

        <button onclick="showMessage()">

        Start New Session

        </button>

        </div>

        `;

    }

}

function previousStep(){

    if(currentStep>0){

        currentStep--;

        renderSessionStep();

    }

}

function updateSuds(value){

    document.getElementById("sudsValue").innerHTML=value;

    const descriptions=[

        "Peace. No distress.",
        "Very calm.",
        "Slight distress.",
        "Mild distress.",
        "Mild to moderate distress.",
        "Moderate distress.",
        "Moderate to strong distress.",
        "Strong distress.",
        "Very distressed.",
        "Extremely distressed.",
        "Unbearably upset."

    ];

    document.getElementById("sudsDescription").innerHTML=descriptions[value];

}
