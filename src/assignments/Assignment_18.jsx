import { useEffect, useState } from "react"
import "./Assignment_18.css"

function Assignment_18(){
    const [colorArray, setColorArray] = useState([])
    const [randomNo, setrandomNo] = useState(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
            colourAdding()
        },1000)

        return ()=>clearInterval(interval)
    },[])

    function colourAdding(){
        
        const random = Math.random()
        let color = ""
        setrandomNo(random)
        if(random<0.5){
            color = "blue"
        }else{
            color="red"
        }
        setColorArray(prevArray =>[color,...prevArray])
    }

    return(
        <div className="div">
            <h1>Assignment 18</h1>
            <h3>{randomNo}</h3>
            <ul>
                {colorArray.map((color,key)=>(
                    <li key={key}>{color}</li>
                ))}
            </ul>
        </div>
    )
}
export default Assignment_18