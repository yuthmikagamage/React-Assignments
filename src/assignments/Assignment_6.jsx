import { useState } from 'react'
import './Assignment_6.css'
function Assignment_6(){
    
    const [names, setName] = useState('')
    const [val, setVal] = useState('')

    const [styles,setStyles] = useState([])

    function submit(){
        event.preventDefault();
        const newStyle = {name: names, relValue:val}

        setStyles([...styles,newStyle])
    }
    const cssObject = styles.reduce((obj, item) => ({
        ...obj, [item.name]: item.relValue
    }), {})

    return(
        <div>
            <h1>Style Setter</h1>

            <div className="inputs">
                <form onSubmit={submit}>
                    <label>Name: </label>
                    <input type='text' onChange={event=>setName(event.target.value)}></input>

                    <label>Value: </label>
                    <input type='text' onChange={event=>setVal(event.target.value)}></input>

                    <button className='fbutton' type='submit'>Add</button>
                </form>
            </div>

            <h3>Current Styles are: {names}</h3>
            <h3>Current Value is: {val}</h3>

            <ul>
                {styles.map((style,index)=>(
                    <li key={index}>{style.name} : {style.relValue}</li>
                ))}
            </ul>

            <div style={cssObject}>Sample Text</div>
        </div>
    )

}
export default Assignment_6