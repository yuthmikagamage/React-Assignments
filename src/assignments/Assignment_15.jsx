/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react"
import "./Assignment_15.css"
import axios from "axios"

function ProfileScreen({token, setToken}){
    const [name,setName] = useState("")
    const [description, setDescription] = useState("")
    const [avatar, setAvatar] = useState()
    const [editData,setEditData] = useState(false)
    const [editResponce, setEditResponce] = useState("")
    const [newAvatar,setNewAvatar] = useState(null)

    axios.get("https://auth.dnjs.lk/api/user",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(responce=>{
        const data = responce.data
        setName(data.name)
        setAvatar(data.avatar)
        setDescription(data.description)
    }).catch(error=>{
        console.log(error.responce.data.error.message)
    })

    function logOut(){
        axios.post("https://auth.dnjs.lk/api/logout",{}, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(responce=>{
            console.log(responce)
            sessionStorage.removeItem("token") 
            localStorage.removeItem("token")
            setToken("")
        })
    }

    function ChangeAvatar(){
        if(!newAvatar){
            setEditResponce("Please Select Image to Continue!")
            return
        }
        const formData = new FormData()
        formData.append("avatar",newAvatar)
        axios.post("https://auth.dnjs.lk/api/avatar",formData,{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"multipart/form-data"
            }
        }).then(responce=>{
            console.log(responce)
            setEditResponce("Avatar Changed Suessfully")
            setEditData(false)
            setNewAvatar(null)
        }).catch(error=>{
            console.log(error)
            setEditResponce("Error: " + error.response?.data?.error?.messages)
        })
    }

    return(
        <div className="profilepage">
            {name && description &&<div className="container">
             <div className="displayUserData">
                <img src={avatar} className="avatar"></img>
                <h3>{name}</h3>
                <h3>{description}</h3>
                <div className="buttons">
                    <button className="fbutton" onClick={logOut}>Log Out</button>
                    <button className="fbutton" onClick={()=>setEditData(true)}>Change Avatar</button>
                </div>
            </div>
                        
            <div className="editDetails">
                <h3>Change Avatar</h3>
                <input type="file" accept="image/*" disabled={!editData} onChange={event=>setNewAvatar(event.target.files[0])}></input>
                <button onClick={()=>setEditData(false)} disabled={!editData}>Close</button>
                <button disabled={!editData} onClick={ChangeAvatar}>Confirm and Change</button>
                <h3>{editResponce}</h3>
            </div>
            </div>}
        </div>
    )
}

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
    )
}

function Assignement_15(){
    const [token, setToken] = useState("")

    useEffect(()=>{
        const token = sessionStorage.getItem("token") || localStorage.getItem("token")
        setToken(token)
    },[])
    
    return(
        <div>
            <h1>Assignment 15</h1>
            {token && <ProfileScreen token={token} setToken={setToken} />}
            {!token && <LogingScreen setToken={setToken}/>}
        </div>
    )
}

export default Assignement_15

