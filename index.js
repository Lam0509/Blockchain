const { ethers, formatEther, Interface, AbiCoder } = require("ethers");
const fs = require("fs");
const testAbi = require("./test-abi.json");

async function main() {
  try {
    const provider = new ethers.JsonRpcProvider();

    const signer = await provider.getSigner();

    const blocks = await provider.getBlockNumber();

    const balance = await provider.getBalance(signer.address);

    const defaultAbi = fs.readFileSync("./Voting_sol_Voting.abi").toString();

    console.log("====================================");
    console.log(formatEther(balance));
    console.log("====================================");

    console.log("====================================");
    console.log(blocks);
    console.log("====================================");

    // const contract = new ethers.Contract(
    //   "0x4462ef8bb0d8b1f0b00ea46e9ca66cbca9b16127",
    //   defaultAbi,
    //   signer
    // );

    // const address = await contract.getAddress();

    // console.log("====================================");
    // console.log(address);
    // console.log("====================================");

    // await contract
    //   .voteForCandidate(ethers.encodeBytes32String("Rama"))
    //   .then((f) => console.log(f));

    // await contract
    //   .totalVotesFor(ethers.encodeBytes32String("Rama"))
    //   .then((f) => {
    //     console.log("====================================");
    //     console.log(f);
    //     console.log("====================================");
    //   });

    const contract = new ethers.Contract(
      "0xEBB9A921F6b30C684a4bFAD772e897c13D469967",
      testAbi,
      signer
    );

    await contract.getValue().then((f) => {
      console.log("====================================");
      console.log(f);
      console.log("====================================");
    });

    // await contract.addValue().then((f) => {
    //   console.log("====================================");
    //   console.log(f);
    //   console.log("====================================");

    //   const value = parseInt(f.data, 16);

    //   console.log("====================================");
    //   console.log(value);
    //   console.log("====================================");
    // });

    const res = await contract.addValue();

    const contractInterface = new ethers.Interface(testAbi);

    const parseData = contractInterface.decodeFunctionResult(
      "addValue",
      res.data.toString()
    );

    console.log("====================================");
    console.log(parseData);
    console.log("====================================");
  } catch (e) {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
  }
}

main();
