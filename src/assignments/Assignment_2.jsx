import { useState } from "react"
import './Assignment_2.css'

function Assignments_2(){

    const [num1, setNum1] = useState('')
    const[num2, setNum2] = useState('')
    const[result,setResult] = useState('')
    const [operation,setOperation] = useState('Addition')

    function addition (){
        setResult(num1+num2)
    }
    function multipication(){
        setResult(num1*num2)
    }
    function substraction(){
        setResult(num1-num2)
    }
    function division(){
        setResult(num1/num2)
    }
    function changingOperation(){
        setOperation(event.target.value)
    }

    function calculation(){
        switch (operation){
            case 'Addition':
                addition()
                break
            case 'Multipication':
                multipication()
                break
            case 'Substraction':
                substraction()
                break
            case 'Division':
                division()
                break
        }
    }

    return(
        <div>
            <h1>Assignment 02</h1>
            <div className="selection">
                <label className="choose">Choose the Mathematical Operation </label>

                <select value={operation} onChange={changingOperation}>
                    <option>Addition</option>
                    <option>Multipication</option>
                    <option>Substraction</option>
                    <option>Division</option>
                </select>
            </div>

            <div className="input">
                <label>First Number : </label>
                <input type="number" value={num1} onChange={event=>setNum1(event.target.value)}></input>

                <label>Second Number : </label>
                <input type="number" value={num2} onChange={event=>setNum2(event.target.value)}></input>
            </div>

            <div className="button">
                {num1 !== '' && num2 !== '' && <button onClick={calculation} >Calculate</button>}
            </div>

            <div className="result">
                {result >0 && <p>The result is {result}</p>}
            </div>


        </div>


    )

}
export default Assignments_2