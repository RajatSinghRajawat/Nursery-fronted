import { getCurrentUser } from './auth'

const CARTS_KEY = 'nurser_carts'

function notifyCartChange() {
  window.dispatchEvent(new Event('cartchange'))
}

function getCartStore() {
  try {
    return JSON.parse(window.localStorage.getItem(CARTS_KEY) || '{}')
  } catch {
    return {}
  }
}

function setCartStore(store) {
  window.localStorage.setItem(CARTS_KEY, JSON.stringify(store))
  notifyCartChange()
}

function getCartKey() {
  const currentUser = getCurrentUser()
  return currentUser?.email?.toLowerCase() || null
}

export function getCartItems() {
  const key = getCartKey()
  if (!key) {
    return []
  }

  const store = getCartStore()
  return store[key] || []
}

export function addCartItem(product) {
  const key = getCartKey()
  if (!key) {
    return { ok: false, message: 'Please login to add items to cart.' }
  }

  const store = getCartStore()
  const currentItems = store[key] || []
  const existingItem = currentItems.find((item) => item.id === product.id)

  const nextItems = existingItem
    ? currentItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    : [...currentItems, { ...product, quantity: 1 }]

  setCartStore({ ...store, [key]: nextItems })
  return { ok: true }
}

export function updateCartItemQuantity(productId, quantity) {
  const key = getCartKey()
  if (!key) {
    return
  }

  const store = getCartStore()
  const currentItems = store[key] || []
  const nextItems =
    quantity <= 0
      ? currentItems.filter((item) => item.id !== productId)
      : currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item))

  setCartStore({ ...store, [key]: nextItems })
}

export function getCartCount() {
  return getCartItems().reduce((total, item) => total + item.quantity, 0)
}

export function getCartTotal() {
  return getCartItems().reduce((total, item) => total + item.price * item.quantity, 0)
}

export function getActivitySummary() {
  const currentUser = getCurrentUser()
  const items = getCartItems()
  const totalPlants = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalSpent = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    currentUser,
    items,
    totalPlants,
    totalSpent,
    rewardPoints: totalPlants * 25,
  }
}
