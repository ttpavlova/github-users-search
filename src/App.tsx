import { useState } from "react";
import { Users } from "./types/types";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { UserList } from "./components/UserList/UserList";
import { usePagination } from "./hooks/usePagination";
import { Pagination } from "./components/Pagination/Pagination";
import "./App.css";

function App() {
    const [users, setUsers] = useState<Users>({ total_count: 0, items: [] });

    const { page, changePage } = usePagination();

    return (
        <div className="App">
            <header className="header">
                <h1>Users Search</h1>
            </header>
            <main>
                <SearchBar setUsers={setUsers} page={page} />
                <UserList users={users} />
                <Pagination
                    page={page}
                    changePage={changePage}
                    total_count={users.total_count}
                />
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
