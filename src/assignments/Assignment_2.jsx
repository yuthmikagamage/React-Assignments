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
            <h1> Mathematic Calculator </h1>
            <label>Choose the Mathematical Operation </label>

            <select>
                <option>Addition</option>
                <option>Multipication</option>
                <option>Substraction</option>
                <option>Division</option>
            </select>
            <br></br>

            <label>First Number : </label>
            <input type="text" value={num1} onChange={event=>setNum1(event.target.value)}></input>

            <label>Second Number : </label>
            <input type="text" value={num2} onChange={event=>setNum2(event.target.value)}></input>

            {num1 !== '' && num2 !== '' && <button onClick={calculation} >Calculate</button>}
            <p>Result is {result}</p>
        </div>


    )

}
export default Assignments_2