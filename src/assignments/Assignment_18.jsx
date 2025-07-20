import { useEffect, useState } from "react"
import "./Assignment_18.css"

function Assignment_18(){
    const [colorArray, setColorArray] = useState([])
    const [randomNo, setrandomNo] = useState(0)
    const [gameOver,setGameOver] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(()=>{
        if(gameOver){
            return
        }
        const interval = setInterval(()=>{
            colourAdding()
        },1000)

        return ()=>clearInterval(interval)
    },[gameOver])

    function colourAdding(){
        setColorArray(prevArray =>{
            if(prevArray.length>=6){
                setGameOver(true)
                return prevArray
            }
            
            const random = Math.random()
            let color = ""
            setrandomNo(random)
            if(random<0.5){
                color = "blue"
            }else{
                color="red"
            }

            const newArray = [color,...prevArray]
            return newArray
        })
    }

    function buttonClick(color){
        console.log(`${color} Button Clicked!`)
        const lastItem = colorArray[colorArray.length - 1]
        console.log(lastItem)
        if(lastItem == color){
            setColorArray(prevArray => prevArray.slice(0, -1))
            setScore(score+1)
        }else{
            setGameOver(true)
        }
    }

    return(
        <div className="colorGame">
            <h1>Assignment 18</h1>
            <div className="gameContainer">
                {gameOver && <h2>Game Over!</h2>}
                <h3>Your Score is : {score}</h3>
                <h3>{randomNo}</h3>
                <div className="colorButtons">
                    <button disabled={gameOver} onClick={()=>buttonClick("red")}>Red</button>
                    <button disabled={gameOver} onClick={()=>buttonClick("blue")}>Blue</button>
                </div>
                <ul>
                    {colorArray.map((color,key)=>(
                        <li key={key}>{color}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Assignment_18