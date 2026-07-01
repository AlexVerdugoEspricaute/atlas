const axios = require("axios");

const discoveryUrlV2 = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`;

const getAzureConfig = async () => {
    try {
        const { data } = await axios.get(discoveryUrlV2, { timeout: 5000 });
        return data;
    } catch (err) {
        throw new Error(`Failed to fetch Azure OpenID config: ${err.message}`);
    }
};

module.exports = { getAzureConfig };