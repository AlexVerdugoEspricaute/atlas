import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "atlas_token";
const USER_KEY  = "atlas_user";

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem(USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });
    // true mientras AuthHandler está intercambiando el token de Azure con el backend
    const [isLoading, setIsLoading] = useState(false);
    // error de autenticación propagado desde AuthHandler
    const [authError, setAuthError] = useState("");

    const login = useCallback((newToken, newUser) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated: Boolean(token && user), isLoading, setIsLoading, authError, setAuthError, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
};
