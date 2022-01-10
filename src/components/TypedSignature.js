import { Button, Heading, Link, Text } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useWeb3 } from "react-ethers"

const TypedSignature = () => {
  const { state } = useWeb3()
  const { ethersProvider, account } = state

  const [signature, setSignature] = useState("")
  const [calldata, setCalldata] = useState("")

  async function signTypedData() {
    // function signature
    const functionSignature = ethers.utils.id("increment()").substring(0, 10)

    // function parameters
    // no parameter
    setCalldata(functionSignature)

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
      verifyingContract: "0x1844f430ddE44Cf4AdCc703F4b33F6e3AcA53A3E", // will be SetCounter.sol
    }

    const message = {
      title: "Increment the counter",
      describe: "By incrementing you will leave your address on the contract",
      from: account,
      to: "0x18479A1eD1CD6353f457de11dDBde5371175C3Be", // Counter.sol
      value: 0,
      gas: 45000,
      nonce: 1,
      data: "0xd09de08a",
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
            `["${account}", "0x18479A1eD1CD6353f457de11dDBde5371175C3Be", 0, 45000, 1, "0xd09de08a"]`
          )
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      {" "}
      <Heading fontSize="lg" as="h2" my="6">
        signTypedData_v4
      </Heading>
      <Button my="4" onClick={signTypedData}>
        Compute signature
      </Button>
      <Text>
        Paste these information on the{" "}
        <Link
          color="blue.500"
          href="https://rinkeby.etherscan.io/address/0x1844f430ddE44Cf4AdCc703F4b33F6e3AcA53A3E#writeContract"
          isExternal
        >
          contract SetCounter.sol
        </Link>
      </Text>
      <Text>Calldata: {calldata}</Text>
      <Text>Signature: {signature}</Text>
    </>
  )
}

export default TypedSignature
