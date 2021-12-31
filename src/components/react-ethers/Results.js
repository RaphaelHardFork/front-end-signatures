import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"

const Results = ({ results }) => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Heading>Results</Heading>
        {results[0].status ? (
          <Button
          colorScheme={results[0].status?.startsWith("Failed") ? 'red':results[0].status?.startsWith("Pending") ||
          results[0].status?.startsWith("Waiting") ?'orange':'green'}
            ms="6"
            onClick={() => console.log(results)}
            disabled={
              results[0].status?.startsWith("Failed") ||
              results[0].status?.startsWith("Pending") ||
              results[0].status?.startsWith("Waiting") ||
              results[0].status?.startsWith("Success")
            }
            isLoading={
              results[0].status?.startsWith("Pending") ||
              results[0].status?.startsWith("Waiting")
            }
            loadingText={results[0].status}
          >
            {results[0].status}
          </Button>
        ) : (
          ""
        )}
      </Flex>
      <Heading mt="6" mb="4" fontSize="lg" as="h3">
        Method: {results[0].name}
      </Heading>
      {results.map((elem, index) => {
        if (index === 0) {
          return null
        }
        return (
          <Box key={elem.name}>
            <Text>
              {elem.name === "" ? "" : `${elem.name}:`} {elem.output}
            </Text>
          </Box>
        )
      })}

      {results[0].type === "signer" ? (
        <>
          <Text>Status: {results[0].status}</Text>
          {results[0].status !== "Failed" ? (
            <Text>Transcation hash: {results[0].tx?.hash}</Text>
          ) : (
            <Text>Message: {results[0].errorMessage}</Text>
          )}
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default Results
