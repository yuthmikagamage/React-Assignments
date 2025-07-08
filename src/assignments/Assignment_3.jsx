import { useState } from "react"
import './Assignment_3.css'

function Assignment_3(){

    const [num, setNum] = useState();
    const [total,setTotal] = useState(0);
    const [numArray, setNumArray] =useState([])

    function handleSubmit(){
        const number = parseFloat(num)
        setTotal(total+number)
        setNumArray((currentNums)=>[...currentNums,number])
    }
    return(
        <div>
            <h1> Number Adder </h1>
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <label>Enter a Number: </label>
                    <input type="number" value={num} onChange={event=>setNum(event.target.value)}></input>
                    <button type="submit">Add</button>
                </form>
                <h3>The total is {total}</h3>
                {total>0 && <h3>The average is {total/numArray.length}</h3>}
                
            </div>

            <ul>
                {numArray.map((numb, key)=>(
                    <li key={key}>{numb}</li>
                ))}
            </ul>
            
        </div>
    )

}

export default Assignment_3