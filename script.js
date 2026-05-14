let state = "START";

function sendMessage() {

    const inputBox = document.getElementById("userInput");

    const userText = inputBox.value.toLowerCase().trim();

    if (userText === "") return;

    addMessage(userText, "user-message");

    addHistory(userText);

    showTyping();

    setTimeout(() => {

        removeTyping();

        const reply = processInput(userText);

        if (state === "EMERGENCY") {
            addMessage(reply, "emergency-message");
            showPopup();
        } else {
            addMessage(reply, "bot-message");
        }

    }, 1000);

    inputBox.value = "";
}

function processInput(input) {

    // 🚨 EMERGENCY DETECTION

    if (
        input.includes("chest pain") ||
        input.includes("heart pain") ||
        input.includes("heart attack") ||
        input.includes("breathing problem") ||
        input.includes("difficulty breathing") ||
        input.includes("accident") ||
        input.includes("bleeding") ||
        input.includes("unconscious") ||
        input.includes("faint") ||
        input.includes("stroke") ||
        input.includes("seizure")
    ) {

        state = "EMERGENCY";

        updateState();

        return (
            "🚨 Emergency Alert!\n\n" +

            "A serious condition may be detected.\n\n" +

            "📞 Call Ambulance: 102 / 108 immediately.\n" +

            "🏥 Seek urgent medical help.\n\n" +

            "🧘 Stay calm and do not delay."
        );
    }

    // 🧠 NORMAL HEALTH RESPONSES

    let replies = [];

    if (input.includes("fever")) {

        state = "FEVER";

        replies.push(
            "🌡 Fever detected\nDrink plenty of water, take proper rest, and monitor temperature."
        );
    }

    if (
        input.includes("cough") ||
        input.includes("cought")
    ) {

        state = "COUGH";

        replies.push(
            "🤧 Cough detected\nDrink warm water, avoid cold drinks, and take steam."
        );
    }

    if (
        input.includes("cold") ||
        input.includes("running nose") ||
        input.includes("runny nose") ||
        input.includes("blocked nose")
    ) {

        state = "COLD";

        replies.push(
            "👃 Cold / Running Nose detected\nTake steam, drink warm fluids, and rest properly."
        );
    }

    if (
        input.includes("headache") ||
        input.includes("head pain")
    ) {

        state = "HEADACHE";

        replies.push(
            "🤕 Headache detected\nDrink water, reduce screen time, and rest in a quiet place."
        );
    }

    if (
        input.includes("stomach pain") ||
        input.includes("vomit") ||
        input.includes("vomiting") ||
        input.includes("loose motion") ||
        input.includes("diarrhea")
    ) {

        state = "STOMACH";

        replies.push(
            "🤢 Stomach issue detected\nDrink ORS/water and eat light food."
        );
    }

    if (
        input.includes("sore throat") ||
        input.includes("throat pain")
    ) {

        state = "THROAT";

        replies.push(
            "🗣 Throat pain detected\nGargle with warm salt water and drink warm fluids."
        );
    }

    if (
        input.includes("body pain") ||
        input.includes("weakness") ||
        input.includes("tired") ||
        input.includes("fatigue")
    ) {

        state = "WEAKNESS";

        replies.push(
            "😴 Weakness / Body Pain detected\nTake proper rest, hydrate yourself, and eat nutritious food."
        );
    }

    if (
        input.includes("stress") ||
        input.includes("anxiety") ||
        input.includes("panic") ||
        input.includes("depression")
    ) {

        state = "MENTAL_HEALTH";

        replies.push(
            "🧘 Stress / Anxiety detected\nTake deep breaths, sit calmly, and talk to someone you trust."
        );
    }

    if (
        input.includes("allergy") ||
        input.includes("rash") ||
        input.includes("itching")
    ) {

        state = "ALLERGY";

        replies.push(
            "🌿 Allergy / Rash detected\nAvoid the trigger and consult a doctor if swelling or breathing issue happens."
        );
    }

    if (input.includes("burn")) {

        state = "BURN";

        replies.push(
            "🔥 Burn detected\nCool the area under running water. Do not apply ice directly."
        );
    }

    if (
        input.includes("eye pain") ||
        input.includes("red eye") ||
        input.includes("eye irritation")
    ) {

        state = "EYE_PROBLEM";

        replies.push(
            "👁 Eye problem detected\nWash eyes gently with clean water and avoid rubbing."
        );
    }

    if (
        input.includes("ear pain") ||
        input.includes("earache")
    ) {

        state = "EAR_PROBLEM";

        replies.push(
            "👂 Ear pain detected\nAvoid inserting anything in the ear and consult a doctor if pain continues."
        );
    }

    if (
        input.includes("tooth pain") ||
        input.includes("toothache")
    ) {

        state = "DENTAL";

        replies.push(
            "🦷 Tooth pain detected\nRinse with warm salt water and consult a dentist."
        );
    }

    if (
        input.includes("cut") ||
        input.includes("wound") ||
        input.includes("injury")
    ) {

        state = "INJURY";

        replies.push(
            "🩹 Minor injury detected\nClean the wound with clean water and cover it with a bandage."
        );
    }

    if (
        input.includes("period pain") ||
        input.includes("cramps")
    ) {

        state = "CRAMPS";

        replies.push(
            "🌸 Cramps detected\nUse a warm compress, rest, and drink warm fluids."
        );
    }

    // 🔥 SEQUENCE DETECTION

    if (
        input.includes("fever") &&
        input.includes("cough")
    ) {

        state = "FEVER_COUGH";

        replies.push(
            "⚠ Fever + Cough combination detected\nPossible viral/flu symptoms. Monitor carefully."
        );
    }

    if (
        input.includes("fever") &&
        input.includes("cough") &&
        input.includes("breathing")
    ) {

        state = "EMERGENCY";

        updateState();

        return (
            "🚨 Emergency Alert!\n\n" +

            "Fever + cough + breathing issue combination detected.\n\n" +

            "📞 Call Ambulance: 102 / 108 immediately.\n" +

            "🏥 Seek urgent medical help."
        );
    }

    updateState();

    if (replies.length > 0) {

        return (
            "🩺 Health Assistant Response\n\n" +

            replies.join("\n\n") +

            "\n\n💡 Advice: This is basic first-aid guidance. If symptoms continue or become serious, please consult a doctor."
        );
    }

    return (
        "🤖 I’m here to help.\n\n" +

        "Please type symptoms like:\n\n" +

        "• fever\n" +
        "• cough\n" +
        "• running nose\n" +
        "• headache\n" +
        "• stomach pain\n" +
        "• throat pain\n" +
        "• stress\n" +
        "• allergy\n" +
        "• burn\n" +
        "• chest pain\n" +
        "• accident\n" +
        "• breathing problem"
    );
}

