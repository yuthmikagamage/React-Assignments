import "./Assignment_11.css"
import axios from "axios"
import { useEffect, useState } from "react"

function Assignement_11(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [displayResponce, setDisplayResponce] = useState("")
    const [token,setToken] = useState("")

    useEffect(()=>{
        setDisplayResponce("")
    },[email,password])

    useEffect(() => {
        if (token) {
            getUserDetails();
        }
  }, [token]);

    function submit(){
        console.log("Button Clicked Submitted")
        axios.post("https://auth.dnjs.lk/api/login",{
            "email":email,
            "password":password
        }).then(responce=>{
            console.log(responce)
            setDisplayResponce("Correct Credentials")
            setToken(responce.data.access_token)
        }).catch(setDisplayResponce("Invalid Credentials"))
    }

    function getUserDetails(){
        axios.get("https://auth.dnjs.lk/api/user",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            console.log(response.data)
        }).catch(error=>{
            console.error("Error retreiving user details",error)
        })
    }


    return(
        <div>
            <h1>Assignment 11</h1>
            <div className="userInput">
                <form onSubmit={submit}>
                    <label>Enter your email: </label>
                    <input type="text" value={email} onChange={event=>setEmail(event.target.value)}></input>
                    <label>Enter your password: </label>
                    <input type="password" value={password} onChange={event=>setPassword(event.target.value)}></input>
                    <button type="submit" className="fbutton">Submit</button>
                </form>
            </div>
            <h3>{displayResponce} {token}</h3>
        </div>
    )

}
export default Assignement_11