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
    /* actions - variáveis que cotrolam ações na engine */
    actions: {
    },
    /* objects - variáveis que carregam informações externas */
    objects: {
    }
}

function main() {
}

main();