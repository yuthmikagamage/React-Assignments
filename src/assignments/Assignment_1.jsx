import { useState } from "react"
import "./Assignment_1.css"

function Assignement_1(){

    const[section, setSection] = useState(0)

    return(
        <div>
            <h1>Assignment 01</h1>
            <div className="buttons">
                <button onClick={()=>setSection(1)}>Section #1</button>
                <button onClick={()=>setSection(2)}>Section #2</button>
                <button onClick={()=>setSection(3)}>Section #3</button>
            </div>

            {section ===1 && <p> The Honda Civic is one of the most popular compact cars in the world, known for its reliability, fuel efficiency, 
                and affordable price. With a sleek design, the Civic offers a comfortable ride and a variety of features that make it a top choice 
                for daily commuters, small families, and driving enthusiasts alike. Whether you're looking for a sedan, coupe, or hatchback, 
                the Civic has a variant to suit your needs. Its turbocharged engines deliver a balance of power and fuel efficiency, while advanced safety 
                features like Honda Sensing add peace of mind. With its reputation for longevity and low maintenance costs, 
                the Honda Civic remains a standout in the compact car market. </p>}

            {section ===2 && <p> The Audi A5 is a luxury coupe that effortlessly blends elegance, performance, and advanced technology. With its sleek, 
                aerodynamic design, the A5 exudes sophistication while offering a dynamic driving experience. Under the hood, the A5 comes equipped with 
                powerful engine options, including turbocharged four-cylinder and V6 engines, providing both impressive speed and fuel efficiency. 
                The interior is a sanctuary of comfort, featuring high-quality materials, advanced infotainment systems, and plenty of space for both 
                the driver and passengers.</p>}

            {section ===3 && <p> The Peugeot 5008 is a versatile and stylish seven-seater SUV that combines practicality with modern design. 
                It offers ample space for families or anyone who needs extra seating capacity, with a flexible interior that allows for easy 
                adjustment of seats and cargo space. The 5008’s sleek exterior is complemented by a high-tech, driver-focused cabin, featuring 
                the innovative i-Cockpit® system with a customizable digital dashboard and intuitive touchscreen controls. </p>}

            
        </div>
    )

}
export default Assignement_1