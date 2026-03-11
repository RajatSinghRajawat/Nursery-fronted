const USERS_KEY = 'nurser_users'
const CURRENT_USER_KEY = 'nurser_current_user'

function notifyAuthChange() {
  window.dispatchEvent(new Event('authchange'))
}

export function getStoredUsers() {
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

export function getCurrentUser() {
  try {
    return JSON.parse(window.localStorage.getItem(CURRENT_USER_KEY) || 'null')
  } catch {
    return null
  }
}

export function registerUser(user) {
  const users = getStoredUsers()
  const alreadyExists = users.some((item) => item.email.toLowerCase() === user.email.toLowerCase())

  if (alreadyExists) {
    return { ok: false, message: 'An account with this email already exists.' }
  }

  const nextUsers = [...users, user]
  window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers))
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  notifyAuthChange()

  return { ok: true, user }
}

export function loginUser(email, password) {
  const users = getStoredUsers()
  const matchedUser = users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
  )

  if (!matchedUser) {
    return { ok: false, message: 'Invalid email or password.' }
  }

  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(matchedUser))
  notifyAuthChange()

  return { ok: true, user: matchedUser }
}

export function logoutUser() {
  window.localStorage.removeItem(CURRENT_USER_KEY)
  notifyAuthChange()
}
