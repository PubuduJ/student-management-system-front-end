import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [admin, setAdmin] = useState({username: "", password: ""});
    const [errMessage, setErrMessage] = useState("");
    const navigate = useNavigate();

    function handleChange(event) {
        const {name, value} = event.target;
        setAdmin(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    function handleLogin(event) {
        event.preventDefault();
        if (admin.username !== "admin") {
            setErrMessage("Username is not correct");
            document.getElementById("username").focus();
            return;
        } else if (admin.password !== "admin123") {
            setErrMessage("Password is not correct");
            document.getElementById("password").focus();
            return;
        }
        navigate("/dashboard");
    }

    return (
        <div className={"centered-element"}>
            <img className={"login-img"} src={"./images/login-logo.png"} width={"120px"} alt={"login-logo"}/>
            <div className={"login-container"}>
                <h1>Admin Login</h1>
                <br/>
                <form onSubmit={handleLogin} className={"login-form"}>
                    <input onChange={handleChange} id={"username"} type={"text"} name={"username"} placeholder={"Username"} value={admin.username}/>
                    <input onChange={handleChange} id={"password"} type={"password"} name={"password"} placeholder={"Password"} value={admin.password}/>
                    <button type={"submit"}>Login</button>
                </form>
                <h5>{errMessage}</h5>
            </div>
        </div>
    );
}

export default Login;