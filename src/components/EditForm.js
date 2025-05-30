import {useState, useCallback} from "react";
import "./EditForm.css";
import Input from "./Input";

function EditForm(props) {
    const [name, setName] = useState(props.user ? props.user["name"] : "placeholder");
    const [balance, setBalance] = useState(props.user ? props.user["balance"] : 0);
    const [repS, setRepS] = useState(props.user ? props.user["reputationSeller"] : 0);
    const [repB, setRepB] = useState(props.user ? props.user["reputationBuyer"] : 0);

    const submit_fields = useCallback(async () => {
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

    return (
        <div className={"overlay"} hidden={props.hidden}>
            {props.user ? (
                <div className={"form_container"}>
                    <div className={"edit_form"}>
                        <div className={"form_row"}>
                            <h2>{"Editing " + props.user["login"]}</h2>
                        </div>
                        <div className={"form_row"}>
                            <div className={"form_label"}>Full Name</div>
                            <Input
                                initial={props.user["name"]}
                                outputSetter={(output) => {setName(output)}}
                            />
                        </div>
                        <div className={"form_row"}>
                            <div className={"form_label"}>Balance</div>
                            <Input
                                initial={props.user["balance"]}
                                outputSetter={(output) => {setBalance(output)}}
                            />
                        </div>
                        <div className={"form_row"}>
                            <div className={"form_label"}>Salesman reputation</div>
                            <Input
                                initial={props.user["reputationSeller"]}
                                outputSetter={(output) => {setRepS(output)}}
                            />
                        </div>
                        <div className={"form_row"}>
                            <div className={"form_label"}>Buyer reputation</div>
                            <Input
                                initial={props.user["reputationBuyer"]}
                                outputSetter={(output) => {setRepB(output)}}
                            />
                        </div>
                        <div className={"form_row"}>
                            <div className={"cancel_button"} onClick={props.onExit}>Cancel changes</div>
                            <div className={"submit_button"} onClick={submit_fields}>Save user data</div>
                            <div className={"delete_button"} onClick={props.onExit}>Delete user</div>
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