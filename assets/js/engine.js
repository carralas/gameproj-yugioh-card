const state = {
    /* views - variáveis para exibição na tela */
    view: {
        scoreBox: document.querySelector('#points'),
        cardInfoFace: document.querySelector('#card-image'),
        cardInfoName: document.querySelector('#card-name'),
        cardInfoType: document.querySelector('#card-type'),
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

function main() {
}

main();