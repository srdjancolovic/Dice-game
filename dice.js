'use-strict';

/*FOR GAME RULES*/
const btnRules = document.querySelector('.rules');
const modal = document.querySelector('.description');
const buttonX = document.querySelector('.close-button');

/*SHOW AND HIDE GAME RULES*/
btnRules.addEventListener('click', function(){
    modal.classList.remove('hide')
})
buttonX.addEventListener('click', function(){
    modal.classList.add('hide');
})


const player1class= document.querySelector('.player--0');
const player2class= document.querySelector('.player--1');

const scoreP1 = document.getElementById('score--0');
const scoreP2 = document.getElementById('score--1');
const currentP1 = document.getElementById('current--0');
const currentP2 = document.getElementById('current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

// Default settings
const startingConditions = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreP1.textContent = 0;
    scoreP2.textContent = 0;
    currentP1.textContent = 0;
    currentP2.textContent = 0;

    player1class.classList.remove('player--winner');
    player2class.classList.remove('player--winner');
    player1class.classList.add('player--active');
    player2class.classList.remove('player--active');
}
startingConditions();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0; // Set current score to 0 when player is switched
    activePlayer = activePlayer === 0 ? 1 : 0; // Boolean to switch between players
    currentScore = 0; // set current score to 0 so it does not continue second player score when switched

    //Toggle active class between players
    player1class.classList.toggle('player--active');
    player2class.classList.toggle('player--active');
}


btnRoll.addEventListener('click', function(){
    if(playing){
        const dice = Math.trunc(Math.random() * 6 + 1); // Random dice number
        diceImg.src = `dice-${dice}.png`; // Switch dice images coresponding to random dice number
        if (dice != 1){
            currentScore += dice; // Adding dice number to current score
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
        switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        if (scores[activePlayer] >= 100){
            playing = false; // Game stops if the score is above 100
            diceImg.classList.add('hide'); // Hide dice image
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner'); // Add winner class to player who won
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); // Remove player active class
            document.getElementById(`score--${activePlayer}`).textContent = 'WINNER'
        }else{
            switchPlayer();
        }
    }   
})
btnNew.addEventListener('click', startingConditions); // When pressed on this button, function startingConditions is called





