import { useState, useCallback, useEffect } from "react";
import "./EditForm.css";
import Input from "./Input";

function EditForm(props) {
    const [name, setName] = useState("placeholder");
    const [balance, setBalance] = useState(0);
    const [repS, setRepS] = useState(0);
    const [repB, setRepB] = useState(0);

    const form_entries = [
        ["name", "Full Name", (output) => {setName(output)}],
        ["balance", "Balance", (output) => {setBalance(output)}],
        ["reputationSeller", "Salesman reputation", (output) => {setRepS(output)}],
        ["reputationBuyer", "Buyer reputation", (output) => {setRepB(output)}],
    ];

    useEffect(() => {
        setName(props.user ? props.user["name"] : "placeholder");
        setBalance(props.user ? props.user["balance"] : 0);
        setRepS(props.user ? props.user["reputationSeller"] : 0);
        setRepB(props.user ? props.user["reputationBuyer"] : 0);
    }, [props.user]);

    const submit_user = useCallback(async () => {
        await fetch(props.url + "/" + props.user["login"], {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: "",
                name: name,
                balance: balance,
                reputationSeller: repS,
                reputationBuyer: repB
            })
        }).catch((err) => {
            console.log(err.message);
        });

        props.onExit();
    }, [props, name, balance, repS, repB]);

    const delete_user = useCallback(async () => {
        await fetch(props.url + "/" + props.user["login"], {
            method: "DELETE",
        }).catch((err) => {
            console.log(err.message);
        });

        props.onExit();
    }, [props]);

    return (
        <div className={"overlay"} hidden={props.hidden}>
            {props.user ? (
                <div className={"form_container"}>
                    <div className={"edit_form"}>
                        <div className={"form_row"}>
                            <h2>{"Editing " + props.user["login"]}</h2>
                        </div>
                        {form_entries.map(([key, text, linked_state]) => {return (
                            <div key={"edit_form_" + key} className={"form_row"}>
                                <div className={"form_label"}>{text}</div>
                                <Input initial={props.user[key]} outputSetter={linked_state}/>
                            </div>
                        )})}
                        <div className={"form_row"}>
                            <div className={"cancel_button"} onClick={props.onExit}>Cancel changes</div>
                            <div className={"submit_button"} onClick={submit_user}>Save user data</div>
                            <div className={"delete_button"} onClick={delete_user}>Delete user</div>
                        </div>
                    </div>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}

export default EditForm;