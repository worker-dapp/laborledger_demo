import { ethers } from "ethers";
import GPSBasedPaymentABI from "./GPSBasedPayment.json";  // Make sure this is in `src/contracts/`
import GPSOracleABI from "./GPSOracle.json";  // Make sure this is in `src/contracts/`

const contractAddress = "0xE7B08F308BfBF36c752d1376C32914791ecA8514"; // Replace with your contract
const oracleAddress = "0xB420dDcE21dA14AF756e418984018c5cFAC62Ded"; // Replace with actual deployed Oracle address

export const getBlockchainContracts = async () => {
  if (!window.ethereum) {
    alert("Please install Metamask!");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const paymentContract = new ethers.Contract(contractAddress, GPSBasedPaymentABI, signer);
  const oracleContract = new ethers.Contract(oracleAddress, GPSOracleABI, signer);

  return { paymentContract, oracleContract, provider, signer };
};
