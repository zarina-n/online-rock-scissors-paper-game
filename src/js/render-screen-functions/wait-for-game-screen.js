function renderGameWaitScreen() {
    app.textContent = '';

    clearInterval(window.application.timers.lobbyTimer);

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Waiting for your opponent to join';

    const content = document.createElement('div');
    content.classList.add('content');

    app.appendChild(title);
    app.appendChild(content);

    const gameWaitTimerId = gameWaitTimer(content);
    window.application.timers.gameWaitTimer = gameWaitTimerId;
}

window.application.screens['opponent-wait-screen'] = renderGameWaitScreen
