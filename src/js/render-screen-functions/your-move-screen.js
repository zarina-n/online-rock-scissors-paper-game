function renderGameScreen() {
  app.textContent = ''

  clearInterval(window.application.timers.gameWaitTimer)

  const title = document.createElement('h1')
  title.classList.add('title')
  title.textContent = 'Game'

  const content = document.createElement('div')
  content.classList.add('content')

  const text = document.createElement('p')
  text.classList.add('text')

  content.appendChild(text)

  text.textContent = window.application.userInfo.enemyPlayer
    ? `You are playing against ${window.application.userInfo.enemyPlayer}`
    : ''
  app.appendChild(title)
  app.appendChild(content)

  window.application.renderBlock('player-move-button', app)
}

window.application.screens['game-screen'] = renderGameScreen
