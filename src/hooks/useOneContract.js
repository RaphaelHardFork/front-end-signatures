import { useContext } from "react"
import { ContractsContext } from "../contexts/ContractsContext"

export const useOneContract = () => {
  const [contract] = useContext(ContractsContext)

  if (contract === undefined) {
    throw new Error(
      `It seems that you are trying to use ContractContext outside of its provider`
    )
  }

  return [contract]
}
