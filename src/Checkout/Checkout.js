import React from 'react'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import { useStateValue } from '../StateProvider/StateProvider'
import Subtotal from '../Subtotal/Subtotal'
import './Checkout.css'

const Checkout = () => {

    const [{ basket, user }, dispatch] = useStateValue()

    const displayName = (name) => {
        //console.log(name)
        return name[0][0].toUpperCase() + name[0].slice(1)
    }

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img className='checkout__ad'
                    src='https://images-eu.ssl-images-amazon.com/images/G/31/img20/Vernac13th/1500x150_V2_Eng._CB412582591_.jpg'
                    alt='banner'>
                </img>

                <div className='checkout__title'>
                    <h3>Hi, {user ? displayName(user?.email.split('@', 1)) : 'Guest'}</h3>
                    <h1>Shopping Cart</h1>

                    {basket.map((item) => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        ></CheckoutProduct>
                    ))}

                </div>
            </div>

            <div className='checkout__right'>
                <Subtotal></Subtotal>
            </div>

        </div>
    )
}

export default Checkout
