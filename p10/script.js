const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

function sendMessage() {
    const text = messageInput.value.trim();

    if (text === "") {
        return;
    }

    addMessage(text, "user");
    messageInput.value = "";

    setTimeout(function() {
        addMessage("Это автоматический ответ.", "other");
    }, 1000);
}

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = "message " + type;
    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
