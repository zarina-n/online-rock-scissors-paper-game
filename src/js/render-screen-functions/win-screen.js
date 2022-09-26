function renderGameWinScreen() {
  app.textContent = ''

  const title = document.createElement('h1')
  title.classList.add('title')
  title.textContent = 'Game'

  const content = document.createElement('div')
  content.classList.add('content')

  const text = document.createElement('p')
  text.classList.add('text')

  content.appendChild(text)

  const waitingText = document.createElement('h2')
  waitingText.classList.add('text')

  content.appendChild(waitingText)

  text.textContent = window.application.userInfo.enemyPlayer
    ? `You are playing against ${window.application.userInfo.enemyPlayer}`
    : ''
  waitingText.textContent = 'You won!'

  app.appendChild(title)
  app.appendChild(content)

  window.application.renderBlock('lobby-button', app)
  window.application.renderBlock('start-game-button', content)
}

window.application.screens['game-win-screen'] = renderGameWinScreen
