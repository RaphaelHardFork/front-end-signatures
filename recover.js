const utils = require("@metamask/eth-sig-util")
const { bufferToHex } = require("ethereumjs-util")

const SIGNATURE =
  "0xef90d3f6adc8b1cdce714d64abe855158c19b0e859ce0a3067f68e0773bf8a46498380d00de91ae00a854050e93366059136d251d13f5a9b0e380c8a63a96ff21b"

const domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
  { name: "salt", type: "bytes32" },
]

/*
const person = [
  { name: "number", type: "uint256" },
  { name: "wallet", type: "address" },
]
*/

const forwardRequest = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" },
]

const domainData = {
  name: "MinimalForwarder",
  version: "0.0.1",
  chainId: 0x4,
  verifyingContract: "0x1844f430ddE44Cf4AdCc703F4b33F6e3AcA53A3E", // will be SetCounter.sol
  salt: "0x2",
}

const message = {
  from: "0x3eB876042A00685c75Cfe1fa2Ee496615e3aef8b",
  to: "0x18479A1eD1CD6353f457de11dDBde5371175C3Be",
  value: 0x0,
  gas: 0x90000,
  nonce: 0x0,
  data: "0xd09de08a",
}

const data = {
  types: { EIP712Domain: domain, ForwardRequest: forwardRequest },
  domain: domainData,
  primaryType: "ForwardRequest",
  message: message,
}

const main = () => {
  // personal signature
  const messageHashed = bufferToHex(Buffer.from("You are the best", "utf-8"))
  const address = utils.recoverPersonalSignature({
    data: messageHashed,
    signature: SIGNATURE,
  })
  console.log("Recovered address (personal sign): ", address)

  // typedSignature => works !
  const signedRecover = utils.recoverTypedSignature({
    data,
    signature: SIGNATURE,
    version: "V4",
  })

  console.log("Recovered address (typed data): ", signedRecover)
}

main()
