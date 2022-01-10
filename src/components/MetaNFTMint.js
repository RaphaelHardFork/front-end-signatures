import { Button, Link, Text } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useWeb3 } from "react-ethers"

const MetaNFTMint = () => {
  const { state } = useWeb3()
  const { ethersProvider, account } = state

  const [signature, setSignature] = useState("")
  const [calldata, setCalldata] = useState("")

  async function metaMint() {
    // function signature
    const functionSignature = ethers.utils.id("mint(uint256)").substring(0, 10)

    // function parameters
    const encodedParameters = ethers.utils.defaultAbiCoder.encode(
      ["uint256"],
      ["6"]
    )

    const functionData = functionSignature + encodedParameters.slice(2)

    setCalldata(functionData)

    // create data to sign
    const domain = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ]

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
      chainId: 4,
      verifyingContract: "0x914F2BB848DA48E89439a7C05Ce71794954357f0", // will be SetCollection.sol
    }

    const message = {
      title: "Mint a NFT",
      describe: "You will have an NFT for free",
      from: account,
      to: "0xfe188A28aD0097055a05489cAe76B203F23FF9E5", // Collection.sol
      value: 0,
      gas: 200000,
      nonce: 3,
      data: functionData,
    }

    const data = JSON.stringify({
      types: { EIP712Domain: domain, ForwardRequest: forwardRequest },
      domain: domainData,
      primaryType: "ForwardRequest",
      message: message,
    })

    try {
      await ethersProvider.provider.sendAsync(
        {
          method: "eth_signTypedData_v4",
          params: [account, data],
          from: account,
        },
        (error, response) => {
          setSignature(response.result)
          setCalldata(
            `["${account}", "0xfe188A28aD0097055a05489cAe76B203F23FF9E5", 0, 200000, 3, "${functionData}"]`
          )
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Button my="4" onClick={metaMint}>
        Mint
      </Button>
      <Text>
        Paste these information on the{" "}
        <Link
          color="blue.500"
          href="https://rinkeby.etherscan.io/address/0x914F2BB848DA48E89439a7C05Ce71794954357f0#writeContract"
          isExternal
        >
          contract SetCollection.sol
        </Link>
      </Text>
      <Text>Calldata: {calldata}</Text>
      <Text>Signature: {signature}</Text>
    </>
  )
}

export default MetaNFTMint
