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

const PersonalSignature = () => {
  const { state } = useWeb3()
  const { ethersProvider, account } = state

  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState("")
  const [address, setAddress] = useState("")

  async function personal_sign() {
    setSignature(
      await ethersProvider.provider.request({
        method: "personal_sign",
        params: [message, account],
      })
    )
  }

  async function offChainRecover() {
    const hashedMessage = ethers.utils.id(
      "\x19Ethereum Signed Message:\n" + message.length + message
    )

    const address = ethers.utils.recoverAddress(hashedMessage, signature)
    setAddress(address)
  }

  return (
    <>
      <Heading fontSize="lg" as="h2" my="6">
        personal_sign
      </Heading>

      <FormControl>
        <FormLabel>Sign a custom message</FormLabel>
        <Input
          placeholder='some character like "à" are not supported'
          bg="white"
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormControl>

      <Button my="2" onClick={personal_sign}>
        Sign
      </Button>

      {signature ? (
        <>
          <Text>Message {message}</Text>
          <Text isTruncated>Signature: {signature}</Text>

          <Button my="4" onClick={offChainRecover}>
            Recover address
          </Button>

          <Button ms="4" disabled my="4" onClick={offChainRecover}>
            Recover address on-chain (go to etherscan with digest and signature)
          </Button>

          <Text fontWeight="bold">
            Address: {address ? address : 'Press "Recover address"'}
          </Text>
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default PersonalSignature
