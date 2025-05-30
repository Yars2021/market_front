import "./Input.css";

function Input(props) {
    return (
        <div className={"form_input_container"}>
            <input
                type="text"
                className={"form_input"}
                defaultValue={props.initial ? props.initial : ""}
                onChange={(e) => {props.outputSetter(e.target.value)}}
            />
        </div>
    );
}

export default Input;