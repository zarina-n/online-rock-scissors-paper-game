function lobbyTimer(content) {
  const timer = setInterval(() => {
    content.textContent = ''
    window.application.renderBlock('player-list', content)
  }, 1000)

  return timer
}

function gameWaitTimer(content) {
  const timer = setInterval(() => {
    content.textContent = ''
    window.application.renderBlock('game-wait-block', content)
  }, 1000)

  return timer
}
