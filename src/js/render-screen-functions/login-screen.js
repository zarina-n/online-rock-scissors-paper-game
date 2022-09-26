function renderLoginScreen() {
  app.textContent = ''

  const title = document.createElement('h1')
  title.classList.add('title')
  title.textContent = 'Enter your name'

  const content = document.createElement('div')
  content.classList.add('content')

  app.appendChild(title)
  app.appendChild(content)

  if (localStorage.getItem('userData'))
    window.application.renderScreen('lobby-screen', app)

  window.application.renderBlock('login-button', content)
}

window.application.screens['login-screen'] = renderLoginScreen

window.application.renderScreen('login-screen', app)
