function showMessage(message) {
    const messageBox = document.getElementById("message");
    messageBox.textContent = message;
    messageBox.scrollIntoView({ behavior: "smooth" });
}
