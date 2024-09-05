document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("score");
    const gameOverMessage = document.getElementById("gameOver");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const pointSound = document.getElementById("pointSound");

    let score = 0;
    let playerX = 0;
    let playerY = 0;
    let speed = 10;
    let direction = "right";

    // Hintergrundmusik abspielen
    backgroundMusic.volume = 1; // Leise abspielen
    backgroundMusic.play();

    // Spielerbewegung basierend auf der Richtung
    function movePlayer() {
        switch (direction) {
            case "up":
                playerY -= speed;
                break;
            case "down":
                playerY += speed;
                break;
            case "left":
                playerX -= speed;
                break;
            case "right":
                playerX += speed;
                break;
        }

        // Überprüfen, ob der Spieler die Spielfeldgrenzen berührt
        if (playerX < 0 || playerX > gameArea.clientWidth - player.clientWidth ||
            playerY < 0 || playerY > gameArea.clientHeight - player.clientHeight) {
            gameOver();
        } else {
            updatePlayerPosition();
            checkCollisions();
        }
    }

    // Spielerposition aktualisieren
    function updatePlayerPosition() {
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }

    // Bewegung ändern durch Pfeiltasten
    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp":
                if (direction !== "down") direction = "up";
                break;
            case "ArrowDown":
                if (direction !== "up") direction = "down";
                break;
            case "ArrowLeft":
                if (direction !== "right") direction = "left";
                break;
            case "ArrowRight":
                if (direction !== "left") direction = "right";
                break;
        }
    });

    // Punkte generieren
    function createPoint() {
        const point = document.createElement("img");
        point.src = "punkt-bild.png";
        point.classList.add("point");
        point.style.left = Math.random() * (gameArea.clientWidth - 90) + "px";
        point.style.top = Math.random() * (gameArea.clientHeight - 90) + "px";
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

                // Punktesound abspielen
                pointSound.play();

                // Geschwindigkeit erhöhen
                speed *= 1.1;
            }
        });
    }

    // Spiel beenden
    function gameOver() {
        clearInterval(gameInterval);
        gameOverMessage.style.display = "block";
        backgroundMusic.pause(); // Stoppe die Hintergrundmusik
    }

    // Initialer Punkt
    createPoint();

    // Spieler automatisch bewegen
    const gameInterval = setInterval(movePlayer, 100);

    // Initiale Spielerposition setzen
    updatePlayerPosition();
});
