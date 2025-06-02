import { useState, useEffect } from "react";
import EditForm from "./EditForm";
import "./UsersTable.css";
import AddForm from "./AddForm";

function UsersTable(props) {
    const [users, setUsers] = useState(props.initialTable);
    const [overlayHidden, setOverlayHidden] = useState(true);
    const [userToEdit, setUserToEdit] = useState(undefined);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        fetch(props.url)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err.message);
                props.errHandler();
            });
    }, [props, props.url, overlayHidden, refresh]);

    const _open_edit_form = (user_entry) => {
        setOverlayHidden(false);
        setUserToEdit(user_entry);
    }

    return (
        <div className={"table_container"}>
            <div className={"table_container_row"}>
                <AddForm
                    url={props.url}
                    onSubmit={() => {setRefresh(!refresh)}}
                />
            </div>
            <div className={"table_container_row"}>
                <div className={"table"}>
                    <EditForm
                        url={props.url}
                        hidden={overlayHidden}
                        user={userToEdit}
                        onExit={() => {
                            setUserToEdit(undefined);
                            setOverlayHidden(true);
                        }}
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
                            <div className={"table_data"} onClick={() => {_open_edit_form(entry)}}>{entry["login"]}</div>
                            <div className={"table_data"} onClick={() => {_open_edit_form(entry)}}>{entry["name"]}</div>
                            <div className={"table_data"} onClick={() => {_open_edit_form(entry)}}>{entry["balance"]}</div>
                            <div className={"table_data"} onClick={() => {_open_edit_form(entry)}}>{entry["reputationSeller"]}</div>
                            <div className={"table_data"} onClick={() => {_open_edit_form(entry)}}>{entry["reputationBuyer"]}</div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    );
}

export default UsersTable;