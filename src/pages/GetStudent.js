import {useState} from "react";
import {Link} from "react-router-dom";
import OutputContainer from "../components/OutputContainer";

function GetStudent() {
    const [output, setOutput] = useState({nic: "", name: "", address: "", contact: ""});
    const [nic, setNic] = useState("");
    const [errMessage, setErrMessage] = useState("");

    function handleChange(event) {
        setOutput({nic: "", name: "", address: "", contact: ""});
        const newNic = event.target.value;
        setNic(newNic);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!/^\d{9}[Vv]$/.test(nic)) {
            setErrMessage("User nic number is empty or invalid");
            document.getElementById("nic").focus();
            return;
        }
    }

    return (
        <div>
            <img className="student-img" src={"https://cdn-icons-png.flaticon.com/512/5349/5349022.png"} width={"100px"} alt={"student-logo"}/>
            <div className="student-container">
                <h1>Get User</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={nic} id="nic" name="nic" placeholder="Enter NIC Number"/>
                    <button type={"submit"}>Get Student Details</button>
                    <Link className={"back-link"} to='/dashboard'>Back</Link>
                </form>
                <h5>{errMessage}&nbsp;</h5>
                <br/>
                <OutputContainer
                    nic={output.nic}
                    name={output.name}
                    address={output.address}
                    contact={output.contact}
                />
            </div>
        </div>
    );
}

export default GetStudent;