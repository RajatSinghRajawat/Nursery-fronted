import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineMinus, HiOutlinePlus, HiOutlineShoppingBag, HiOutlineTicket } from 'react-icons/hi2'
import { getCurrentUser } from '../utils/userStore'
import { getCartItems, getCartTotal, updateCartItemQuantity } from '../utils/cart'

function Cart() {
  const navigate = useNavigate()
  const [items, setItems] = useState(getCartItems())
  const currentUser = getCurrentUser()

  useEffect(() => {
    const syncCart = () => {
      setItems(getCartItems())
    }

    syncCart()
    window.addEventListener('cartchange', syncCart)
    window.addEventListener('authchange', syncCart)

    return () => {
      window.removeEventListener('cartchange', syncCart)
      window.removeEventListener('authchange', syncCart)
    }
  }, [])

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white px-6 py-24">
        <div className="mx-auto max-w-[900px] rounded-[2.5rem] bg-[#f8faf7] p-10 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">Cart</p>
          <h1 className="mt-4 text-4xl font-bold text-emerald-950 sm:text-5xl">Please login to view your cart</h1>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-24 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#103d2a] via-[#1f6a47] to-[#b7d66d]" />
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%)' }} />

        <div className="relative mx-auto max-w-[1400px]">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">My Cart</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
            Plants You Want To Buy
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            Review selected plants, update quantity, and keep your nursery buying list ready.
          </p>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            {items.length === 0 ? (
              <div className="rounded-[2.5rem] bg-white p-10 text-center shadow-sm">
                <HiOutlineShoppingBag className="mx-auto h-14 w-14 text-emerald-700" />
                <h2 className="mt-5 text-3xl font-bold text-emerald-950">Your cart is empty</h2>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <article key={item.id} className="rounded-[2.25rem] bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <img src={item.image} alt={item.name} className="h-40 w-full rounded-[1.5rem] object-cover sm:w-40" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">{item.category || item.badge || 'Plant'}</p>
                          <h2 className="mt-2 text-2xl font-bold text-emerald-950">{item.name}</h2>
                        </div>
                        <p className="text-2xl font-bold text-emerald-900">₹{item.price}</p>
                      </div>
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-900 transition hover:bg-emerald-100"
                        >
                          <HiOutlineMinus className="h-5 w-5" />
                        </button>
                        <span className="min-w-[48px] text-center text-lg font-bold text-emerald-950">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-900 transition hover:bg-emerald-100"
                        >
                          <HiOutlinePlus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="rounded-[2.5rem] bg-emerald-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-100/80">Order Summary</p>
            <h2 className="mt-4 text-4xl font-bold">Ready To Buy</h2>

            <div className="mt-8 space-y-4 rounded-[2rem] bg-white/10 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between text-sm text-emerald-100/80">
                <span>Total Items</span>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-emerald-100/80">
                <span>Reward Points</span>
                <span>{items.reduce((sum, item) => sum + item.quantity * 25, 0)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-lg font-bold text-white">
                <span>Total</span>
                <span>₹{getCartTotal()}</span>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] bg-white/10 p-6 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <HiOutlineTicket className="mt-1 h-6 w-6 text-emerald-100" />
                <div>
                  <p className="text-lg font-bold">How do you want to buy?</p>
                  <p className="mt-2 text-sm leading-7 text-emerald-100/80">
                    Contact support for delivery guidance, continue plant selection, or visit the nursery for direct purchase.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-emerald-950 transition hover:bg-lime-100"
              >
                Continue To Contact
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/10 px-8 text-sm font-bold text-white transition hover:bg-white/14"
              >
                View In Profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cart
