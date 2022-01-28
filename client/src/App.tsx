import React, { useState, useEffect } from 'react'
import './App.css'
import {
    Badge,
    ChakraProvider,
    Divider,
    extendTheme,
    Heading,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Switch,
    VStack,
} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'

import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import { SliderInput } from './components/SliderInput'
import { IntroCalculate, IntroProject } from './components/Intros'

const defaultTheme = extendTheme(theme)

const initialData = {
    year: [],
    amount: [],
}

const App = () => {
    const [initialValue, setInitialValue] = useState(5000)
    const [monthlyDeposit, setMonthlyDeposit] = useState(500)
    const [interestRate, setInterestRate] = useState(10)
    const [maxYears, setmaxYears] = useState(30)
    const [ROI, setROI] = useState(0)
    const [profit, setProfit] = useState(0)
    const [projection, setProjection] = useState('0')
    const [target, setTarget] = useState('10000')
    const [data, setData] = useState(initialData)
    const [showProjection, setShowProjection] = useState(false)

    useEffect(() => {
        fetch(
            `http://localhost:3001/calculation?initial=${initialValue}&monthlyDeposit=${monthlyDeposit}&interestRate=${interestRate}&maxYears=${maxYears}`
        )
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.data)
                setROI(responseJson.data.ROI)
                setProfit(responseJson.data.profit)
            })
    }, [initialValue, monthlyDeposit, interestRate, maxYears, ROI, profit])

    useEffect(() => {
        fetch(
            `http://localhost:3001/projection?initial=${initialValue}&interestRate=${interestRate}&maxYears=${maxYears}&target=${parseFloat(
                target
            )}`
        )
            .then((response) => response.json())
            .then((responseJson) => {
                setProjection(responseJson.data.monthlyDeposit)
                // setMonthlyDeposit(responseJson.data.monthlyDeposit)
            })
    })

    const format = (val: string) => `£` + val
    const parse = (val: string) => val.replace(/^\£/, '')

    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Container pt={6} paddingBottom={'200px'} overflowY={'hidden'}>
                    <VStack>
                        <Heading size="lg" paddingBottom={2} textAlign={'center'}>
                            Finimize Compound Interest Calculator
                        </Heading>
                        <HStack paddingBottom={2}>
                            <Badge>Calculate</Badge>
                            <Switch
                                colorScheme="green"
                                onChange={() => setShowProjection(!showProjection)}
                            ></Switch>
                            <Badge>Project</Badge>
                        </HStack>
                        <Heading size="sm" marginBottom={10} textAlign={'center'}>
                            This is a Compound Interest Calculator, toggle the switch above to
                            switch modes.
                        </Heading>
                        <Badge
                            fontSize={'15px'}
                            colorScheme={showProjection ? 'green' : 'blue'}
                            borderRadius={4}
                        >
                            {showProjection ? 'Project' : 'Calculate'}
                        </Badge>
                        {showProjection ? <IntroCalculate /> : <IntroProject />}

                        <Divider />
                    </VStack>
                    <SliderInput
                        value={initialValue}
                        title="How much are you starting with?"
                        onChange={(val) => setInitialValue(val)}
                        testId="initialValueInput"
                        targets={[0, 10000]}
                        max={10000}
                        min={0}
                        unitL="£"
                        unitR=""
                        step={100}
                    />
                    {showProjection ? null : (
                        <SliderInput
                            value={monthlyDeposit}
                            title="How much can you put aside monthly?"
                            onChange={(val) => setMonthlyDeposit(val)}
                            testId="interestRateInput"
                            targets={[0, 1000]}
                            max={1000}
                            min={0}
                            unitL="£"
                            unitR=""
                            step={50}
                        />
                    )}

                    <SliderInput
                        value={interestRate}
                        title="What percentage interest rate can you get?"
                        onChange={(val) => setInterestRate(val)}
                        testId="interestRateInput"
                        targets={[0, 20]}
                        max={20}
                        min={0}
                        unitR="%"
                        step={0.5}
                    />

                    <SliderInput
                        value={maxYears}
                        title="Over How Many Years?"
                        onChange={(val) => setmaxYears(val)}
                        testId="maxYearsInput"
                        targets={[0, 60]}
                        max={60}
                        min={0}
                        unitR="years"
                    ></SliderInput>

                    {showProjection ? (
                        <>
                            <HStack justify={'center'} marginTop={5} marginBottom={10}>
                                <Heading size="sm"> Target: </Heading>
                                <NumberInput
                                    onChange={(valueString) => {
                                        setTarget(parse(valueString))
                                    }}
                                    value={format(target)}
                                    width={'120px'}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>

                                <Badge
                                    width={['180px', '200px', '250px']}
                                    textAlign={'center'}
                                    p={2}
                                    fontSize={['10px', '12px', '15px']}
                                    borderRadius={10}
                                    colorScheme="green"
                                >
                                    Deposit per Month: £{parseFloat(projection).toFixed(2)}
                                </Badge>
                            </HStack>
                            <Divider />
                        </>
                    ) : null}

                    {showProjection ? null : (
                        <LineChart
                            title="Savings Over time"
                            xAxisData={data.year}
                            yAxisData={data.amount}
                            xLabel="Years"
                            yLabel="Amount"
                        />
                    )}

                    <HStack spacing={3} mt={5} justify={'center'}>
                        {showProjection ? null : (
                            <Badge
                                width={['180px', '200px', '250px']}
                                textAlign={'center'}
                                p={2}
                                fontSize={['10px', '12px', '15px']}
                                borderRadius={10}
                                colorScheme="blue"
                            >
                                % Increase: {((ROI - 1) * 100).toFixed(1)}%
                            </Badge>
                        )}
                        {showProjection ? null : (
                            <Badge
                                width={['180px', '200px', '250px']}
                                textAlign={'center'}
                                p={2}
                                fontSize={['10px', '12px', '15px']}
                                borderRadius={10}
                                colorScheme="green"
                            >
                                Profit: £{profit?.toLocaleString('en-US')}
                            </Badge>
                        )}
                    </HStack>
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
