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
const CryptoCard = () => {

    const {displayData} = useContext(CryptoContext)

  return (
    <div>
        {displayData? <Card>
            <div>
            <Img src={`https://www.cryptocompare.com/${displayData.image}`} alt="crypto logo" />
            </div>
            <div>
            <p>Name: {displayData.name}</p>
            <p>Price: {displayData.price}</p>
            <p>LastUpdate: {displayData.lastUpdate}</p>
            <p>Higher Price Today: {displayData.higherPrice}</p>
            <p>Lower Price Today: {displayData.lowerPrice}</p>
            <p>24-Hour Price Change: {displayData.changue}</p>
            </div>
         
        </Card>: 'cargando'}

    </div>
  )
}

export default CryptoCard