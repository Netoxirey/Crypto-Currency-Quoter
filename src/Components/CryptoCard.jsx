import React from 'react'
import { CryptoContext } from '../Context/CryptoContext'
import { useContext } from 'react'
import styled from '@emotion/styled'

const Card = styled.div `
font-size: 20px;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
`
const Img= styled.img `
width: 100%;
object-fit: contain;
`

const Span = styled.span `
font-weight: bold;
`
const CryptoCard = () => {

    const {displayData} = useContext(CryptoContext)

  return (
    <div>
        {displayData? <Card>
            <div>
            <Img src={`https://www.cryptocompare.com/${displayData.image}`} alt="crypto logo" />
            </div>
            <div>
            <p>Name: <Span>{displayData.name}</Span></p>
            <p>Price: <Span>{displayData.price}</Span></p>
            <p>LastUpdate: <Span>{displayData.lastUpdate}</Span></p>
            <p>Higher Price Today: <Span>{displayData.higherPrice}</Span></p>
            <p>Lower Price Today: <Span>{displayData.lowerPrice}</Span></p>
            <p>24-Hour Price Change: <Span>{displayData.changue}</Span></p>
            </div>
         
        </Card>: 'cargando'}

    </div>
  )
}

export default CryptoCard