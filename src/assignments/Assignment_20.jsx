import axios from "axios";
import "./Assignment_20.css";
import { useEffect, useState } from "react";

function Assignment_20() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [review, setReview] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  function loadQuestions() {
    axios
      .get("https://apis.dnjs.lk/objects/quiz.php")
      .then((responce) => {
        console.log(responce.data);
        setQuestions(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  function handleUserChoise(index) {
    console.log("Correct index is " + questions[currentQuestion].correct);
    console.log(`Selected index is ${index}`);
    setUserAnswers([...userAnswers, index]);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setEndGame(true);
    }
  }

  function reviewQuestions() {
    setReview(true);
    setCurrentQuestion(0);
  }
  function next() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function previous() {
    setCurrentQuestion(currentQuestion - 1);
  }

  function answerColor(index) {
    const correctAnswer = questions[currentQuestion].correct;
    const userAnswer = userAnswers[currentQuestion];

    if (correctAnswer === userAnswer && index == userAnswer) {
      return { color: "green", fontWeight: 1000 };
    } else if (userAnswer !== correctAnswer && index == correctAnswer) {
      return { color: "green", fontWeight: 1000 };
    } else if (userAnswer !== correctAnswer && userAnswer === index) {
      return { color: "red", fontWeight: 1000 };
    }
  }

  return (
    <div>
      <h1>Assignment 19</h1>
      <div className="assignment-19">
        {!endGame && (
          <div className="questons">
            {questions.length > 0 ? (
              <div>
                <h2>
                  {currentQuestion + 1}. {questions[currentQuestion].question}
                </h2>
                <ul>
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <li key={index} onClick={() => handleUserChoise(index)}>
                      {index + 1}. {answer}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <h2>Loading questions...</h2>
            )}
          </div>
        )}
        {endGame && (
          <div className="endScreen">
            <h2>Game Over!</h2>
            <h2>Your Score is {score}</h2>
            <button onClick={reviewQuestions}>Review Questions</button>
          </div>
        )}
        {review && (
          <div className="reviewSection">
            <h2>Review Section</h2>
            <h2>
              {currentQuestion + 1}. {questions[currentQuestion].question}
            </h2>
            <ul>
              {questions[currentQuestion].answers.map((answer, index) => (
                <li key={index} style={answerColor(index)}>
                  {index + 1}. {answer}
                </li>
              ))}
            </ul>
            <div className="nextPrevButtons">
              <button onClick={previous} disabled={currentQuestion < 1}>
                Previous
              </button>
              <button
                onClick={next}
                disabled={currentQuestion == questions.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Assignment_20;
