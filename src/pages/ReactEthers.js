import { Box, Flex, Heading } from "@chakra-ui/layout"
import { useState } from "react"
import { Image } from "@chakra-ui/image"
import ContractInstance from "../components/react-ethers/ContractInstance"
import CreateInstance from "../components/react-ethers/CreateInstance"
import NetworkInfo from "../components/react-ethers/NetworkInfo"
import UserInfo from "../components/react-ethers/UserInfo"
import Results from "../components/react-ethers/Results"
import Events from "../components/react-ethers/Events"
import logo from "../custom-assets/react-ethers.svg"

const ReactEthers = () => {
  const [contract, setContract] = useState({ address: "", abi: [], name: "" })
  const [results, setResults] = useState([])

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

      <Box my="10">
        <Heading textAlign="center" my="10" fontSize="50">
          React Ethers dApp
        </Heading>
        <Image mx="auto" height="30rem" alt="logo of react ethers" src={logo} />
      </Box>

      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        fontSize="lg"
      >
        <Box shadow="lg" borderRadius="20" m="6" p="8" bg="#8198e0">
          <CreateInstance setContract={setContract} />
        </Box>

        {contract.address.length !== 0 && contract.abi.length !== 0 ? (
          <Box shadow="lg" borderRadius="20" m="6" p="8" bg="#5ed0fe">
            <ContractInstance
              address={contract.address}
              abi={contract.abi}
              name={contract.name}
              setResults={setResults}
            />
          </Box>
        ) : (
          ""
        )}
      </Flex>

      <Flex justifyContent={{ base: "center", md: "start" }} fontSize="lg">
        {results.length !== 0 ? (
          <Box shadow="lg" borderRadius="20" m="6" p="8" bg="#8ada89">
            <Results results={results} />
          </Box>
        ) : (
          ""
        )}
      </Flex>

      <Flex justifyContent={{ base: "center", md: "start" }} fontSize="lg">
        {contract.address.length !== 0 && contract.abi.length !== 0 ? (
          <Box shadow="lg" borderRadius="20" m="6" p="8" bg="#ffff7a">
            <Events address={contract.address} abi={contract.abi} />
          </Box>
        ) : (
          ""
        )}
      </Flex>
    </>
  )
}
// 0xf2e881af0243479BB7E7D4c8F9A2e9D293bd0459
export default ReactEthers
