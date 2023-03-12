import {Link} from "react-router-dom";
import {useState} from "react";
import {DeleteCall} from "../api/ApiCalls";

function DeleteStudent() {
    const [nic, setNic] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    function handleChange(event) {
        setResponseMessage("");
        setErrMessage("");
        const newNic = event.target.value;
        setNic(newNic);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");
        if (!/^\d{9}[Vv]$/.test(nic)) {
            setErrMessage("Student nic number is empty or invalid");
            document.getElementById("nic").focus();
            return;
        }
        try {
            await DeleteCall(nic);
            setResponseMessage("Student successfully delete from the database");
        }
        catch (err) {
            if (err.response) {
                setResponseMessage(err.response.data.message);
            } else {
                setResponseMessage(`Error: ${err.message}`);
            }
        }
        finally {
            setNic("");
        }
    }

    return (
        <div className={"centered-element"}>
            <img className="student-img" src={"https://cdn-icons-png.flaticon.com/512/5349/5349022.png"} width={"120px"} alt={"user-logo"}/>
            <div className="student-container">
                <h1>Delete Student</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={nic} id="nic" name="nic" placeholder="Enter NIC Number"/>
                    <h5>{errMessage}&nbsp;</h5>
                    <br/>
                    <button type={"submit"}>Delete Student</button>
                    <Link className={"back-link"} to='/dashboard'>Back</Link>
                </form>
                <h4>{responseMessage}</h4>
            </div>
        </div>
    );
}

export default DeleteStudent;