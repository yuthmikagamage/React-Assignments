import { useState } from 'react';
import './Assignment_4.css'
function Assignment_4(){

    const [num, setNum] = useState();
    const [numArray, setNumArray] =useState([])

    function handleSubmit(){
        const number = parseFloat(num)
        setNumArray((currentNums)=>[...currentNums,number])
    }
    function handleDelete(key){
        setNumArray((currentNums)=>currentNums.filter((_,i)=>i!==key))
    }    
    return(
        <div>
            <h1>Assignment 04</h1>
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <label>Enter a Number: </label>
                    <input type="number" value={num} onChange={event=>setNum(event.target.value)}></input>
                    <button className='fbutton' type="submit">Add</button>
                </form>

            </div>

            <ul>
                {numArray.map((numb, key)=>(
                    <div className='items'>
                        <li key={key}>{numb}</li>
                        <button className='deleteButton' onClick={()=>{handleDelete(key)}}>Delete</button>
                    </div>
                ))}
            </ul>
            
        </div>
    )

}
export default Assignment_4