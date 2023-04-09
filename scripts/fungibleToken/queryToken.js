const {
    TransferTransaction,
    Client,
    TokenAssociateTransaction,
    Wallet,
    TokenInfoQuery,
    PrivateKey

} = require("@hashgraph/sdk");
// Loads environment variables from a .env file into process.env object using the dotenv package.

require('dotenv').config();

// Configure the treasury account
const treasuryAccountId = process.env.ACCOUNT1_ID;
const treasuryPrivateKey = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY);

const tokenId = process.env.TOKEN_ID;

//Setting-up the client to interact with Hedera Test Network
const client = Client.forTestnet();

client.setOperator(treasuryAccountId, treasuryPrivateKey);

//Throw a new error if we were unable to retrieve it.
if (treasuryAccountId == null ||
    treasuryPrivateKey == null) {
    throw new Error("Environment variables treasuryAccountId and treasuryPrivateKey must be present");
}

// async function main() {
//     //Create the query
//     const tokenInfo = await new TokenInfoQuery()
//         .setTokenId(tokenId);

//     //Sign with the client operator private key, submit the query to the network and get the token supply
//     tokenInfo = await new tokenInfo.execute(client);
//     const { totalSupply, pauseKey, pauseStatus } = tokenInfo;

//     // console.log(`The total supply of token ID ${tokenId} is: ${tokenSupply}`);

//     // Check if the token is paused
//     // const isPaused = response.isPaused();
//     console.log(`\n - The status for the token with ID ${tokenId} is : \n - Token supply: ${totalSupply} \n - Pause key: ${pauseKey} \n - Is paused: ${pauseStatus}`);

//     // console.log(`The status for the token with ID: ${tokenId} is ${isPaused ? "paused" : "not paused"}`);
//     //v2.0.7
//     process.exit();
// }

async function main() {
    const tokenInfo = await new TokenInfoQuery().setTokenId(tokenId).execute(client);
    const { totalSupply, pauseKey, pauseStatus } = tokenInfo;

    console.log(`\n - The status for the token with ID ${tokenId} is : \n - Token supply: ${totalSupply} \n - Pause key: ${pauseKey} \n - Is paused: ${pauseStatus}`);

    process.exit();
}


main()