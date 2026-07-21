{
    title: "Scene Match",
    prompt: `
        <div style="text-align:left; max-width:650px; margin:0 auto;">

            <h3>Purpose</h3>
            <p>
                Clarify which scene, image, or moment is connected to the strongest distress.
            </p>

            <h3>Therapist Prompts</h3>

            <div style="
                background:#f4f7fb;
                padding:16px;
                border-radius:10px;
                margin-bottom:18px;
            ">
                <p>“When you think about the situation, what scene or image stands out most?”</p>
                <p>“Does this feel like the original event, or does another memory come up?”</p>
                <p>“Which moment carries the strongest emotional or physical reaction?”</p>
            </div>

            <h3>Scene Selected</h3>

            <select
                id="sceneType"
                onchange="saveSceneType(this.value)"
                style="
                    width:100%;
                    padding:12px;
                    font-size:16px;
                    border-radius:8px;
                    border:1px solid #bbb;
                    margin-bottom:18px;
                "
            >
                <option value="">Select one</option>
                <option value="Original event">Original event</option>
                <option value="Related memory">Related memory</option>
                <option value="Present-day trigger">Present-day trigger</option>
                <option value="Body sensation">Body sensation</option>
                <option value="Unclear">Unclear</option>
            </select>

            <h3>Brief Scene Note</h3>

            <textarea
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
            ></textarea>

        </div>
    `
},

{
    title: "Utility Check",
    prompt: `
        <div style="text-align:left; max-width:650px; margin:0 auto;">
            <h3>Purpose</h3>
            <p>
                Identify any useful information, protection, meaning, or lesson the client wants to keep.
            </p>

            <h3>Therapist Prompt</h3>

            <div style="
                background:#f4f7fb;
                padding:16px;
                border-radius:10px;
            ">
                <p>
                    “Is there anything useful or important from this experience that you want to keep?”
                </p>
            </div>
        </div>
    `
},

{
    title: "Eye Movements",
    prompt: `
        <div style="text-align:left; max-width:650px; margin:0 auto;">
            <h3>Eye-Movement Set</h3>
            <p>
                Guide one set of approximately 40 eye movements while the client notices the scene.
            </p>
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
                5 / 10
            </div>

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
