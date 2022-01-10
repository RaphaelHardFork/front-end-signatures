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

```js
async function offChainRecover() {
  const hashedMessage = ethers.utils.id(
    "\x19Ethereum Signed Message:\n" + message.length + message
  )

  const address = ethers.utils.recoverAddress(hashedMessage, signature)
  setAddress(address)
}
```

## Implement the EIP-712
