function OutputContainer(props) {
    return (
        <div>
            <h3>NIC Number : {props.nic}</h3>
            <h3>Student Name : {props.name}</h3>
            <h3>Student Address : {props.address}</h3>
            <h3>Student Contact : {props.contact}</h3>
        </div>
    );
}

export default OutputContainer;