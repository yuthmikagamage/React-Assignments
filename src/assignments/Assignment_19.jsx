import axios from "axios"
import "./Assignment_19.css"
import { useEffect, useState } from "react"

function Assignment_19(){
    const [questions,setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)

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


    return(
        <div>
            <h1>Assignment 19</h1>
            {questions.length > 0 ? (
                <h2>{questions[currentQuestion].question}</h2>
            ) : (
                <h2>Loading question...</h2>
            )}
        </div>
    )

}
export default Assignment_19