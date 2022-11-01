import web3 from "../Web3Client";
import voteabi from "../contracts/VoteABI.json";

const instance = new web3.eth.Contract(
  voteabi,
  "0x79c9407ea71cb6a8d9decf1ffcf366f925a13933"
);

export default instance;