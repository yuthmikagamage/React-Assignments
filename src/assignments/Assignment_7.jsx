import axios from "axios";
import { useState } from "react";

function Assignment_7(){

    const [style,setStyles] = useState([])


    axios.get('https://apis.dnjs.lk/objects/colors.php').then(responce=>{
        console.log(responce.data)
        const newStyle = responce.data
        setStyles([...style,newStyle])
    })

    return(
        <div>
            <h1>Axios Get Request</h1>
        </div>
    )

}
export default Assignment_7