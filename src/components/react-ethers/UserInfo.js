import { Button } from "@chakra-ui/button"
import { Heading, Text } from "@chakra-ui/layout"
import { useWeb3 } from "react-ethers"
import Signature from "../Signature"

const UserInfo = () => {
  const { state, readNumber, connectToMetamask, wcConnect } = useWeb3()
  const { account, balance, isLogged } = state

  return (
    <>
      <Heading>User informations</Heading>
      <Text mt="4">Address: {account}</Text>
      <Text>Balance: {readNumber(balance, 18)} ETH</Text>
      {isLogged ? (
        ""
      ) : (
        <>
          <Button me="4" onClick={connectToMetamask}>
            Connect metamask
          </Button>
          <Button onClick={wcConnect}>Connect with Wallet Connect</Button>
        </>
      )}
      {isLogged ? <Signature /> : ""}
    </>
  )
}

export default UserInfo
