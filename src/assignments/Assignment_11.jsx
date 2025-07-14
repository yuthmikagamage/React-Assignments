import "./Assignment_11.css";
import axios from "axios"
import { useEffect, useState } from "react"

function Assignement_11(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [displayResponce, setDisplayResponce] = useState("")
    const [token,setToken] = useState("")
    const [name,setName] = useState("")
    const [description, setDescription] = useState("")
    const [avatar, setAvatar] = useState("")

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
        }).catch(error=>{
            setDisplayResponce("Invalid Credentials", error)
        })
    }

        function getUserDetails(){
            axios.get("https://auth.dnjs.lk/api/user",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(responce=>{
                const data = responce.data
                console.log(data)
                setName(data.name)
                setDescription(data.description)
                setAvatar(data.avatar)
            }).catch(error=>{
                console.log("Error getting user details -",error)
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
            <h3>{displayResponce}</h3>
            {(name || description) && <div className="displayUserDetails">
                {avatar && <img src={avatar} className="avatar"></img>}
                {name && <h3>Hellow {name}</h3>}
                {description && <p>{description}</p>}
            </div>}

        </div>
    )

}
export default Assignement_11