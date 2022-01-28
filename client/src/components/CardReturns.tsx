import React from 'react'
import { Code, HStack, VStack } from '@chakra-ui/react'

type Props = {
    onChange: (val: number) => void
    profit: number
}

export const CardReturns = ({ onChange, profit }: Props) => {
    return (
        <VStack>
            <Code>Profit: {profit}</Code>
        </VStack>
    )
}
