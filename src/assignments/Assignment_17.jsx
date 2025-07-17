import { useEffect, useState } from "react"
import "./Assignment_17.css"
function Assignment_17(){
    const [firstColour, setFirstColour] = useState("")
    const [secondColour, setSecondColour] = useState("")
    const [mixedColour,setMixedColour] = useState("")
    const [error,setError] = useState("")

    function hexToRgb(hex){
        const r = parseInt(hex.slice(1,3),16)
        const g = parseInt(hex.slice(3,5),16)
        const b = parseInt(hex.slice(5,7),16)
        return [r,g,b]
    }

    const rgbToHex = (r, g, b) => {
        const clamp = (val) => Math.min(255, val);
        const toHex = (val) => clamp(val).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    useEffect(()=>{
        setError("")
        mixColours()
    },[firstColour,secondColour])

    function mixColours(){
        if (firstColour === "" || secondColour === "") {
            setError("Select Colours Correctly!");
            return;
        }

        const [r1,g1,b1] = hexToRgb(firstColour)
        const [r2,g2,b2] = hexToRgb(secondColour)

        const mixedR = Math.min(255,r1+r2);
        const mixedG = Math.min(255,g1+g2);
        const mixedB = Math.min(255,b1+b2);

        const mixedHex = rgbToHex(mixedR, mixedG, mixedB);
        setMixedColour(mixedHex)
    }

    return(
        <div>
            <h1>Assignment 17</h1>
            <div className="UserColourInput">
                <label>First Colour</label>
                <input type="color" className="colour-input" value={firstColour} onChange={event=>setFirstColour(event.target.value)}></input>
                <label>Second Colour</label>
                <input type="color" className="colour-input" value={secondColour} onChange={event=>setSecondColour(event.target.value)}></input>
            </div>
            <h3>{error}</h3>
            <h3>{mixedColour}</h3>
            <div className="mixColourBox" style={{backgroundColor: mixedColour}}></div>
            <div className="gradientBox" style={{background: `linear-gradient(to right, ${firstColour}, ${mixedColour}, ${secondColour})`,}}>

            </div>
        </div>
    )

}
export default Assignment_17