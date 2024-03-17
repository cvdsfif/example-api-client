import React, { useEffect, useState } from 'react';
import { connectTsApi } from 'typizator-client';
import { simpleApiS } from './shared/simple-api';
import { ExampleCdkApiStack } from "./shared/cdk-exports.json";

export const App = () => {
    const api = connectTsApi(simpleApiS.metadata, {
        url: ExampleCdkApiStack.ApiURL
    })

    const [sum1, setSum1] = useState("")
    const [sum2, setSum2] = useState("")
    const [sumres, setSumres] = useState("")

    const getSumFromServer = async () =>
        setSumres(`${await api.add(
            {
                a: BigInt(sum1),
                b: BigInt(sum2)
            }
        )}`)

    useEffect(() => {
        if (isNaN(parseInt(sum1))) return
        if (isNaN(parseInt(sum2))) return
        getSumFromServer()
    }, [sum1, sum2])

    const [mul1, setMul1] = useState("")
    const [mul2, setMul2] = useState("")
    const [product, setProduct] = useState("")

    const getProductFromServer = async () =>
        setProduct(`${await api.multiply(BigInt(mul1), BigInt(mul2))}`)

    useEffect(() => {
        if (isNaN(parseInt(mul1))) return
        if (isNaN(parseInt(mul2))) return
        getProductFromServer()
    }, [mul1, mul2])

    return (<>
        <table>
            <thead>
                <tr>
                    <th>Arg 1</th><th>Arg 2</th><th>Result</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input value={sum1} onChange={e => setSum1(e.target.value)} data-testid="sum1" /></td>
                    <td><input value={sum2} onChange={e => setSum2(e.target.value)} data-testid="sum2" /></td>
                    <td><span data-testid="sumres" >{sumres}</span></td>
                </tr>
                <tr>
                    <td><input value={mul1} onChange={e => setMul1(e.target.value)} data-testid="mul1" /></td>
                    <td><input value={mul2} onChange={e => setMul2(e.target.value)} data-testid="mul2" /></td>
                    <td><span data-testid="product" >{product}</span></td>
                </tr>
            </tbody>
        </table>
    </>)
}