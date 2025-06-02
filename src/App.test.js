import { render, fireEvent } from "@testing-library/react";
import Input from "./components/Input.js";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import UsersTable from "./components/UsersTable";

describe("Component tests", () => {
    test("Input tested successfully", () => {
        let change_indicator = "0";

        const { container } = render(<div><Input
            initial={"initial_value"}
            outputSetter={(output) => {change_indicator = output}}
        /></div>);

        const input_wrapper = container.firstChild.firstChild;
        const input = input_wrapper.firstChild;

        expect(input_wrapper.className).toBe("form_input_container");
        expect(input.className).toBe("form_input");
        expect(input.type).toBe("text");

        expect(change_indicator).toBe("0");

        fireEvent.change(input, {target: {value: "42"}})

        expect(change_indicator).toBe("42");
    });

    test("AddForm tested successfully", () => {
        let submit_indicator = 0;

        const form_entries = ["Login", "Password", "Full Name", "Balance", "Salesman reputation", "Buyer reputation"];

        const { container } = render(<div><AddForm
            url={"url_value"}
            onSubmit={() => {submit_indicator = 1}}
        /></div>);

        const form_wrapper = container.firstChild.firstChild;
        const add_form = form_wrapper.firstChild;
        const form_rows = add_form.childNodes;

        expect(form_wrapper.className).toBe("form_container");
        expect(add_form.className).toBe("add_form");

        for (let i = 0; i < 8; i++) {
            expect(form_rows[i].className).toBe("form_row");
        }

        expect(form_rows[0].firstChild.textContent).toBe("Add a new user");

        for (let i = 1; i < 7; i++) {
            expect(form_rows[i].firstChild.className).toBe("form_label");
            expect(form_rows[i].firstChild.textContent).toBe(form_entries[i - 1]);

            expect(form_rows[i].childNodes[1].className).toBe("form_input_container");
            expect(form_rows[i].childNodes[1].firstChild.className).toBe("form_input");
            expect(form_rows[i].childNodes[1].firstChild.type).toBe("text");

            fireEvent.change(form_rows[i].childNodes[1].firstChild, {target: {value: "42"}});
        }

        expect(form_rows[7].firstChild.className).toBe("submit_button");
        expect(form_rows[7].firstChild.textContent).toBe("Create user entry");

        expect(submit_indicator).toBe(0);

        fireEvent.change(form_rows[1].childNodes[1].firstChild, {target: {value: "placeholder"}});
        fireEvent.change(form_rows[2].childNodes[1].firstChild, {target: {value: ""}});
        fireEvent.change(form_rows[3].childNodes[1].firstChild, {target: {value: "placeholder"}});

        fireEvent.click(form_rows[7].firstChild);

        expect(submit_indicator).toBe(0);

        fireEvent.change(form_rows[1].childNodes[1].firstChild, {target: {value: "login"}});
        fireEvent.change(form_rows[2].childNodes[1].firstChild, {target: {value: "password"}});
        fireEvent.change(form_rows[3].childNodes[1].firstChild, {target: {value: "username"}});

        fireEvent.click(form_rows[7].firstChild);

        expect(submit_indicator).toBe(0);
    });

    test("EditForm tested successfully", () => {
        let exit_indicator = 0;

        const form_entries = ["Full Name", "Balance", "Salesman reputation", "Buyer reputation"];
        const button_entries = [
            ["cancel_button", "Cancel changes"],
            ["submit_button", "Save user data"],
            ["delete_button", "Delete user"]
        ];

        const { container } = render(<div><EditForm
            url={"url_value"}
            hidden={false}
            user={{"login": "test_user"}}
            onExit={() => {exit_indicator += 1}}
        /></div>);

        const overlay = container.firstChild.firstChild;
        const form_container = overlay.firstChild;
        const edit_form = form_container.firstChild;
        const form_rows = edit_form.childNodes;

        expect(overlay.className).toBe("overlay");
        expect(form_container.className).toBe("form_container");
        expect(edit_form.className).toBe("edit_form");

        for (let i = 0; i < 5; i++) {
            expect(form_rows[i].className).toBe("form_row");
        }

        expect(form_rows[0].firstChild.textContent).toBe("Editing test_user");

        for (let i = 1; i < 5; i++) {
            expect(form_rows[i].firstChild.className).toBe("form_label");
            expect(form_rows[i].firstChild.textContent).toBe(form_entries[i - 1]);

            expect(form_rows[i].childNodes[1].className).toBe("form_input_container");
            expect(form_rows[i].childNodes[1].firstChild.className).toBe("form_input");
            expect(form_rows[i].childNodes[1].firstChild.type).toBe("text");

            fireEvent.change(form_rows[i].childNodes[1].firstChild, {target: {value: "42"}});
        }

        expect(exit_indicator).toBe(0);

        for (let i = 0; i < 3; i++) {
            expect(form_rows[5].childNodes[i].className).toBe(button_entries[i][0]);
            expect(form_rows[5].childNodes[i].textContent).toBe(button_entries[i][1]);

            fireEvent.click(form_rows[5].childNodes[i]);
        }

        expect(exit_indicator).toBe(1);
    });

    test("UsersTable tested successfully", () => {
        let err_indicator = 0;

        const form_entries = ["Login", "Password", "Full Name", "Balance", "Salesman reputation", "Buyer reputation"];

        expect(err_indicator).toBe(0);

        const { container } = render(<div><UsersTable
            url={"url_value"}
            initialTable={[
                {
                    "login": "test",
                    "name": "Name A",
                    "balance": 12367,
                    "reputationSeller": 50,
                    "reputationBuyer": 10
                }
            ]}
            errHandler={() => {err_indicator += 1}}
        /></div>);

        expect(err_indicator).toBe(0);

        const table_wrapper = container.firstChild.firstChild;
        const header_row = table_wrapper.childNodes[0];
        const main_row = table_wrapper.childNodes[1];

        expect(table_wrapper.className).toBe("table_container");
        expect(header_row.className).toBe("table_container_row");
        expect(main_row.className).toBe("table_container_row");

        const add_form_wrapper = header_row.firstChild;
        const add_form = add_form_wrapper.firstChild;
        const add_form_rows = add_form.childNodes;

        expect(add_form_wrapper.className).toBe("form_container");
        expect(add_form.className).toBe("add_form");

        for (let i = 0; i < 8; i++) {
            expect(add_form_rows[i].className).toBe("form_row");
        }

        expect(add_form_rows[0].firstChild.textContent).toBe("Add a new user");

        for (let i = 1; i < 7; i++) {
            expect(add_form_rows[i].firstChild.className).toBe("form_label");
            expect(add_form_rows[i].firstChild.textContent).toBe(form_entries[i - 1]);

            expect(add_form_rows[i].childNodes[1].className).toBe("form_input_container");
            expect(add_form_rows[i].childNodes[1].firstChild.className).toBe("form_input");
            expect(add_form_rows[i].childNodes[1].firstChild.type).toBe("text");

            fireEvent.change(add_form_rows[i].childNodes[1].firstChild, {target: {value: "42"}});
        }

        expect(add_form_rows[7].firstChild.className).toBe("submit_button");
        expect(add_form_rows[7].firstChild.textContent).toBe("Create user entry");

        fireEvent.click(add_form_rows[7].firstChild);

        const table = main_row.firstChild;

        expect(table.className).toBe("table");
        expect(table.childNodes.length).toBe(3);

        const overlay = table.firstChild;

        expect(overlay.childNodes.length).toBe(1);
        expect(overlay.firstChild.textContent).toBe("Loading...");

        const table_header = table.childNodes[1];

        expect(table_header.className).toBe("table_header_row");

        const table_data = table.childNodes[2];

        expect(table_data.className).toBe("table_row");
        expect(table_data.childNodes.length).toBe(5);

        for (let i = 0; i < 5; i++) {
            expect(table_data.childNodes[i].className).toBe("table_data");
        }

        expect(table_data.childNodes[0].textContent).toBe("test");
        expect(table_data.childNodes[1].textContent).toBe("Name A");
        expect(table_data.childNodes[2].textContent).toBe("12367");
        expect(table_data.childNodes[3].textContent).toBe("50");
        expect(table_data.childNodes[4].textContent).toBe("10");

        fireEvent.click(table_data.childNodes[0]);
        fireEvent.click(table_data.childNodes[1]);
        fireEvent.click(table_data.childNodes[2]);
        fireEvent.click(table_data.childNodes[3]);
        fireEvent.click(table_data.childNodes[4]);
    });
});