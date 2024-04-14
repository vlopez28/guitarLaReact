import Guitar from "./Guitar"
import { useState } from "react"
import { db } from '../data/db.js'

export default function Body  () {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);



  return (
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar, id) =>(
              <Guitar
                key={id}
                guitar = {guitar}
                setCart = {setCart}
              />
            ))}
            
            
        </div>
    </main>
  )
}

 Body
