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
            cardName: 'BEW Dragon',
            cardType: 'Fighter',
            img: '../img/dragon',
            strong: 'Mage',
            weak: 'Tank'
        },
        {
            id: 1,
            cardName: 'B Mage',
            cardType: 'Mage',
            img: '../img/magician',
            strong: 'Tank',
            weak: 'Fighter'
        },
        {
            id: 2,
            cardName: 'Exodia',
            cardType: 'Tank',
            img: '../img/exodia',
            strong: 'Fighter',
            weak: 'Mage'
        }
    ]
}

async function drawCards(side) {
    for (let k = 0; k < 5; k++) {
        const randomID = await getRandomID();
        console.log(randomID)
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
    card.setAttribute('heigth', '100px');
    card.setAttribute('src', './assets/img/card-back.png');
    card.setAttribute('data-id', id);
    card.classList.add('card');

    if (side === 'player') {
        card.addEventListener('click', () => {
            setCard(card.getAttribute('data-id'));
        });
    }

    card.addEventListener('mouseover', () => {
        drawCard(id);
    });

    console.log(card)
    return card;
}

function main() {
    drawCards('player');
    drawCards('enemy');
}

main();