import Guitar from "./Guitar"
import Header from "./Header"
import { useState } from "react"
import { db } from '../data/db.js'



export default function Body  () {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);
  
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0){
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
      console.log("ya existe")
    } else{
        item.quantity = 1
        console.log("no existe, ...agregando")
        setCart([...cart, item])   
    }
  }

  function removeFromCart(id){
    console.log("hi")
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart(){
    setCart([])
  }

  return (
    <>
      <Header 
        cart = {cart}
        setCart={setCart}
        removeFromCart = {removeFromCart}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        clearCart = {clearCart}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {data.map((guitar) =>(
                <Guitar
                  key={guitar.id}
                  guitar = {guitar}
                  setCart = {setCart}
                  addToCart = {addToCart}
                />
              ))}
              
              
          </div>
      </main>
    </>
  )
}

