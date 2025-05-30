import { useState, useEffect } from "react";
import EditForm from "./EditForm";
import "./UsersTable.css";

function UsersTable(props) {
    const [users, setUsers] = useState([]);
    const [overlayHidden, setOverlayHidden] = useState(true);
    const [userToEdit, setUserToEdit] = useState(undefined);

    useEffect(() => {
        fetch(props.url)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [props.url]);

    function open_form(user_entry) {
        setOverlayHidden(false);
        setUserToEdit(user_entry);
    }

    function _exit_form() {
        setUserToEdit(undefined);
        setOverlayHidden(true);
    }

    return (
        <div className={"table"}>
            <EditForm
                url={props.url}
                hidden={overlayHidden}
                user={userToEdit}
                onExit={() => _exit_form()}
            />

            <div className={"table_header_row"}>
                <div className={"table_header"}>Login</div>
                <div className={"table_header"}>Name</div>
                <div className={"table_header"}>Balance</div>
                <div className={"table_header"}>Salesman Reputation</div>
                <div className={"table_header"}>Buyer Reputation</div>
            </div>

            {users.map((entry) => {return (
                <div key={entry["login"]} className={"table_row"}>
                    <div className={"table_data"} onClick={() => {open_form(entry)}}>{entry["login"]}</div>
                    <div className={"table_data"} onClick={() => {open_form(entry)}}>{entry["name"]}</div>
                    <div className={"table_data"} onClick={() => {open_form(entry)}}>{entry["balance"]}</div>
                    <div className={"table_data"} onClick={() => {open_form(entry)}}>{entry["reputationSeller"]}</div>
                    <div className={"table_data"} onClick={() => {open_form(entry)}}>{entry["reputationBuyer"]}</div>
                </div>
            )})}
        </div>
    );
}

export default UsersTable;