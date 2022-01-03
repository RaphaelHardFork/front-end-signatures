const utils = require("@metamask/eth-sig-util")
const { bufferToHex } = require("ethereumjs-util")

const SIGNATURE =
  "0x62a1b10b754dd3c4db9e4a44fa61dbab20c52eebfa94b38419b8e31a582f07b915396e91144119a563b7bbe98d31563e6282e6bd492a4753d7f30780e6b7e9811b"

const main = () => {
  const messageHashed = bufferToHex(Buffer.from("You are the best", "utf-8"))

  const address = utils.recoverPersonalSignature({
    data: messageHashed,
    signature: SIGNATURE,
  })

  console.log("Recovered address: ", address)
}

main()
