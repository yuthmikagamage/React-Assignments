import axios from "axios"
import { useState } from "react"
import './Assignment_8.css'

function Assignment_8(){
    
    const[search, setSearch] = useState('')
    const [style,setStyle] = useState([])

    function submit(){

        axios.get(`https://apis.dnjs.lk/objects/colors.php?search=${search}`).then(responce=>{
            console.log(responce.data)
            setStyle(responce.data)
        })
        setSearch('')
    }

    return(
        <div>
            <h1>Assignment 08</h1>
            <div className="sear">
                <form onSubmit={submit}>
                    <label>Search Colour </label>
                    <input type="text" onChange={event=>setSearch(event.target.value)}></input>
                    <button type="submit" className="fbutton">Search</button>
                </form>
            </div>
            <ul>
                {style.map((styles,index)=>(
                    <li key={index}>{styles.name} - {styles.code}</li>
                ))}
            </ul>
        </div>
    )

}
export default Assignment_8