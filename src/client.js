const socket = io("https://quizium-server.onrender.com");

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
    socket.emit("sendAnswer", value);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".answer-btn").forEach(btn => {
        btn.addEventListener("click", sendAnswer);
    });
});