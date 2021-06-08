import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider/StateProvider';
import { auth } from '../Firebase/firebase';


const Header = () => {

    const [{ basket, user }, dispatch] = useStateValue()

    const displayName = (name) => {
        //console.log(name)
        return name[0][0].toUpperCase() + name[0].slice(1)
    }

    const handleAuthentication = () => {
        if (user) {
            auth.signOut()
        }
    }

    return (
        <div className='header'>
            <Link to='/'>
                <img className='header__logo'
                    src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
                    alt='amazon'></img>
            </Link>

            <div className='header__nav'>
                <RoomOutlinedIcon className='header__navIcon'></RoomOutlinedIcon>
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Hello,
                    </span>
                    <span className='header__optionLineTwo'>
                        Select your address
                    </span>
                </div>
            </div>

            <div className='header__search'>
                <input className='header__searchInput'
                    type='text'></input>
                <SearchIcon className='header__searchIcon'></SearchIcon>
            </div>

            <div className='header__nav'>
                <Link to={!user && '/login'} style={{ textDecoration: 'none' }}>
                    <div className='header__option'
                        onClick={handleAuthentication}>
                        <span className='header__optionLineOne'>
                            Hello,
                    </span>
                        <span className='header__optionLineTwo'>
                            {user ? displayName(user?.email.split('@', 1)) : 'Sign In'}
                        </span>
                    </div>
                </Link>

                <Link to='/orders' style={{ textDecoration: 'none' }}>
                    <div className='header__option'>
                        <span className='header__optionLineOne'>
                            Returns
                    </span>
                        <span className='header__optionLineTwo'>
                            & Order
                    </span>
                    </div>
                </Link>
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Your
                    </span>
                    <span className='header__optionLineTwo'>
                        Prime
                    </span>
                </div>

                <Link to='/checkout' style={{ textDecoration: 'none' }}>
                    <div className='header__optionBasket'>
                        <AddShoppingCartOutlinedIcon></AddShoppingCartOutlinedIcon>
                        <span className='header__optionLineTwo header__basketCount'>
                            {basket?.length}
                        </span>
                    </div>
                </Link>

            </div>
        </div>

    )
}

export default Header
