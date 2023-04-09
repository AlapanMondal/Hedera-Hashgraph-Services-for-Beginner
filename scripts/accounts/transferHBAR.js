/*
The following code is to transfer HBAR using 
javascript sdk provided by Hedera Hashgraph.

USE THIS CODE ONLY IF YOU WANT TO TRANSFER HBAR 
FROM ONE ACCOUNT TO ANOTHER ACCOUNT.
*/

const {
    Client,
    AccountBalanceQuery,
    TransferTransaction,
    Hbar
} = require("@hashgraph/sdk");

// Reading the environment variables
console.log(`- Reading the environment variables 👀👀`);
require("dotenv").config();
console.log(`- Read the environment variables`);

// Getting the sender account ID and private key from the .env file
const senderAccountId = process.env.PORTAL_ACCOUNT_ID;
const senderPrivateKey = process.env.PORTAL_ACCOUNT_PRIVATE_KEY;

//Checking if the accounts and private key exist
if (senderAccountId == null || senderPrivateKey == null) {
    throw new Error("The environment variables senderAccountId and senderPrivateKey are missing or having issue getting the variables");
}
// Getting the receiver account ID from the .env file
const receiverAccountId = process.env.ACCOUNT5_ID;

//Checking if the accounts and private key exist
if (receiverAccountId == null) {
    throw new Error("The environment variable receiverAccountId is missing or having issue getting the variables");
}

// Creating connection to the Hedera thest network
console.log(`Connecting the Client to Hedera Testnet 👀👀`);
const client = Client.forTestnet();
console.log(`====================================🥳CONNECTED🥳==================================`);
console.log(``);

// Setting sender account as the client
client.setOperator(senderAccountId, senderPrivateKey);

//Defining the function to transfer HBar
async function transferHBar() {

    //specify the ammount of HBar need to be transferred
    var transferAmmount = 50

    const transaction = new TransferTransaction()
        .addHbarTransfer(senderAccountId, new Hbar(-transferAmmount))
        .addHbarTransfer(receiverAccountId, new Hbar(transferAmmount));

    console.log(`💸💸💸💸💸💸💸💸💸💸 Transfering ${transferAmmount}HBAR from ${senderAccountId} >>>>>>>>>>>>>>> to ${receiverAccountId} 💸💸💸💸💸💸💸💸💸💸`);

    // Sign with the client operator key and submit the transaction to a Hedera network
    const txId = await transaction.execute(client);


    // Request the receipt of the transaction
    const receipt = await txId.getReceipt(client);

    // Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log(``);
    console.log(`- The transaction consensus status is: ${transactionStatus}`);
    console.log(`Transaction ID: ${txId.transactionId.toString()}`); // Print the transaction ID

    // Creating the queries
    const querySender = new AccountBalanceQuery().setAccountId(senderAccountId);
    const queryReceiver = new AccountBalanceQuery().setAccountId(receiverAccountId);

    const senderAccountBalance = await querySender.execute(client);
    const receiverAccountBalance = await queryReceiver.execute(client);
    console.log(``);
    console.log(`- Sender account balance: ${senderAccountBalance.hbars} HBar 💰\n- Receiver account balance: ${receiverAccountBalance.hbars} HBar 💰`);

    client.close()
}

// Calling the async function at the top-level scope
transferHBar();
