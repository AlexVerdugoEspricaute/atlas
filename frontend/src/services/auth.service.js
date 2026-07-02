export const fetchMe = async (token) => {

    const atlasToken = localStorage.getItem("atlas_token");

    const response = await fetch("http://localhost:3000/api/me", {

        method: "GET",

        headers: {
            "Authorization": `Bearer ${atlasToken || token}`
        }

    });

    if (!response.ok) {

        const error = await response.json();
        throw error;

    }

    return await response.json();
};