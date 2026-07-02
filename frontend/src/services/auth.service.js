const API = "https://atlas-backend-sepia.vercel.app";

export const loginWithMicrosoft = async (id_token) => {
    const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "microsoft", id_token }),
    });

    if (!res.ok) throw await res.json();
    return res.json();
};

export const loginWithCredentials = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "local", email, password }),
    });

    if (!res.ok) throw await res.json();
    return res.json();
};

export const registerUser = async ({ email, password, first_name, last_name }) => {
    const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, first_name, last_name }),
    });

    if (!res.ok) throw await res.json();
    return res.json();
};

export const fetchMe = async (token) => {
    const res = await fetch(`${API}/api/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw await res.json();
    return res.json();
};