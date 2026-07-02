export const fetchMe = async (token) => {

    const response = await fetch("http://localhost:3000/api/auth/me", {

        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    if (!response.ok) {
        const error = await response.json();
        throw error;
    }

    return await response.json();
};