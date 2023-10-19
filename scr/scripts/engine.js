const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        live: document.querySelector('#live')
    },
    value: {
        timerId: null,
        gameVelocity: 1000,
        hitPostition: 0,
        result: 0,
        lives: 3,
        currentTime: 60,
        countDownTimerId: null,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
    },
};


function countDown() {
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if (state.value.currentTime <= 0) {
        alert(`Tempo Esgotado, Sua Pontuação Foi De: ${state.value.result}`);
        location.reload();
    };
};

function playSound() {
    let audio = new Audio('./scr/audio/src_audios_hit.m4a');
    audio.volume = 0.2;
    audio.play();
};

function moveEnemy() {
    state.value.timerId = setInterval(randomSquares, state.value.gameVelocity);
};


function randomSquares() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.value.hitPostition = randomSquare.id;
};

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitPostition) {
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPostition = null;
                playSound();
            } else {
                if (state.value.lives > 0) {
                    state.value.lives--;
                };

                if (state.value.lives < 0) {
                    state.value.lives = 0;
                };

                state.view.live.textContent = 'x' + state.value.lives;
            };

            if (state.value.lives === 0) {
                alert("Game Over");
                location.reload();
            };

            if (state.value.result === 20) {
                state.value.gameVelocity = 600;
                clearInterval(state.value.gameVelocity);
                moveEnemy();
            };


        });
    });
};

function main() {
    moveEnemy();
    addListenerHitBox();
};

main();

