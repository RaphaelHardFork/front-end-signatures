import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Heading, Text, Box } from "@chakra-ui/layout"

import { Select } from "@chakra-ui/select"
import { Switch } from "@chakra-ui/switch"
import { useEffect, useState } from "react"
import { useCall, useContract, useWeb3 } from "react-ethers"

const ContractInstance = ({ address, abi, name, setResults }) => {
  const contract = useContract(address, abi)
  const { status, contractCall, readContract, tx, errorMessage } = useCall()
  const { state, readNumber } = useWeb3()

  const [viewFunction, setViewFunction] = useState([])
  const [signerFunction, setSignerFunction] = useState([])
  const [functionType, setFunctionType] = useState("view")
  const [method, setMethod] = useState()
  const [params, setParams] = useState([])

  useEffect(() => {
    const view = []
    const signer = []
    for (const method of abi) {
      if (method.type === "function") {
        if (method.stateMutability === "view") {
          view.push(method)
        } else {
          signer.push(method)
        }
      }
    }
    setViewFunction(view)
    setSignerFunction(signer)
  }, [abi])

  useEffect(() => {
    if (method !== undefined) {
      const parameters = []
      for (const input of method.inputs) {
        parameters.push(input.type)
      }
      setParams(parameters)
    }
  }, [method])

  async function call(method) {
    const results = [
      {
        type: functionType,
        status: "",
        name: method.name,
        tx: "",
        errorMessage: "",
      },
    ]

    if (functionType === "view") {
      const result = await readContract(contract, method.name, params)
      if (result instanceof Array) {
        result.forEach((entry, index) => {
          if (entry?._isBigNumber) {
            results.push({
              name: method.outputs[0].components[index].name,
              output: readNumber(entry),
            })
          } else {
            results.push({
              name: method.outputs[0].components[index].name,
              output: entry,
            })
          }
        })
      } else {
        if (result?._isBigNumber) {
          console.log("big number")
          results.push({
            name: method.outputs[0].name,
            output: readNumber(result),
          })
        } else {
          results.push({
            name: method.outputs[0].name,
            output: result,
          })
        }
      }
    } else {
      results.tx = await contractCall(contract, method.name, params)
    }
    setResults(results)
  }

  useEffect(() => {
    setResults((a) =>
      a.map((elem, i) => {
        if (i === 0)
          return {
            ...elem,
            status: status,
            tx,
            errorMessage: errorMessage,
          }
        return elem
      })
    )
  }, [status, setResults, tx, errorMessage])

  return (
    <>
      <Heading>Contract: {name}</Heading>

      <FormControl my="6" display="flex" alignItems="center">
        <Switch
          me="4"
          onChange={() =>
            functionType === "view"
              ? setFunctionType("signer")
              : setFunctionType("view")
          }
          id="function-type"
        />
        <FormLabel fontSize="lg" m="0" htmlFor="function-type">
          {functionType === "view" ? "View" : "Signer"}
        </FormLabel>
      </FormControl>

      <Select
        disabled={!state.isLogged && functionType !== "view"}
        placeholder={
          !state.isLogged && functionType !== "view"
            ? "Connect a wallet"
            : "Function"
        }
        htmlFor="select"
        onChange={(e) => {
          functionType === "view"
            ? setMethod(viewFunction[e.target.value])
            : setMethod(signerFunction[e.target.value])
        }}
        my="4"
        bg="white"
      >
        {functionType === "view"
          ? viewFunction.map((method, index) => {
              return (
                <option id="select" key={method.name} value={index}>
                  {method.name}
                </option>
              )
            })
          : signerFunction.map((method, index) => {
              return (
                <option id="select" key={method.name} value={index}>
                  {method.name}
                </option>
              )
            })}
      </Select>

      {method === undefined ? (
        ""
      ) : (
        <FormControl>
          <Text>Input(s) for {method.name}</Text>
          {method.inputs.map((input, index) => {
            return (
              <Box key={input.name}>
                <FormLabel>{input.name}</FormLabel>
                <Input
                  onChange={(e) =>
                    setParams(
                      params.map((param, i) =>
                        i === index ? (param = e.target.value) : param
                      )
                    )
                  }
                  bg="white"
                  placeholder={input.type}
                />
              </Box>
            )
          })}
        </FormControl>
      )}

      <Button onClick={() => call(method)} my="4">
        {functionType === "view" ? "Read" : "Call"}
      </Button>
    </>
  )
}

export default ContractInstance
