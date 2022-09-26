function renderLobbyScreen() {
    app.textContent = '';

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Lobby';
    app.appendChild(title);

    window.application.renderBlock('start-game-button', app);

    const content = document.createElement('div');
    content.classList.add('content');

    app.appendChild(content);

    const lobbyTimerId = lobbyTimer(content);

    window.application.timers.lobbyTimer = lobbyTimerId;
}

window.application.screens['lobby-screen'] = renderLobbyScreen;