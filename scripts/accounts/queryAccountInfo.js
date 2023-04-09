/*
The following code is to query information of a Hedera account using 
javascript sdk provided by Hedera Hashgraph.
*/
const {
    Client,
    AccountInfoQuery,
} = require("@hashgraph/sdk");
require("dotenv").config();

//Grab your Hedera testnet account ID and private key from your .env file
const myAccountId = process.env.ACCOUNT1_ID;
const myPrivateKey = process.env.ACCOUNT1_PRIVATE_KEY;

async function accountInfoQuery() {
    //Throw a new error if we were unable to retrieve it.
    if (myAccountId == null || myPrivateKey == null) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }

    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    //Check the new account's balance
    const getAccountInformation = await new AccountInfoQuery()
        .setAccountId(myAccountId)

    // Sign with client operator private key and submit the query to a Hedera network
    const accountInfo = await getAccountInformation.execute(client);

    if (accountInfo) {
        console.log("All account Info:")
        console.log(JSON.stringify(accountInfo, null, 2)); //JSON.stringify() method to convert the accountInfo object to a JSON string with indentation.
    }
    client.close()

}

accountInfoQuery()

