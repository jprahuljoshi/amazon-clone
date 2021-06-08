import React from 'react'
import './Product.css'
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from '../StateProvider/StateProvider';
import { ADD_TO_BASKET } from '../Constants/Constants';

const Product = ({ id, title, image, price, rating }) => {

    const [{ basket }, dispatch] = useStateValue()

    //console.log(basket)

    const addToBasket = () => {
        //dispatch the item into data layer
        dispatch({
            type: ADD_TO_BASKET,
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            }
        })
    }

    return (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <small>₹</small>
                    <strong>{price.toLocaleString('en-IN')}</strong>
                </p>
                <div className='product__rating'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon style={{ fill: '#ffce00' }}></StarIcon>
                        // <p>⭐</p>
                    ))}
                </div>
            </div>
            <img src={image}
                alt=''></img>
            <button onClick={addToBasket}>Add to cart</button>
        </div>
    )
}

export default Product
