import './App.css';
import UsersTable from "./components/UsersTable";

function App() {
    return (
        <div className={"main_page"}>
            <div className={"page_header"}>
                Users table
            </div>

            <div className={"page_content"}>
                <UsersTable url={"http://localhost:8080/users"}/>
            </div>

            <div className={"page_footer"}>
                ...
            </div>
        </div>
    );
}

export default App;
