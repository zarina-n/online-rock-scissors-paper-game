function renderGameOpponentMoveWaitScreen() {
  app.textContent = ''

  const title = document.createElement('h2')
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

  waitingText.textContent = "Waiting for enemy's move..."

  app.appendChild(title)
  app.appendChild(content)

  window.application.renderBlock('opponent-move-block', content)
}

window.application.screens['game-opponent-move-screen'] =
  renderGameOpponentMoveWaitScreen
