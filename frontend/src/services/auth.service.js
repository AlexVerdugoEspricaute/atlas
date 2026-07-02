export const fetchMe = async (token) => {

    console.log("[FRONTEND] Sending token:", token.substring(0,20) + "...");

    const response = await fetch("http://localhost:3000/api/me", {

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