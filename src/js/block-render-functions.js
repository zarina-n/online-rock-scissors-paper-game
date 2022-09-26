const STATUSES = {
  lobby: 'lobby',
  game: 'game',
  lose: 'lose',
  win: 'win',
  start: 'waiting-for-start',
  yourMove: 'waiting-for-your-move',
  enemyMove: 'waiting-for-enemy-move',
}

function getUserSuccessData(data) {
  window.application.userInfo.data = data
}

function renderLogInButton(container) {
  const button = document.createElement('button')
  const input = document.createElement('input')

  input.classList.add('input')
  button.classList.add('button')

  button.addEventListener('click', () => {
    request({
      url: API_URL_BASE + 'login',
      params: {
        login: `${input.value}`,
      },
      onSuccess: (data) => {
        getUserSuccessData(data)

        if (isGameErrorStatus(window.application.userInfo)) {
          console.error('ERROR', window.application.userInfo.data.message)

          onErrorMessage(app)

          return
        }

        window.application.userInfo.userLogin = input.value
        window.application.userInfo.userToken =
          window.application.userInfo.data.token

        getPlayerStatus()
      },
    })
  })

  container.appendChild(input)
  container.appendChild(button)

  button.textContent = 'Log in'
}

function getPlayerStatus() {
  request({
    url: API_URL_BASE + 'player-status',
    params: {
      token: window.application.userInfo.data.token,
    },
    onSuccess: (data) => {
      getUserSuccessData(data)

      const playerStatus =
        window.application.userInfo.data['player-status'].status

      if (playerStatus === STATUSES.lobby) {
        window.application.renderScreen('lobby-screen', app)
      } else if (playerStatus === STATUSES.game) {
        window.application.userInfo.gameId = data['player-status'].game.id

        window.application.renderScreen('game-screen', app)
      } else if (data.status === 'error') {
        console.error('ERROR', window.application.userInfo.data.message)

        onErrorMessage(app)
      }
    },
  })
}

function renderPlayerList(container) {
  const playerList = document.createElement('div')
  playerList.classList.add('player_list-div')

  const title = document.createElement('h3')
  title.classList.add('title')

  playerList.textContent = 'Online players'

  request({
    url: API_URL_BASE + 'player-list',
    token: window.application.userInfo.data.token,
    onSuccess: (data) => {
      getUserSuccessData(data)

      const playerNames = window.application.userInfo.data.list

      playerNames.forEach((name) => {
        const player = document.createElement('p')
        player.classList.add('text')

        if (name.login === window.application.userInfo.userLogin) {
          player.textContent = 'you'
          container.appendChild(player)
        } else {
          player.textContent = name.login
        }

        container.appendChild(player)
      })
    },
  })

  container.appendChild(playerList)
  container.appendChild(title)
}

function renderStartGameButton(container) {
  const button = document.createElement('button')
  button.classList.add('button')

  button.addEventListener('click', () => {
    request({
      url: API_URL_BASE + 'start',
      params: {
        token: window.application.userInfo.userToken,
      },
      onSuccess: (data) => {
        getUserSuccessData(data)

        getStartGameStatus()
      },
    })
  })

  container.appendChild(button)
  button.textContent = 'Start new game'
}

function getStartGameStatus() {
  if (isGameErrorStatus(window.application.userInfo)) {
    console.error('ERROR', window.application.userInfo.data.message)

    onErrorMessage(app)

    return
  }

  const status = window.application.userInfo.data.status

  window.application.userInfo.gameId =
    window.application.userInfo.data['player-status'].game.id

  if (status === 'ok') {
    window.application.renderScreen('opponent-wait-screen', app)
  }
  if (status === 'error') {
    console.log(data.message)
  }
}

function renderWaitForGameBlock(container) {
  request({
    url: API_URL_BASE + 'game-status',
    params: {
      token: window.application.userInfo.userToken,
      id: window.application.userInfo.gameId,
    },
    onSuccess: (data) => {
      getUserSuccessData(data)

      getGameStatus()
    },
  })
}

function getGameStatus() {
  if (isGameErrorStatus(window.application.userInfo)) {
    console.error('ERROR', window.application.userInfo.data.message)

    onErrorMessage(app)

    clearInterval(window.application.timers.gameWaitTimer)

    window.application.renderBlock('lobby-button', app)

    return
  }

  let status = window.application.userInfo.data['game-status']['status']

  window.application.userInfo.enemyPlayer =
    window.application.userInfo.data['game-status'].enemy.login

  if (status === STATUSES.win) {
    window.application.renderScreen('game-win-screen', app)
  } else if (status === STATUSES.enemyMove) {
    window.application.renderScreen('game-opponent-move-screen', app)
  } else if (status === STATUSES.yourMove) {
    window.application.renderScreen('game-screen', app)
  } else if (status === STATUSES.lose) {
    window.application.renderScreen('game-loose-screen', app)
  }
}

function renderPlayerMoveButton(container) {
  const choices = {
    rock: '../img/rock-icon.png',
    scissors: '../img/scissors-icon.png',
    paper: '../img/paper-icon.png',
  }

  const keys = Object.entries(choices)
  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('choice-button-container')

  keys.forEach((choice) => {
    const button = document.createElement('img')
    button.classList.add('choice-button')
    buttonContainer.appendChild(button)

    container.appendChild(buttonContainer)

    button.src = choice[1]
    button.addEventListener('click', () => {
      request({
        url: API_URL_BASE + 'play',
        params: {
          token: window.application.userInfo.userToken,
          id: window.application.userInfo.gameId,
          move: choice[0],
        },
        onSuccess: (data) => {
          getUserSuccessData(data)

          window.application.userInfo.yourChoice = choice

          playerChoice()
        },
      })
    })
  })
}

function playerChoice() {
  if (isGameErrorStatus(window.application.userInfo)) {
    console.error('ERROR', window.application.userInfo.data.message)

    onErrorMessage(app)

    clearInterval(window.application.timers.gameWaitTimer)

    window.application.renderBlock('lobby-button', app)

    return
  }

  window.application.userInfo.enemyPlayer =
    window.application.userInfo.data['game-status'].enemy.login

  getGameStatus()
}

function renderOpponentMoveStatusBlock(container) {
  request({
    url: API_URL_BASE + 'game-status',
    params: {
      token: window.application.userInfo.userToken,
      id: window.application.userInfo.gameId,
    },
    onSuccess: (data) => {
      getUserSuccessData(data)

      getGameStatus()
    },
  })
}

function renderLobbyButton(container) {
  const button = document.createElement('button')
  button.classList.add('button')

  button.addEventListener('click', () => {
    window.application.renderScreen('lobby-screen', app)
  })

  container.appendChild(button)
  button.textContent = 'Go to Lobby'
}

window.application.blocks['login-button'] = renderLogInButton

window.application.blocks['player-list'] = renderPlayerList

window.application.blocks['game-wait-block'] = renderWaitForGameBlock

window.application.blocks['start-game-button'] = renderStartGameButton

window.application.blocks['player-move-button'] = renderPlayerMoveButton

window.application.blocks['opponent-move-block'] = renderOpponentMoveStatusBlock

window.application.blocks['lobby-button'] = renderLobbyButton

function isGameErrorStatus(userInfo) {
  return window.application.userInfo.data.status === 'error'
}

function onErrorMessage(container) {
  const errorMessage = document.createElement('p')

  errorMessage.classList.add('error-message')

  errorMessage.textContent = window.application.userInfo.data.message

  container.appendChild(errorMessage)
}
