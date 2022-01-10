import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useWeb3 } from "react-ethers"
import MetaNFTMint from "./MetaNFTMint"
import PersonalSignature from "./PersonalSignature"
import TypedSignature from "./TypedSignature"
// import { recoverTypedSignature } from "@metamask/eth-sig-util"

const Signatures = () => {
  return (
    <>
      <Heading as="h1" my="6">
        Signatures
      </Heading>

      <Tabs>
        <TabList>
          <Tab>Personal signature</Tab>
          <Tab>Typed data signature (Counter.sol)</Tab>
          <Tab>Typed data signature (Collection.sol)</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PersonalSignature />
          </TabPanel>
          <TabPanel>
            <TypedSignature />
          </TabPanel>
          <TabPanel>
            <MetaNFTMint />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Signatures
