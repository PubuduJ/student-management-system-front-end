import {useState} from "react";
import {Link} from "react-router-dom";
import OutputContainer from "../components/OutputContainer";
import {PatchCall, PostCall} from "../api/ApiCalls";

function UpdateStudent() {
    const [output, setOutput] = useState({nic: "", name: "", address: "", contact: ""});
    const [student, setStudent] = useState({nic: "", name: "", address: "", contact: ""});
    const [errMessage, setErrMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        setResponseMessage("");
        setErrMessage("");
        setStudent((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleCheckOut() {
        setResponseMessage("");
        setErrMessage("");
        if (!/^\d{9}[Vv]$/.test(student.nic)) {
            setErrMessage("Student nic number is empty or invalid");
            document.getElementById("nic").focus();
            return;
        } else if (!/^[A-Za-z][A-Za-z ]+$/.test(student.name)) {
            setErrMessage("Student name is empty or invalid");
            document.getElementById("name").focus();
            return;
        } else if (!/^[A-Za-z\d][A-Za-z\d-|/# ,.:;\\]+$/.test(student.address)) {
            setErrMessage("Student address is empty or invalid");
            document.getElementById("address").focus();
            return;
        } else if (!/^\d{3}-\d{7}$/.test(student.contact)) {
            setErrMessage("Student contact is empty or invalid");
            document.getElementById("contact").focus();
            return;
        }
        setOutput({nic: student.nic, name: student.name, address: student.address, contact: student.contact});
        setStudent({nic: "", name: "", address: "", contact: ""});
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        setResponseMessage("");
        if (!output.nic || !output.name || !output.address || !output.contact) {
            setErrMessage("Inputs didn't checked out");
            return;
        }
        try {
            const response = await PatchCall(output.nic, output);
            setResponseMessage("Student successfully updated in the database");
        }
        catch (err) {
            if (err.response) {
                setResponseMessage(err.response.data.message);
            } else {
                setResponseMessage(`Error: ${err.message}`);
            }
        }
        finally {
            setOutput({nic: "", name: "", address: "", contact: ""});
        }
    }

    return (
        <div className={"centered-element"}>
            <img className="student-img" src={"https://cdn-icons-png.flaticon.com/512/5349/5349022.png"} width={"120px"} alt={"user-logo"}/>
            <div className="student-container">
                <h1>Update Student Details</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={student.nic} id="nic" name="nic" placeholder="Enter NIC Number" />
                    <input onChange={handleChange} value={student.name} id="name" name="name" placeholder="Enter Name" />
                    <input onChange={handleChange} value={student.address} id="address" name="address" placeholder="Enter Address" />
                    <input onChange={handleChange} value={student.contact} id="contact" name="contact" placeholder="Enter Contact" />
                    <h5>{errMessage}&nbsp;</h5>
                    <br/>
                    <button onClick={handleCheckOut} type={"button"}>Check Out</button>
                    <button type={"submit"}>Update Student Details</button>
                    <Link className={"back-link"} to='/dashboard'>Back</Link>
                </form>
                <br/>
                <OutputContainer
                    nic={output.nic}
                    name={output.name}
                    address={output.address}
                    contact={output.contact}
                />
                <br/>
                <h4>{responseMessage}</h4>
            </div>
        </div>
    );
}

export default UpdateStudent;