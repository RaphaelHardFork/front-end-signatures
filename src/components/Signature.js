import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useWeb3 } from "react-ethers"

const Signature = () => {
  const { state } = useWeb3()
  const { ethersProvider, account } = state
  // sign a message with a text and get the signature
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState("")

  async function sign() {
    setSignature(
      await ethersProvider.provider.request({
        method: "personal_sign",
        params: [message, account],
      })
    )
  }

  async function recover() {}

  return (
    <>
      <Heading as="h1" my="6">
        Signatures
      </Heading>
      <Heading fontSize="lg" as="h2" my="6">
        personal_sign
      </Heading>
      <FormControl>
        <FormLabel>Sign a custom message</FormLabel>
        <Input onChange={(e) => setMessage(e.target.value)} />
      </FormControl>
      <Button my="2" onClick={sign}>
        Sign
      </Button>
      {signature ? (
        <>
          {" "}
          <Text>Message {message}</Text> <Text>Signature: {signature}</Text>
          <Button disabled onClick={recover}>
            Recover address
          </Button>
          <Text fontWeight="bold">
            use the file recover.js to get the public key
          </Text>
        </>
      ) : (
        ""
      )}

      <Heading fontSize="lg" as="h2" my="6">
        signTypedData_v4
      </Heading>
    </>
  )
}

export default Signature
