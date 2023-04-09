const {
    TransferTransaction,
    Client,
    ScheduleCreateTransaction,
    PrivateKey,
    Hbar
} = require("@hashgraph/sdk");
// Loads environment variables from a .env file into process.env object using the dotenv package.

require('dotenv').config();

const myAccountId = process.env.ACCOUNT1_ID;
const myPrivateKey = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY);

const otherAccountId = process.env.ACCOUNT1_ID;
const otherAccountId2 = process.env.ACCOUNT2_ID;


if (myAccountId == null ||
    myPrivateKey == null) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}


const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {

    //Create a transaction to schedule
    const transaction = new TransferTransaction()
        .addHbarTransfer(otherAccountId, Hbar.fromTinybars(-100))
        .addHbarTransfer(otherAccountId2, Hbar.fromTinybars(100));

    //Schedule a transaction
    const scheduleTransaction = await new ScheduleCreateTransaction()
        .setScheduledTransaction(transaction)
        .setScheduleMemo("Scheduled Transactions")
        .setAdminKey(myPrivateKey)
        .execute(client);

    //Get the receipt of the transaction
    const receipt = await scheduleTransaction.getReceipt(client);

    //Get the schedule ID
    const scheduleId = receipt.scheduleId;
    console.log("The schedule ID is " + scheduleId);

    console.log(`============================================================`);
    console.log(`The schedule txn info: ${JSON.stringify(receipt, null, 2)}`);
    
    // converting the scheduleTransactionId into bytes
    const scheduledTxBytes = Buffer.from(scheduleTransaction.transactionId.toString(), 'utf8');
    console.info('The serialized scheduled transaction is:' + scheduledTxBytes);

    // converting scheduledTxBytes into base64  
    const scheduledTxBase64 = scheduledTxBytes.toString('base64');
    console.info("The scheduled transaction in base64 is: " + scheduledTxBase64);

    process.exit();

}

// The async function is being called in the top-level scope.
main();
