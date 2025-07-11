import { useState } from "react"
import "./Assignment_9.css"
import axios from "axios"

function Assignment_9(){

    const [number,setNumber] = useState(0)
    const [limit,setLimit] = useState(0)
    const [currentPage,setCurrentPage] = useState(0)
    const [currentLimit,setCurrentLimit] = useState(0)
    const [colors, setColours] = useState([])
    const[search, setSearch] = useState('')
    const [loaded, setLoaed] = useState(false)

    function submit(){
        setCurrentLimit(limit)
        setCurrentPage(number)

        axios.get(`https://apis.dnjs.lk/objects/colors.php?search=${search}&page=${currentPage}&limit=${currentLimit}`).then(responce=>{
            const datas = responce.data.data
            console.log(datas)
            setColours(datas)
            if(datas.length>0){
                setLoaed(true)
            }
        })
        
    }
    function previous(){
        setNumber(number-1)
        submit()
    }

    function next(){
        setNumber(number+1)
        submit()
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
            <div className="colourslist">
                <ul>
                    {colors.map((color, index)=>(
                    <li key={index}>{color.name} - {color.code}</li>
                    ))}
                </ul>

            </div>


            <div className="prevnext">
                {currentPage>1 && <button className="prevbutton" onClick={previous}>Previous Page</button>}

                {loaded && <div>
                    <button className="nextbutton" onClick={next}>Next Page</button>
                </div>}
            </div>



        </div>
    )
}
export default Assignment_9
