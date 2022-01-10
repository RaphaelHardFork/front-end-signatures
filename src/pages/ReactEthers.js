import { Box, Flex } from "@chakra-ui/layout"
import { useWeb3 } from "react-ethers"
import NetworkInfo from "../components/react-ethers/NetworkInfo"
import UserInfo from "../components/react-ethers/UserInfo"
import Signatures from "../components/Signature"

const ReactEthers = () => {
  const { state } = useWeb3()
  const { isLogged } = state

  return (
    <>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        fontSize="lg"
      >
        <Box shadow="lg" borderRadius="20" m="6" p="8" bg="#ffa793">
          <UserInfo />
        </Box>
        <Box shadow="lg" borderRadius="20" m="6" p="8" bg="#c082c9">
          <NetworkInfo />
        </Box>
      </Flex>

      <Box shadow="lg" borderRadius="20" m="6" p="8" bg="#aeaeae">
        {isLogged ? <Signatures /> : ""}
      </Box>
    </>
  )
}

export default ReactEthers
