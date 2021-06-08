import React from 'react'
import './CheckoutProduct.css'
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from '../StateProvider/StateProvider';
import { REMOVE_FROM_BASKET } from '../Constants/Constants'


const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {

    const [{ basket }, dispatch] = useStateValue()

    const removeFromBasket = () => {
        //Remove the item from basket
        dispatch({
            type: REMOVE_FROM_BASKET,
            id: id,
        })
    }

    return (
        <div className='checkoutProduct'>
            <div className='checkoutProduct__imageContainer'>
                <img className='checkoutProduct__image' src={image} alt=''></img>
            </div>

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>₹</small>
                    <strong>{price.toLocaleString('en-IN')}</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon style={{ fill: '#ffce00' }}></StarIcon>
                    ))}
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from cart</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
