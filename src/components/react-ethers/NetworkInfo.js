import { Heading, Text } from "@chakra-ui/layout"
import { Select } from "@chakra-ui/select"
import { useWeb3 } from "react-ethers"

const NetworkInfo = () => {
  const { state, switchNetwork } = useWeb3()
  const { networkName, chainId, providerType, providerSrc, blockHeight } = state

  return (
    <>
      <Heading>Network informations</Heading>
      <Text mt="4">
        Network: {networkName}({chainId})
      </Text>
      <Text>Provider type: {providerType}</Text>
      <Text>Provider source: {providerSrc}</Text>
      <Text>Block Height: {blockHeight}</Text>
      <Select
        onChange={(e) => switchNetwork(e.target.value)}
        bg="white"
        mt="4"
        placeholder="Select a network"
      >
        <option value="0x1">Mainnet</option>
        <option value="0x4">Rinkeby</option>
        <option value="0x2a">Kovan</option>
        <option value="0x5">Goërli</option>
        <option value="0x3">Ropsten</option>
        <option value="0x89">Polygon</option>
        <option value="0x38">Binance Smart Chain</option>
        <option value="0xa86a">Avalanche</option>
      </Select>
    </>
  )
}

export default NetworkInfo
