/*
The following code is to query balance of a Hedera account using 
javascript sdk provided by Hedera Hashgraph.
*/
const {
  Client,
  AccountBalanceQuery,
} = require("@hashgraph/sdk");
require("dotenv").config();

//Grab your Hedera testnet account ID and private key from your .env file
const myAccountId = process.env.ACCOUNT1_ID;
const myPrivateKey = process.env.ACCOUNT1_PRIVATE_KEY;

async function getAccountBalance() {
  //Throw a new error if we were unable to retrieve it.
  if (myAccountId == null || myPrivateKey == null) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
  }

  // Create our connection to the Hedera network
  // The Hedera JS SDK makes this really easy!
  const client = Client.forTestnet();

  client.setOperator(myAccountId, myPrivateKey);

  //Check the new account's balance
  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(myAccountId)
    .execute(client);


  if (accountBalance) {
    console.log(`The account balance for account ${myAccountId} is ${accountBalance.hbars} HBar`);

    console.log("All account information:")
    console.log(JSON.stringify(accountBalance, null, 2))
  }
  client.close()

}

// Calling the async function at the top-level scope
getAccountBalance()

