import { useState } from 'react';
import './Assignment_5.css'

function Assignment_5(){
    const [num, setNum] = useState();
    const [numArray, setNumArray] =useState([])

    function handleSubmit(){
        const number = parseFloat(num)
        setNumArray((currentNums)=>[...currentNums,number])
    }
    function handleDelete(key){
        setNumArray((currentNums)=>currentNums.filter((_,i)=>i!==key))
    }    

    function Accending(){
        setNumArray((currentNums)=>[...currentNums].sort((a,b)=>a-b))

    }
    function Decending(){
        setNumArray((currentNums)=>[...currentNums].sort((a,b)=>b-a))
    }
    function moveUp(key){
        if(key>0){
            const newArray = [...numArray]
            const before = newArray[key-1]
            newArray[key-1] = newArray[key]
            newArray[key] = before
            setNumArray(newArray)
        }

    }
    function moveDown(key){
        if(key<numArray.length-1){
            const newArray = [...numArray]
            const after = newArray[key+1]
            newArray[key+1] = newArray[key]
            newArray[key] = after
            setNumArray(newArray)
        }
    }
    return(
        <div>
            <h1>Assignment 05</h1>
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <label>Enter a Number: </label>
                    <input type="number" value={num} onChange={event=>setNum(event.target.value)}></input>
                    <button className='fbutton' type="submit">Add</button>
                </form>
            </div>

            {numArray.length>1 && (<div className='acbuttons-container'><button className='acbuttons' onClick={Accending}>Sort Accending</button><button className='acbuttons' onClick={Decending}>Sort Decending</button></div>)}

            <div className="list-container">

            
            <ul>
                {numArray.map((numb, key)=>(
                    <div className='items'>
                        <li key={key}>{numb}</li>
                        <button className='deleteButton' onClick={()=>{handleDelete(key)}}>Delete</button>
                        <button className='updown' onClick={()=>moveUp(key)}>Move Up</button>
                        <button className='updown' onClick={()=>moveDown(key)}>Move Down</button>
                    </div>
                ))}
            </ul>
            </div>
            
        </div>
    )

}
export default Assignment_5