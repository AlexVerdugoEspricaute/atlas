import { BrowserRouter } from "react-router-dom";
import AuthHandler from "@/components/auth/AuthHandler";
import AppRouter from "@/routes/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <AuthHandler />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
