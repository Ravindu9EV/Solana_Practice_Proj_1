// import { Connection, LAMPORTS_PER_SOL,PublicKey } from "@solana/web3.js";

// const publicKey = new PublicKey("2n3FYbs7eAUfjExxfvynov9bqn83cTQgH3nZfedy1Ae6") 

// const connection = new Connection("https://api.devnet.solana.com","confirmed");

// const balanceInLamports = await connection.getBalance(publicKey);

// const balanceInSOL = balanceInLamports/LAMPORTS_PER_SOL;

// console.log(`💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,);


import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];

if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
} else if (!isValidAddress(suppliedPublicKey)) {
  throw new Error("❌Invalid Address!");
}

function isValidAddress(addressW: string) {
  try {
    new PublicKey(addressW);
    return true;
  } catch (e) {
    return false;
  }
}

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
const publicKey = new PublicKey(suppliedPublicKey);
const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);
