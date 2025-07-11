import axios from "axios";
import { useEffect, useState } from "react";

function Assignment_7(){

    const [style,setStyles] = useState([])

    useEffect(()=>{
        axios.get('https://apis.dnjs.lk/objects/colors.php').then(responce=>{
            console.log(responce.data)
            setStyles(responce.data)
        })
    },[])

    return(
        <div>
            <h1>Assignment 07</h1>
            <ul>
                {style.map((stylee,index)=>(
                    <li key={index}>{stylee.name} - {stylee.code}</li>
                ))}
            </ul>
        </div>
    )

}
export default Assignment_7