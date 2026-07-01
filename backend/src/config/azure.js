const axios = require("axios");

const tenant = process.env.AZURE_TENANT_ID;

const discoveryUrl = `https://login.microsoftonline.com/${tenant}/v2.0/.well-known/openid-configuration`;

const getAzureConfig = async () => {
    const { data } = await axios.get(discoveryUrl);
    return data;
};

module.exports = { getAzureConfig };