/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react"
import "./Assignment_16.css"
import axios from "axios"

function LogingScreen({ setToken }){
    const [check,setCheck] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    useEffect(()=>{
        setError("")
    },[email,password])

    function submit(){
        axios.post("https://auth.dnjs.lk/api/login",{
        "email":email,
        "password":password
        }).then(responce=>{
            console.log(responce)
            setToken(responce.data.access_token)
            if(check){
                localStorage.setItem("token",responce.data.access_token)
            }else if(!check){
                sessionStorage.setItem("token",responce.data.access_token)
            }
        }).catch(error=>{
            console.log(error.response?.data?.error?.message)
            setError(error.response?.data?.error?.message)
        })
    }

    return(
        <div className="logn-wrapper">
            <div className="userInput">
                <div className="inputBox">
                <input type="text" placeholder="Your Email" value={email} onChange={event=>setEmail(event.target.value)}></input>
                <input type="password" placeholder="Your Password" value={password} onChange={event=>setPassword(event.target.value)}></input>
                </div>
                <div className="checkbox-container">
                    <label>Keep me sign in</label>
                    <input type="checkbox" onChange={event=>setCheck(event.target.checked)}></input>
                </div>
                <button className="fbutton" onClick={submit}>Log In</button>
                <h3 className="error">{error}</h3>
            </div>
        </div>
    )
}

function ChangePasswordScreen({token}){
    const [name,setName] = useState("")
    const [displayResponce, setDisplayResponce] = useState("")
    const [currentps, setCurrentps] = useState("")
    const [newps, setNewps] = useState("")
    const [reNewPS, setReNewPS] = useState("")

    useEffect(()=>{
        axios.get("https://auth.dnjs.lk/api/user",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(responce=>{
            console.log(responce)
            setName(responce.data.name)
        }).catch(error=>{
            console.log(error.response?.data?.error?.message)
            setDisplayResponce(error.response?.data?.error?.message)
        })
    },[token])



    function changePassword(){
        if(newps!==reNewPS){
            setDisplayResponce("New passwords don't match")
            return
        }
        console.log("nextline")
        axios.put("https://auth.dnjs.lk/api/password", {
            "new_password":reNewPS,
            "old_password":currentps
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(responce=>{
            console.log(responce)
            setDisplayResponce(responce.data.message)
        }).catch(err=>{
            console.log(err)
            setDisplayResponce(err.response.data.error.message)
        })
    }

    return(
        <div>
            <div className="change-password-wrapper">
            <div className="change-box">
                <h3>Hellow {name}</h3>
                <input type="text" placeholder="Current Password" value={currentps} onChange={event=>setCurrentps(event.target.value)}></input>
                <input type="text" placeholder="New Password" value={newps} onChange={event=>setNewps(event.target.value)}></input>
                <input type="text" placeholder="Re-Enter New Password" value={reNewPS} onChange={event=>setReNewPS(event.target.value)}></input>
                <button onClick={changePassword}>Change Password</button>
                <p>{displayResponce}</p>
            </div>
            </div>
        </div>
    )

}

function Assignment_16(){
    const [token,setToken] = useState("")

    useEffect(()=>{
        const savedToken = sessionStorage.getItem("token") || localStorage.getItem("token")
        if(savedToken){
            setToken(savedToken)
        }
    },[])

    return(
        <div>
            <h1>Assignment 16</h1>
            {token ?(<ChangePasswordScreen token={token}></ChangePasswordScreen>):(<LogingScreen setToken={setToken}></LogingScreen>)}
        </div>
    )

}
export default Assignment_16