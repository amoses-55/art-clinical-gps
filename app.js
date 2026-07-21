let currentStep = 0;
let selectedSuds = 5;

let sessionData = {
    date: new Date().toLocaleDateString(),
    targetType: "",
    targetDescription: "",
    sceneType: "",
    sceneNote: "",
    initialSuds: "",
    finalSuds: "",
    notes: ""
};
function saveSceneType(value) {
    sessionData.sceneType = value;
}

function saveSceneNote(value) {
    sessionData.sceneNote = value;
}
