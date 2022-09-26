window.application = {
    blocks: {},
    screens: {},
    renderScreen: function (screenName, container) {

        this.screens[screenName]?.(container);
    },
    renderBlock: function (blockName, container) {

        this.blocks[blockName](container);
    },
    timers: {},
    userInfo: {},
}

const API_URL_BASE = 'https://skypro-rock-scissors-paper.herokuapp.com/';
const app = document.querySelector('.app');

window.application.renderScreen('login-screen', app);