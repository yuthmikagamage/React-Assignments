import "./Assignment_12.css";
import axios from "axios"
import { useEffect, useState } from "react"

function Assignement_12(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [displayResponce, setDisplayResponce] = useState("")
    const [token,setToken] = useState("")
    const [name,setName] = useState("")
    const [description, setDescription] = useState("")
    const [avatar, setAvatar] = useState("")
    const [check, setCheck] = useState(false)

    useEffect(()=>{
        const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token")
        if(storedToken){
            setToken(storedToken)
        }
    },[])

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
            if(check){
                localStorage.setItem("token",responce.data.access_token)
            }else{
                sessionStorage.setItem("token",responce.data.access_token)
            }
        }).catch(error=>{
            setDisplayResponce(error.response.data.error.message)
        })
    }

    function getUserDetails(){
        console.log("Running get user details function")
        axios.get("https://auth.dnjs.lk/api/user",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(responce=>{
            const data = responce.data
            setName(data.name)
            setDescription(data.description)
            setAvatar(data.avatar)
        }).catch(error=>{
            console.log(error.response.data.error.message)
        })
    }
    
    function handleCheckboxChange(event) {
        const isChecked = event.target.checked;
        setCheck(isChecked);
    }
    function clear(){
        setToken("")
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
        setName("")
        setDescription("")
        setAvatar("")
    }

    return(
        <div>
            <h1>Assignment 12</h1>
            {!token && <div className="login-screen-11">
            
            <div className="userInputs">
                <form onSubmit={submit}>
                    <div className="upper">
                        <div className="container">
                        <label>Enter your email: </label>
                        <input type="text" value={email} onChange={event=>setEmail(event.target.value)}></input>
                        <label>Enter your password: </label>
                        <input type="password" value={password} onChange={event=>setPassword(event.target.value)}></input>
                        </div>
                        <div className="checkSubmit">
                            <label>Keep Me Logged In: </label>
                            <input type="checkbox" checked={check} onChange={handleCheckboxChange} ></input>
                        </div>
                        <button type="submit" className="fbutton">Submit</button>
                    </div>
                </form>
            </div>
            </div>}
            <h3>{displayResponce}</h3>
            {(token) && <div className="displayUserDetails">
                {avatar && <img src={avatar} className="avatar"></img>}
                {name && <h3>Hellow {name}</h3>}
                {description && <p>{description}</p>}
                <button onClick={clear} className="fbutton">Clear Token</button>
            </div>}
        </div>
    )
}
export default Assignement_12