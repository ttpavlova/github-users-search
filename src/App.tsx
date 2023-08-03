import { useState } from "react";
import { Users } from "./types/types";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { UserList } from "./components/UserList/UserList";
import "./App.css";

function App() {
    const [users, setUsers] = useState<Users>({ total_count: 0, items: [] });

    return (
        <div className="App">
            <header className="header">
                <h1>Users Search</h1>
            </header>
            <main>
                <SearchBar setUsers={setUsers} />
                <UserList users={users} />
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
