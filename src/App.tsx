import { SearchPage } from "./components/SearchPage/SearchPage";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <Layout className="layout">
                <Header className="header">
                    <h1>Users Search</h1>
                </Header>
                <Content className="content">
                    <SearchPage />
                </Content>
                <Footer className="footer"></Footer>
            </Layout>
        </div>
    );
}

export default App;
