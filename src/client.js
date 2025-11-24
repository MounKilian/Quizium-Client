const socket = io("https://quizium-server.onrender.com");

socket.on("connect", () => {
    console.log("Connecté au serveur avec ID :", socket.id);
});

socket.on("disconnect", () => {
    console.log("Déconnecté du serveur");
});

function SendEvent() {
    socket.emit("sendAnswer1", document.getElementById('rep1').value);
}

document.addEventListener('DOMContentLoaded', () => {
    const bouton1 = document.getElementById('rep1');
    bouton1.addEventListener('click', SendEvent);
});