import { useEffect, useState } from "react"
import "./Assignment_10.css"
import axios from "axios"
function Assignment_10(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [displayResponce, setDisplayResponce] = useState("")

    useEffect(()=>{
        setDisplayResponce("")
    },[email,password])

    function submit(){
        console.log("Button Clicked Submitted")
        axios.post("https://auth.dnjs.lk/api/login",{
            "email":email,
            "password":password
        }).then(responce=>{
            console.log(responce)
            setDisplayResponce("Correct Credentials")
        }).catch(setDisplayResponce("Invalid Credentials"))
    }

    return(
        <div>
            <h1>Assignment 10</h1>
            <div className="userInput">
                <form onSubmit={submit}>
                    <label>Enter your email: </label>
                    <input type="text" value={email} onChange={event=>setEmail(event.target.value)}></input>
                    <label>Enter your password: </label>
                    <input type="password" value={password} onChange={event=>setPassword(event.target.value)}></input>
                    <button type="submit" className="fbutton">Submit</button>
                </form>
            </div>
            <h3>{displayResponce}</h3>
        </div>
    )
}
export default Assignment_10