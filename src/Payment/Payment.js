import React, { useEffect, useState } from 'react'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import { useStateValue } from '../StateProvider/StateProvider'
import { Link, useHistory } from 'react-router-dom'
import './Payment.css'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../Reducer/Reducer'
import axios from '../Axios/axios'
import { EMPTY_BASKET } from '../Constants/Constants'
import { db } from '../Firebase/firebase'

const Payment = () => {

    const [{ basket, user }, dispatch] = useStateValue()

    const history = useHistory()

    const stripe = useStripe()
    const elements = useElements()

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in a currencies sub-units
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })

            setClientSecret(response.data.clientSecret)

        }

        getClientSecret()

    }, [basket])

    // console.log('THE SECRET IS >>>>', clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntend = payment confirmation

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: EMPTY_BASKET
            })

            history.replace('/orders')
        })
    }

    const handleChange = (event) => {
        //Listen for the changes in the CardElement
        // and display any errors as the customer type their card details

        setDisabled(event.empty)
        setError(event.error ? event.error.message : '')
    }

    return (
        <div className='payment'>
            <div className='payment__container'>

                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
                </h1>

                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Bangalore, India</p>
                    </div>
                </div>

                {/* Payment section - Review items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map((item) => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}></CheckoutProduct>
                        ))}
                    </div>
                </div>

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* Stripe */}

                        <form onSubmit={handleSubmit}>
                            <p>Card details:</p>
                            <CardElement onChange={handleChange}></CardElement>

                            <p>Name on card:</p>
                            <input type='text'></input>

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (

                                        <h3>Order Total: {value}</h3>

                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    thousandSpacing={'2s'}
                                    prefix={'₹'}
                                ></CurrencyFormat>

                                <button disabled={processing || disabled || succeeded}>
                                    <span>
                                        {processing ? <p>Processing</p> : 'Buy Now'}
                                    </span>
                                </button>
                            </div>

                            {/* error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