function addMessage(message, className) {

    const chatBox = document.getElementById("chatBox");

    const messageDiv = document.createElement("div");

    messageDiv.className = className;

    messageDiv.innerText = message;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {

    const chatBox = document.getElementById("chatBox");

    const typingDiv = document.createElement("div");

    typingDiv.className = "bot-message";

    typingDiv.id = "typing";

    typingDiv.innerText = "🤖 Bot is checking symptoms...";

    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) {
        typing.remove();
    }
}

function resetBot() {

    state = "START";

    updateState();

    document.getElementById("chatBox").innerHTML = `

    <div class="bot-message">

    👋 Bot reset successfully.

    Tell me your symptoms again.

    </div>

    `;

    const historyList = document.getElementById("historyList");

    if (historyList) {
        historyList.innerHTML = "";
    }
}

function quickSymptom(symptom) {

    document.getElementById("userInput").value = symptom;

    sendMessage();
}

function updateState() {

    const stateDisplay = document.getElementById("stateDisplay");

    if (stateDisplay) {
        stateDisplay.innerText = state;
    }
}

function addHistory(symptom) {

    const history = document.getElementById("historyList");

    if (!history) return;

    const li = document.createElement("li");

    li.innerText = symptom;

    history.appendChild(li);
}

function showPopup() {

    const popup = document.getElementById("popup");

    if (!popup) return;

    popup.style.display = "block";

    setTimeout(() => {

        popup.style.display = "none";

    }, 4000);
}

function toggleTheme() {

    document.body.classList.toggle("dark-mode");
}

function startVoice() {

    if (
        !("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)
    ) {

        alert("Voice input is not supported in this browser. Please use Chrome.");

        return;
    }

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function (event) {

        document.getElementById("userInput").value =
            event.results[0][0].transcript;
    };
}

// ENTER KEY SUPPORT

document.getElementById("userInput").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        sendMessage();
    }
});