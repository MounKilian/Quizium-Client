const socket = io("https://quizium-server.onrender.com");

socket.on("connect", () => {
    console.log("Connecté au serveur avec ID :", socket.id);
});

socket.on("disconnect", () => {
    console.log("Déconnecté du serveur");
});

function SendEvent() {
    socket.emit("sendMessage", "Users : ");
}

document.addEventListener('DOMContentLoaded', () => {
    const bouton = document.getElementById('monBouton');
    bouton.addEventListener('click', SendEvent);
});