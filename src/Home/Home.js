import React from 'react'
import Product from '../Product/Product'
import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <div className='home__container'>
                <img src='https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2021/desktop-1x._CB658860139_.jpg'
                    alt='amazon-bg'
                    className='home__img'></img>

                <div className='home__row'>
                    <Product id={1231}
                        title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses'
                        image='https://m.media-amazon.com/images/I/81vvgZqCskL._AC_UL320_.jpg'
                        price={521}
                        rating={4}></Product>
                    <Product id={1232}
                        title='Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey'
                        image='https://m.media-amazon.com/images/I/71L2iBSyyOL._AC_UL320_.jpg'
                        price={199900}
                        rating={4}></Product>
                    {/* Product */}
                </div>

                <div className='home__row'>
                    <Product id={123}
                        title='OnePlus 9 Pro 5G (Stellar Black, 8GB RAM, 128GB Storage)'
                        image='https://images-eu.ssl-images-amazon.com/images/I/41E5Bva7sOL._AC_SX184_.jpg'
                        price={69999}
                        rating={4}></Product>
                    <Product id={1234}
                        title='Samsung Galaxy Note10 Lite (Aura Black, 6GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers'
                        image='https://images-na.ssl-images-amazon.com/images/G/31/img21/Wireless/CatPage/6C/D20819578_WL_CatPage_NewWidget__hex_02._SY530_QL85_.jpg'
                        price={27990}
                        rating={4}></Product>
                    <Product id={1235}
                        title='Noise Colorfit Pro 2 Full Touch Control Smart Watch (Jet Black)'
                        image='https://m.media-amazon.com/images/I/6113mS+xhyL._AC_UL320_.jpg'
                        price={199900}
                        rating={4}></Product>
                </div>

                <div className='home__row'>
                    <Product id={1236}
                        title='Samsung 189 cm (75 Inches) 4K Ultra HD Smart QLED TV QA75Q80RAKXXL (Black) (2019 Model)'
                        image='https://m.media-amazon.com/images/I/81Pp+KXbrjL._AC_UL320_.jpg'
                        price={489540}
                        rating={5}></Product>
                </div>
            </div>
        </div>
    )
}

export default Home
