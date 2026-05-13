export const buildAuthenticatedSession = (username) => {
  return `
    <button>⏻</button>
    <span>${username}</span>
  `
}

export const buildUnathenticatedSession = () => {
  return `
      <a href="/signup.html">Signup</a>
      <a href="/login.html">login</a>
  `
}