document.addEventListener("DOMContentLoaded", () => {
    const target = "HORSE";
    let row = 0;
    let gameOver = false;
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const cells = document.querySelectorAll(".cell");
    const msg = document.getElementById("message");
    const winMsg = document.getElementById("win-message");
    const button = document.querySelector("button");

    form.addEventListener("submit", e => {
        e.preventDefault();
        const word = input.value.trim().toUpperCase();
        if (gameOver === true) {
            resetGame();
            return;
        }

        if (word.length !== 5 || row >= 6) {
            showNotEnoughLetters();
            return;
        }

        // clear message
        msg.textContent = "";
        msg.classList.add("hidden");

        // split arrays for comparison
        const targetArr = target.split("");
        const guessArr = word.split("");
        const used = Array(5).fill(false);
        const colors = Array(5).fill("");

        // first pass: greens
        for (let i = 0; i < 5; i++) {
            if (guessArr[i] === targetArr[i]) {
                colors[i] = "green";
                used[i] = true;
                guessArr[i] = null;
            }
        }

        // second pass: yellows
        for (let i = 0; i < 5; i++) {
            if (!guessArr[i]) continue;
            const index = targetArr.findIndex((l, idx) => l === guessArr[i] && !used[idx]);
            if (index !== -1) {
                colors[i] = "goldenrod";
                used[index] = true;
            }
        }

        // animate letter
        input.disabled = true;
        button.disabled = true;
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const cell = cells[row * 5 + i];
                cell.textContent = word[i];
                cell.style.background = colors[i] || "";
                // cool animation
                cell.style.transform = "rotateX(90deg) scale(1.2)";
                setTimeout(() => {
                    cell.style.transform = "rotateX(0deg) scale(1)";
                }, 150);
            }, i * 200);
        }

        setTimeout(() => {
            // winner/loser check
            if (word === target) {
                gameOver = true;
                input.disabled = true;
                button.textContent = "New Game";
                winMsg.textContent = "a winner is you";
                winMsg.style.opacity = 1;
                winMsg.classList.add("rainbow");
            } else if (row === 5) {
                gameOver = true;
                input.disabled = true;
                button.textContent = "New Game";
                winMsg.textContent = "you lose";
                winMsg.style.opacity = 1;
                winMsg.classList.add("rainbow");
            }
            else {
                // reenable input for next guess
                input.disabled = false;
                input.focus();
            }
            button.disabled = false;
            row++;
            input.value = "";
        }, 5 * 200 + 200); // after animations
    });

    function showNotEnoughLetters() {
        msg.textContent = "Not enough letters";
        msg.style.color = "red";
        msg.classList.remove("hidden");
        input.value = "";
    }

    function resetGame() {
        // Clear grid
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.background = "";
            cell.style.transform = "";
        });

        // Reset input + button
        input.disabled = false;
        input.value = "";
        button.textContent = "Submit";

        // Hide message
        msg.textContent = "";
        msg.classList.add("hidden");
        winMsg.textContent = "";


        row = 0;
        gameOver = false;
    }

});
