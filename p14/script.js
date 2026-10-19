const statusElement = document.getElementById("status");
const connectButton = document.getElementById("connectButton");
const disconnectButton = document.getElementById("disconnectButton");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messageList = document.getElementById("messageList");

let socket = null;

function addMessage(text) {
    const item = document.createElement("li");
    item.textContent = text;
    messageList.prepend(item);
}

connectButton.addEventListener("click", () => {
    socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("open", () => {
        statusElement.textContent = "Подключено";
        connectButton.disabled = true;
        disconnectButton.disabled = false;
    });

    socket.addEventListener("message", (event) => {
        try {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case "update":
                    addMessage(`Обновление: ${message.data}`);
                    break;
                case "notification":
                    addMessage(`Уведомление: ${message.text}`);
                    break;
                case "error":
                    addMessage(`Ошибка: ${message.message}`);
                    break;
                default:
                    addMessage("Получен неизвестный тип сообщения");
            }
        } catch {
            addMessage("Не удалось прочитать сообщение");
        }
    });

    socket.addEventListener("close", () => {
        statusElement.textContent = "Не подключено";
        connectButton.disabled = false;
        disconnectButton.disabled = true;
    });

    socket.addEventListener("error", () => {
        statusElement.textContent = "Ошибка подключения";
    });
});

disconnectButton.addEventListener("click", () => {
    socket?.close();
});

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (socket && socket.readyState === WebSocket.OPEN && messageInput.value.trim()) {
        socket.send(JSON.stringify({
            type: "message",
            text: messageInput.value
        }));

        messageInput.value = "";
    }
});

