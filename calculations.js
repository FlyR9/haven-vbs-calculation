const axios = require('axios');
const coingeckoApiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=haven&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true";
const supplyApiUrl = "https://explorer.havenprotocol.org/api/supply";
const oracleApiUrl = "https://oracle.havenprotocol.org/";
async function fetchApiData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}: `, error.message);
        return null;
    }
}
function calculateAndRoundVBS(vbsValue) {
    const roundedValue = Math.round(vbsValue);
    return roundedValue > 10 ? 10 : roundedValue;
}
async function getVBS() {
    const xhvData = await fetchApiData(coingeckoApiUrl);
    const supplyData = await fetchApiData(supplyApiUrl);
    const oracleData = await fetchApiData(oracleApiUrl);

    if (!xhvData || !supplyData || !oracleData) {
        console.error("Failed to fetch necessary data.");
        return { vbsOffshore: 'Refreshing..', vbsOnshore: 'Resfreshing..' };
    }

    const xhvMarketCap = xhvData.haven.usd_market_cap;

    let totalAssetsMarketCap = 0;
    for (const asset in supplyData) {
        if (asset !== "XHV" && asset !== "XJPY") {
            let price;
            if (asset === "XUSD") {
                price = 1;
            } else {
                             if (!oracleData || !oracleData.pr) {
    console.error("Invalid or missing oracle data.");
   return { vbsOffshore: 'Refreshing..', vbsOnshore: 'Resfreshing..' }; 
}
                const assetKey = asset.replace("X", "x");
                if (oracleData.pr.hasOwnProperty(assetKey)) {
                    const oraclePrice = oracleData.pr[assetKey];
                    price = 10**12 / oraclePrice;
                }
            }
            const supply = parseInt(supplyData[asset]);
            const assetMarketCap = supply * price;
            totalAssetsMarketCap += assetMarketCap;
        }
    }
    const mcRatio = totalAssetsMarketCap / xhvMarketCap;
    const sqrtRatio = Math.sqrt(mcRatio);
    let vbsOffshore = sqrtRatio * 4;
    let vbsOnshore = sqrtRatio * 9;
    vbsOffshore = calculateAndRoundVBS(vbsOffshore);
    vbsOnshore = calculateAndRoundVBS(vbsOnshore);
    return { vbsOffshore, vbsOnshore };
}
module.exports = { getVBS };
async function test() {
    try {
        const result = await getVBS();
        console.log('Result:', result);
    } catch (error) {
        console.error('Error during test:', error);
    }
}
test();
