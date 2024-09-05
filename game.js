document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("score");
    let score = 0;

    // Spielerposition
    let playerX = 0;
    let playerY = 0;
    const playerSpeed = 20; // schnellerer Spieler

    // Bewegung mit Pfeiltasten
    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp":
                if (playerY > 0) playerY -= playerSpeed;
                break;
            case "ArrowDown":
                if (playerY < gameArea.clientHeight - player.clientHeight) playerY += playerSpeed;
                break;
            case "ArrowLeft":
                if (playerX > 0) playerX -= playerSpeed;
                break;
            case "ArrowRight":
                if (playerX < gameArea.clientWidth - player.clientWidth) playerX += playerSpeed;
                break;
        }
        updatePlayerPosition();
        checkCollisions();
    });

    function updatePlayerPosition() {
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }

    // Punkte generieren
    function createPoint() {
        const point = document.createElement("img");
        point.src = "punkt-bild.png"; // Bild für den Punkt
        point.classList.add("point");
        point.style.left = Math.random() * (gameArea.clientWidth - 60) + "px"; // Position für doppelt so große Punkte
        point.style.top = Math.random() * (gameArea.clientHeight - 60) + "px";
        gameArea.appendChild(point);
    }

    // Kollisionserkennung
    function checkCollisions() {
        const points = document.querySelectorAll(".point");
        points.forEach(function (point) {
            const pointRect = point.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();

            // Überprüfung auf Kollision
            if (!(playerRect.right < pointRect.left || 
                  playerRect.left > pointRect.right || 
                  playerRect.bottom < pointRect.top || 
                  playerRect.top > pointRect.bottom)) {
                // Punkt wurde eingesammelt
                point.remove();
                score++;
                scoreDisplay.textContent = score;
                createPoint(); // Ein neuer Punkt wird generiert
            }
        });
    }

    // Initialer Punkt
    createPoint();

    // Initiale Spielerposition setzen
    updatePlayerPosition();
});
