import { useState, useCallback } from "react";
import "./AddForm.css";
import Input from "./Input";

function AddForm(props) {
    const [login, setLogin] = useState("placeholder");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("placeholder");
    const [balance, setBalance] = useState(0);
    const [repS, setRepS] = useState(0);
    const [repB, setRepB] = useState(0);

    const form_entries = [
        ["login", "", "Login", (output) => {setLogin(output)}],
        ["password", "", "Password", (output) => {setPassword(output)}],
        ["name", "", "Full Name", (output) => {setName(output)}],
        ["balance", 0, "Balance", (output) => {setBalance(output)}],
        ["reputationSeller", 0, "Salesman reputation", (output) => {setRepS(output)}],
        ["reputationBuyer", 0, "Buyer reputation", (output) => {setRepB(output)}],
    ];

    const submit_user = useCallback(async () => {
        if (login !== "placeholder" && password !== "" && name !== "placeholder") {
            await fetch(props.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    login: login,
                    password: password,
                    name: name,
                    balance: balance,
                    reputationSeller: repS,
                    reputationBuyer: repB
                })
            }).catch((err) => {
                console.log(err.message);
            });

            props.onSubmit();
        }
    }, [props, login, password, name, balance, repS, repB]);

    return (
        <div className={"form_container"}>
            <div className={"add_form"}>
                <div className={"form_row"}>
                    <h2>{"Add a new user"}</h2>
                </div>
                {form_entries.map(([key, initial, text, linked_state]) => {return (
                    <div key={"add_form_" + key} className={"form_row"}>
                        <div className={"form_label"}>{text}</div>
                        <Input initial={initial} outputSetter={linked_state}/>
                    </div>
                )})}
                <div className={"form_row"}>
                    <div className={"submit_button"} onClick={submit_user}>Create user entry</div>
                </div>
            </div>
        </div>
    );
}

export default AddForm;