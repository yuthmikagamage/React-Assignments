import { Link } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <div>
            <h1>React Assignments</h1>
                <div className="link-grid">
                    <Link to="/ASG_1">Assignment 1</Link>
                    <Link to="/ASG_2">Assignment 2</Link>
                    <Link to="/ASG_3">Assignment 3</Link>
                    <Link to="/ASG_4">Assignment 4</Link>
                    <Link to="/ASG_5">Assignment 5</Link>
                    <Link to="/ASG_6">Assignment 6</Link>
                    <Link to="/ASG_7">Assignment 7</Link>
                    <Link to="/ASG_8">Assignment 8</Link>
                    <Link to="/ASG_9">Assignment 9</Link>
                    <Link to="/ASG_10">Assignment 10</Link>
                </div>
        </div>
    );
}

export default App;
