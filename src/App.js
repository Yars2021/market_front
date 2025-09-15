import './App.css';
import UsersTable from "./components/UsersTable";
п
function App() {
    return (
        <div className={"main_page"}>
            <UsersTable url={process.env.REACT_APP_API_URL + "/users"} initialTable={[]} errHandler={() => {}}/>
        </div>
    );
}

export default App;
