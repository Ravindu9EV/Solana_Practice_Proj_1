import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";
import dotenv  from "dotenv";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
dotenv.config();
const suppliedToPubkey = process.argv[2] || null;

if(!suppliedToPubkey){
    console.log("Please provide a public key to send to");
    process.exit(1);
    
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubbkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(`✅ Loaded our own keypair, the destination public key, and connected to Solana`,);

async function transactionSOL() {
    

    const transaction = new Transaction();

    const LAMPORTS_TO_SEND = 5000;

    const sendSolInstruction = SystemProgram.transfer({

        fromPubkey: senderKeypair.publicKey,
        toPubkey,
        lamports:LAMPORTS_TO_SEND,
    });

    transaction.add(sendSolInstruction);
    try{
        
        const signature = await sendAndConfirmTransaction(connection, transaction,[
            senderKeypair,
        ]);
        console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}.`,);
        console.log(`Transaction signature is ${signature}!`);
    }catch(e){
        console.error("Error transferring SOL:",e);
        
        
    }

    

}
transactionSOL();