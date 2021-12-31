import { Button } from "@chakra-ui/button"
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import { Input, InputGroup } from "@chakra-ui/input"
import { Flex, Heading, Text } from "@chakra-ui/layout"
import { useRef, useState } from "react"

const CreateInstance = ({ setContract }) => {
  const [address, setAddress] = useState("")
  const [file, setFile] = useState("")
  const [abi, setAbi] = useState(null)
  const [name, setName] = useState("unknown")

  const inputRef = useRef(null)

  function addFile(e) {
    if (e.target.files[0].type !== "application/json") {
      setFile("This is not a JSON file")
    } else {
      const reader = new FileReader()
      reader.readAsText(e.target.files[0], "utf-8")
      reader.onload = (e) => {
        const abi = JSON.parse(e.target.result).abi
        const contractName = JSON.parse(e.target.result).contractName
        if (abi !== undefined) {
          setAbi(abi)
        }
        if (contractName !== undefined) {
          setName(contractName)
        }
      }
      setFile(e.target.files[0])
    }
  }

  async function createInstance() {
    setContract({ address, abi, name })
  }

  return (
    <>
      <Heading>Create a contract instance</Heading>

      <FormControl mt="4" id="email">
        <FormLabel fontSize="lg">Contract address</FormLabel>
        <Input
          onChange={(e) => {
            setAddress(e.target.value)
          }}
          bg="white"
          placeholder="0x00000..."
          type="text"
        />
        <FormHelperText color="#444444">
          Should be a JSON file a key "abi"
        </FormHelperText>
      </FormControl>

      <InputGroup mt="8">
        <input
          onChange={addFile}
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
        />
        <Flex mb="4" alignItems="center">
          <Button
            display="flex"
            me="4"
            onClick={() => inputRef.current.click()}
            aria-label="choose a json file to upload button"
          >
            Choose a file
          </Button>
          <Text>
            {typeof file === "string"
              ? file
              : abi === null
              ? `${file.name} not contain an ABI`
              : file.name}
          </Text>
        </Flex>
      </InputGroup>

      <Button
        onClick={createInstance}
        disabled={abi === null || address.length !== 42}
      >
        Create instance
      </Button>
    </>
  )
}

export default CreateInstance
