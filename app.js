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
    renderStep();
}

function renderStep() {

    document.getElementById("message").innerHTML = `

        <div class="card">

            <h2>${basicSteps[currentStep]}</h2>

            <p>
                Step ${currentStep + 1} of ${basicSteps.length}
            </p>

            <button onclick="previousStep()" ${currentStep===0?"disabled":""}>
                Previous
            </button>

            <button onclick="nextStep()">
                ${currentStep===basicSteps.length-1?"Finish":"Next"}
            </button>

        </div>

    `;
}

function nextStep(){

    if(currentStep < basicSteps.length-1){

        currentStep++;

        renderStep();

    }else{

        document.getElementById("message").innerHTML=`

            <div class="card">

                <h2>Basic Session Complete</h2>

            </div>

        `;

    }

}

function previousStep(){

    if(currentStep>0){

        currentStep--;

        renderStep();

    }

}

function startTypicalSession(){

    document.getElementById("message").innerHTML=`

        <div class="card">

            <h2>Typical Session</h2>

            <p>Coming Next</p>

        </div>

    `;

}

function showMessage(message){

    document.getElementById("message").innerHTML=`

        <div class="card">

            <h2>${message}</h2>

        </div>

    `;

}
