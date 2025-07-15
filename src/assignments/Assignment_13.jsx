import { useEffect, useState } from "react"
import "./Assignment_13.css"

function ProfileScreen({setLogin}){

    return(
        <div>
            <h1>Profile Screen</h1>
            <button onClick={() => setLogin(false)}>Click me</button>
        </div>
    )}

function LogingScreen({ setLogin }){

    return(
        <div>
            <h1>Login Screen</h1>
            <button onClick={() => setLogin(true)}>Click me</button>
        </div>
    )
}





function Assignement_13(){
    const [login, setLogin] = useState(false)
    const [token, setToken] = useState("")

    useEffect(()=>{

    },[])
    
    return(
        <div>
            <h1>Assignment 13</h1>
            {login && <ProfileScreen setLogin={setLogin}  setToken={setToken}/>}
            {!login && <LogingScreen setLogin={setLogin} token={token}/>}
        </div>
    )
}

export default Assignement_13

