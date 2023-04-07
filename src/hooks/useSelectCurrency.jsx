import styled from '@emotion/styled'
import React from 'react'
import { useState } from 'react'

const useSelectCurrency = (label,options) => {

const [state, setState] = useState('')
    
    const Label = styled.label `
        color: #fff;
        display: block;
        font-size: 26px;
        font-weight: bold;
    `
    const Select = styled.select `
        background-color: rgb(0,0,33);
        color: #fff;
        width: 90%;
        padding: 10px;
        border: 2px solid ;
        border-radius: 5px;
        text-align: center;
        font-size: 15px;

        &:hover {
            cursor: pointer;
        }
    `

    const SelectCurrency = () => (

        <>
            <Label>{label}</Label>
            <Select 
             value={state}
            onChange={e => setState(e.target.value)}
            >
                <option value="">--Select--</option>
                {options.map((option)=> (
                    <option
                    key={option.id}
                    value={option.id}
                    > {option.name}</option>
                ))}
            </Select>
        </>
    )

    return [ state, SelectCurrency]
}

export default useSelectCurrency