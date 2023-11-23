const state = {
    /* views - variáveis para exibição na tela */
    view: {
        scoreBox: document.querySelector('#points'),
        cardInfoFace: document.querySelector('#card-image'),
        cardInfoName: document.querySelector('#card-name'),
        cardInfoType: document.querySelector('#card-type'),
        handPlayer: document.querySelector('#player-hand'),
        handEnemy: document.querySelector('#enemy-hand'),
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
            cardName: 'Blue Eyed White Dragon',
            cardType: 'Fighter',
            img: './assets/img/dragon.png',
            strong: 'Mage',
            weak: 'Tank'
        },
        {
            id: 1,
            cardName: 'Black Mage',
            cardType: 'Mage',
            img: './assets/img/magician.png',
            strong: 'Tank',
            weak: 'Fighter'
        },
        {
            id: 2,
            cardName: 'Exodia',
            cardType: 'Tank',
            img: './assets/img/exodia.png',
            strong: 'Fighter',
            weak: 'Mage'
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
    state.view.cardInfoFace.src = state.cards[id].img;
    state.view.cardInfoName.innerText = state.cards[id].cardName;
    state.view.cardInfoType.innerText = state.cards[id].cardType;
}

async function setCard(id) {
    let idEnemy = await getRandomID();

    state.view.cardBattlePlayer.style.display = 'block';
    state.view.cardBattleEnemy.style.display = 'block';

    state.view.cardBattlePlayer.src = state.cards[id].img;
    state.view.cardBattleEnemy.src = state.cards[idEnemy].img;

    let result = checkBattleResult(id, idEnemy);
}

function main() {
    drawCards('player');
    drawCards('enemy');
}

main();