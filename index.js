
document.addEventListener("DOMContentLoaded", () => {
    const target = "HORSE";
    let row = 0;
    let winner = false;
    console.log("winner is false");
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const cells = document.querySelectorAll(".cell");
    const msg = document.getElementById("message");
    const button = document.querySelector("button");


    form.addEventListener("submit", e => {
        e.preventDefault();
        const word = input.value.trim().toUpperCase();
        if (winner === true) {
            console.log("winner reset");
            resetGame();
            return;
        }

        if (word.length !== 5 || row >= 6) {
            showNotEnoughLetters();
            return;
        }

        const targetArr = target.split("");
        const guessArr = word.split("");
        const used = Array(5).fill(false);

        // First pass: greens
        for (let i = 0; i < 5; i++) {
            const cell = cells[row * 5 + i];
            cell.textContent = guessArr[i];

            if (guessArr[i] === targetArr[i]) {
                cell.style.background = "green";
                used[i] = true;
                guessArr[i] = null;
            }
        }

        // Second pass: yellows
        for (let i = 0; i < 5; i++) {
            if (!guessArr[i]) continue;

            const index = targetArr.findIndex((l, idx) => l === guessArr[i] && !used[idx]);
            if (index !== -1) {
                cells[row * 5 + i].style.background = "goldenrod";
                used[index] = true;
            }
        }

        // Hide message
        msg.textContent = "";
        msg.classList.add("hidden");

        // Check if winner
        if (word == target) {
            gameOver();
        }

        row++;
        input.value = "";
    });
    function showNotEnoughLetters() {
        msg.textContent = "Not enough letters";
        msg.style.color = "red";
        msg.classList.remove("hidden");
        input.value = "";
    }

    function gameOver() {
        winner = true;
        console.log("winner is true");



        input.disabled = true;
        button.textContent = "New Game";
    }

    function resetGame() {
        // Clear grid
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.background = "";
        });

        // Reset input + button
        input.disabled = false;
        input.value = "";
        button.textContent = "Submit";

        // Hide message
        msg.textContent = "";
        msg.classList.add("hidden");

        row = 0;
        winner = false;
        console.log("winner is false");
        return;
    }
});