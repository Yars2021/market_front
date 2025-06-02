import './App.css';
import UsersTable from "./components/UsersTable";

function App() {
    return (
        <div className={"main_page"}>
            <UsersTable url={"http://localhost:8080/users"} initialTable={[]} errHandler={() => {}}/>
        </div>
    );
}

export default App;
