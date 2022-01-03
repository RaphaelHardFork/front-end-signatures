# Signature and meta-transactions

## Use `personal_sign`

This method create signature that can be useful off-chain, to verify that an user own a private key. For login purpose for instance. But this should not be used on-chain for smart contract.

### Create a signature from a message

```js
const signature = await ethersProvider.provider.request({
  method: "personal_sign",
  params: [message, account],
})
```

### Recover public key of the signer

Code not integrated in the front due to Webpack5 (polyfill) errors with `@metamask/eth-sig-util`

```js
const utils = require("@metamask/eth-sig-util")
const { bufferToHex } = require("ethereumjs-util")

const SIGNATURE =
  "0x843c3478273d06b71c2e389b87766bd982af699cf8afe66afb81e3468374fb2f3b034d7caa68afa4549b7ec4039f4233411df6eb2df8140a678b4a1bd13049d41c"

const main = () => {
  const messageHashed = bufferToHex(Buffer.from("hello", "utf-8"))

  const address = utils.recoverPersonalSignature({
    data: messageHashed,
    signature: SIGNATURE,
  })
  console.log("Recovered address: ", address)
}

main()
```

## Implement the EIP-712
