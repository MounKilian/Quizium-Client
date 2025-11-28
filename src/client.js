function getUserId() {
    const matches = document.cookie.match(/userId=([^;]+)/);
    if (matches) return matches[1];

    const id = crypto.randomUUID();
    document.cookie = `userId=${id}; path=/; max-age=${60*60*24*365}`; // 1 an
    return id;
}

const socket = io("https://quizium-server.onrender.com", {
    auth: { userId: getUserId() }
});

socket.on("connect", () => {
    console.log("Connecté au serveur avec ID :", socket.id);
});

socket.on("disconnect", () => {
    console.log("Déconnecté du serveur");
});

socket.on("loadDataClient", (data) => {
    const buttons = document.querySelectorAll(".answer-btn");

    data.forEach((texte, index) => {
        if (buttons[index]) {
            buttons[index].textContent = texte;
            buttons[index].value = texte; 
        }
    });
});

function sendAnswer(event) {
    const value = event.target.value;
    socket.emit("sendAnswer", value, socket.auth.userId);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".answer-btn").forEach(btn => {
        btn.addEventListener("click", sendAnswer);
    });
});