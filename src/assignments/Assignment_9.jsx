import { useState } from "react"
import "./Assignment_9.css"
import axios from "axios"

function Assignment_9(){

    const [number,setNumber] = useState()
    const [limit,setLimit] = useState()
    const [currentPage,setCurrentPage] = useState()
    const [currentLimit,setCurrentLimit] = useState()
    const [colors, setColours] = useState([])
    const[search, setSearch] = useState('')

    function submit(){
        setCurrentLimit(limit)
        setCurrentPage(number)

        axios.get(`https://apis.dnjs.lk/objects/colors.php?search=${search}&page=${currentPage}&limit=${currentLimit}`).then(responce=>{
            console.log(responce.data.data)
            setColours(responce.data.data)
        })
        setNumber('')
        setLimit('')
        setSearch('')
    }

    return(
        <div>
            <h1>Colours with page limit</h1>

            <div className="userin">
                <form onSubmit={submit}>

                    <div className="sear">
                        <label>Search a Color: </label>
                        <input type="text" value={search} onChange={event=>setSearch(event.target.value)}></input>
                    </div>
                    <label>Enter Page Number </label>
                    <input type="number" value={number} onChange={event=>setNumber(event.target.value)}></input>

                    <label>Enter Page Limit</label>
                    <input type="number" value={limit} onChange={event=>setLimit(event.target.value)}></input>

                    <button type="submit" className="fbutton">Check</button>
                </form>
            </div>
            <h3>Page Number is {currentPage}</h3>
            <h3>Page Limit is {currentLimit}</h3>

            <ul>
                {colors.map((color, index)=>(
                    <li key={index}>{color.name} - {color.code}</li>
                ))}
            </ul>
        </div>
    )
}
export default Assignment_9
