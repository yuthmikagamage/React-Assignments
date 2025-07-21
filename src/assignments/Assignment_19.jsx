import axios from "axios"
import "./Assignment_19.css"
import { useEffect, useState } from "react"

function Assignment_19(){
    const [questions,setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0);
    const [endGame, setEndGame] = useState(false)

    function loadQuestions(){
        axios.get("https://apis.dnjs.lk/objects/quiz.php").then(
            responce=>{
                console.log(responce.data)
                setQuestions(responce.data)
            }
        ).catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        loadQuestions()
    },[])

    function handleUserChoise(index){
        console.log("Correct index is "+ questions[currentQuestion].correct)
        console.log(`Selected index is ${index}`)
        if(index === questions[currentQuestion].correct){
            setScore(score+1)
        }
        if(currentQuestion<9){
            setCurrentQuestion(currentQuestion+1)
        }else{
            setEndGame(true)
        }
    }


    return(
        <div>
            <h1>Assignment 19</h1>
            <div className="assignment-19">
                {!endGame && <div className="questons">
                    {questions.length > 0 ? (
                        <div>
                            <h2>{currentQuestion+1}. {questions[currentQuestion].question}</h2>
                            <ul>
                                {questions[currentQuestion].answers.map((answer,index)=>(
                                    <li key={index} onClick={()=>handleUserChoise(index)}>{index+1}. {answer}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <h2>Loading questions...</h2>
                    )}
                </div>}
                {endGame && 
                <div className="endScreen">
                    <h2>Game Over!</h2>
                    <h2>Your Score is {score}</h2>
                </div>}
            </div>
        </div>
    )

}
export default Assignment_19