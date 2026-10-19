type ServerMessage =
    | { type: "update"; data: string }
    | { type: "notification"; text: string }
    | { type: "error"; message: string };

const statusElement = document.getElementById("status") as HTMLSpanElement;
const connectButton = document.getElementById("connectButton") as HTMLButtonElement;
const disconnectButton = document.getElementById("disconnectButton") as HTMLButtonElement;
const messageForm = document.getElementById("messageForm") as HTMLFormElement;
const messageInput = document.getElementById("messageInput") as HTMLInputElement;
const messageList = document.getElementById("messageList") as HTMLUListElement;

let socket: WebSocket | null = null;

function addMessage(text: string): void {
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

    socket.addEventListener("message", (event: MessageEvent) => {
        try {
            const message = JSON.parse(event.data) as ServerMessage;

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

messageForm.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    if (socket && socket.readyState === WebSocket.OPEN && messageInput.value.trim()) {
        socket.send(JSON.stringify({
            type: "message",
            text: messageInput.value
        }));

        messageInput.value = "";
    }
});
