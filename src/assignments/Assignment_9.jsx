import { useEffect, useState } from "react"
import "./Assignment_9.css"
import axios from "axios"

function Assignment_9(){
    const currentLimit = 10;
    const [currentPage,setCurrentPage] = useState(1)
    const [colors, setColours] = useState([])
    const[search, setSearch] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [dataLength,setDataLength] = useState(0)

    function submit(){
        axios.get(`https://apis.dnjs.lk/objects/colors.php?search=${search}&page=${currentPage}&limit=${currentLimit}`).then(responce=>{
            const data = responce.data.data
            console.log(data)
            setColours(data)
            setDataLength(data.length)
            if(data.length>0){
                setLoaded(true)
            }
        })
    }

    useEffect(()=>{
        submit()
    },[currentPage])

    function previous(){
        setCurrentPage(currentPage-1)
    }

    function next(){
        setCurrentPage(currentPage+1)
    }

    return(
        <div>
            <h1>Assignment 09</h1>

            <div className="userin">
                <form onSubmit={submit}>
                    <label>Search a Color: </label>
                    <input type="text" value={search} onChange={event=>setSearch(event.target.value)}></input>
                    <button type="submit" className="fbutton">Check</button>
                </form>
            </div>
            <div className="colourslist">
                <ul>
                    {colors.map((color, index)=>(
                    <li key={index}>{color.name} - {color.code}</li>
                    ))}
                </ul>

            </div>

            <div className="prevnext">
                <button disabled={currentPage===1} className="prevbutton" onClick={previous}>Previous Page</button>

                {loaded && <div>
                    <button disabled={dataLength<10} className="nextbutton" onClick={next}>Next Page</button>
                </div>}
            </div>
        </div>
    )
}
export default Assignment_9
