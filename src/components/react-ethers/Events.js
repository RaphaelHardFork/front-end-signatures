import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useContract, useWeb3 } from "react-ethers"

const Events = ({ address, abi }) => {
  const contract = useContract(address, abi)
  const { readNumber } = useWeb3()
  const [eventsList, setEventsList] = useState([])
  const [method, setMethod] = useState()
  const [params, setParams] = useState([])
  const [inputs, setInputs] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (method !== undefined) {
      const listInput = []
      const params = []
      for (const input of method.inputs) {
        listInput.push(input)
        if (input.indexed) {
          params.push(null)
        }
      }
      setParams(params)
      setInputs(listInput)
    }
  }, [method])

  useEffect(() => {
    const events = []
    for (const method of abi) {
      if (method.type === "event") {
        events.push(method)
      }
    }

    setEventsList(events)
  }, [abi])

  async function search(method) {
    let filter
    switch (params.length) {
      case 0:
        filter = contract.filters[method.name]()
        break
      case 1:
        filter = contract.filters[method.name](params[0])
        break
      case 2:
        filter = contract.filters[method.name](params[0], params[1])
        break
      case 3:
        filter = contract.filters[method.name](params[0], params[1], params[2])
        break
      default:
        throw new Error(`Wrong number of parameters for EVENTS`)
    }

    let eventArray = await contract.queryFilter(filter)
    setHistory(eventArray)
  }

  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between">
        <Box>
          <Heading mb="6">Events</Heading>

          <Button onClick={() => search(method)}>Search</Button>

          <Select
            my="4"
            bg="white"
            placeholder="Events"
            onChange={(e) => {
              setHistory([])
              setInputs([])
              setParams([])
              setMethod(eventsList[e.target.value])
            }}
          >
            {eventsList.map((elem, index) => {
              return (
                <option key={elem.name} value={index} my="2">
                  {elem.name}
                </option>
              )
            })}
          </Select>

          {method !== undefined ? (
            <FormControl>
              {inputs
                .filter((input) => input.indexed)
                .map((input, index) => {
                  if (!input.indexed) return null
                  return (
                    <Box key={input.name}>
                      <FormLabel>{input.name}</FormLabel>
                      <Input
                        onChange={(e) =>
                          setParams(
                            params.map((param, i) => {
                              if (i === index) {
                                if (input.type.startsWith("uint256")) {
                                  return `0x${Number(e.target.value).toString(
                                    16
                                  )}`
                                } else {
                                  return e.target.value
                                }
                              } else {
                                return param
                              }
                            })
                          )
                        }
                        bg="white"
                        placeholder={input.type}
                        type={input.type.startsWith("uint") ? "number" : "text"}
                      />
                    </Box>
                  )
                })}
            </FormControl>
          ) : (
            ""
          )}
        </Box>

        {history.length !== 0 ? (
          <Box>
            <Heading>Passed events</Heading>
            {history.map((elem, i) => {
              return (
                <Box
                  bg="white"
                  borderRadius="10"
                  p="4"
                  m="4"
                  key={elem.blockNumber + i}
                >
                  <Text>{elem.transactionHash}</Text>
                  {elem.args.map((arg, index) => {
                    if (arg instanceof Array) {
                      return arg.map((elem, index) => {
                        return (
                          <Box key={index}>
                            <Text>
                              {elem?._isBigNumber ? readNumber(elem) : elem}
                            </Text>
                          </Box>
                        )
                      })
                    } else {
                      // is an Array?
                      return (
                        <Box key={arg.name}>
                          <Text>
                            {inputs[index].name}:{" "}
                            {arg?._isBigNumber ? readNumber(arg) : arg}
                          </Text>
                        </Box>
                      )
                    }
                  })}
                </Box>
              )
            })}
          </Box>
        ) : (
          ""
        )}
      </Flex>
    </>
  )
}

export default Events
