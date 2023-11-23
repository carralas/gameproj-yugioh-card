const state = {
    /* views - variáveis para exibição na tela */
    view: {
        scoreBox: document.querySelector('#points'),
        cardInfoFace: document.querySelector('#card-image'),
        cardInfoName: document.querySelector('#card-name'),
        cardInfoType: document.querySelector('#card-type'),
        handPlayer: document.querySelector('#player-hand'),
        handEnemy: document.querySelector('#enemy-hand'),
        scorePlayer: document.querySelector('#player-score'),
        scoreEnemy: document.querySelector('#enemy-score'),
        cardBattlePlayer: document.querySelector('#player-card'),
        cardBattleEnemy: document.querySelector('#enemy-card'),
        button: document.querySelector('#advance')
    },
    /* values - variáveis para controle interno */
    values: {
        playerScore: 0,
        enemyScore: 0
    },
    /* cards - variáveis que cotrolam armazenam as cartas */
    cards: [
        {
            id: 0,
            name: 'Blue Eyed White Dragon',
            type: 'Fighter',
            img: './assets/img/dragon.png',
            strong: ['Mage'],
            weak: ['Tank']
        },
        {
            id: 1,
            name: 'Black Mage',
            type: 'Mage',
            img: './assets/img/magician.png',
            strong: ['Tank'],
            weak: ['Fighter']
        },
        {
            id: 2,
            name: 'Exodia',
            type: 'Tank',
            img: './assets/img/exodia.png',
            strong: ['Fighter'],
            weak: ['Mage']
        }
    ]
}

async function drawCards(side) {
    for (let k = 0; k < 5; k++) {
        const randomID = await getRandomID();
        const card = await createCard(randomID, side);

        if (side === 'player') {
            state.view.handPlayer.appendChild(card);
        } else {
            state.view.handEnemy.appendChild(card);
        }
    }
}

async function getRandomID() {
    let randomID = Math.floor(Math.random()*state.cards.length);
    return state.cards[randomID].id;
}

async function createCard(id, side) {
    let card = document.createElement('img');
    card.classList.add('card');

    if (side === 'player') {
        card.setAttribute('src', state.cards[id].img);
        card.addEventListener('mouseover', () => {
            drawCard(id);
        });
        card.addEventListener('click', () => {
            setCard(id);
        });
    } else {
        card.setAttribute('src', './assets/img/card-back.png');
    }

    return card;
}

async function drawCard(id) {
    state.view.cardInfoFace.style.display = 'block';
    state.view.cardInfoFace.src = state.cards[id].img;
    state.view.cardInfoName.innerText = state.cards[id].name;
    state.view.cardInfoType.innerText = state.cards[id].type;
}

async function setCard(id) {
    await blockHands();
    let idEnemy = await getRandomID();

    state.view.cardBattlePlayer.style.display = 'block';
    state.view.cardBattleEnemy.style.display = 'block'
    state.view.cardBattlePlayer.src = state.cards[id].img;
    state.view.cardBattleEnemy.src = state.cards[idEnemy].img;

    let result = await checkBattleResult(id, idEnemy);
    await updateScore();
    await drawButton(result);
}

async function blockHands() {
    handPlayer = state.view.handPlayer.querySelectorAll('img');
    handEnemy = state.view.handEnemy.querySelectorAll('img');
    handPlayer.forEach(card => card.remove());
    handEnemy.forEach(card => card.remove());
}

async function checkBattleResult(id, idEnemy) {
    let cardPlayer = state.cards[id];
    let cardEnemy = state.cards[idEnemy];
    let result = 'Draw';

    if (cardPlayer.strong.includes(cardEnemy.type)) {
        result = 'Victory';
        state.values.playerScore++;
        await playAudio('win');
    } else if (cardPlayer.weak.includes(cardEnemy.type)) {
        result = 'Defeat';
        state.values.enemyScore++;
        await playAudio('lose');
    }

    return result;
}

async function playAudio(src) {
    let audio = new Audio(`./assets/audio/${src}.wav`);
    audio.play();
}

async function updateScore() {
    state.view.scorePlayer.innerText = state.values.playerScore;
    state.view.scoreEnemy.innerText = state.values.enemyScore;
}

async function drawButton(result) {
    state.view.button.innerText = result;
    state.view.button.style.display = 'block';
    state.view.button.onclick = resetDuel;
}

async function resetDuel() {
    state.view.button.style.display = 'none';
    state.view.cardInfoFace.style.display = 'none';
    state.view.cardInfoName.innerText = '';
    state.view.cardInfoType.innerText = '';
    state.view.cardBattlePlayer.style.display = 'none';
    state.view.cardBattleEnemy.style.display = 'none';

    main();
}

function main() {
    drawCards('player');
    drawCards('enemy');
}

main();