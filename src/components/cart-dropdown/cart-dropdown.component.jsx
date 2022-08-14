import './cart-dropdown.styles.scss'
import  Button  from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
const CartDropDown = () =>{
    const {cartItems} = useContext(CartContext);
    const naviagte = useNavigate();

    const goToCheckoutHandler = ()=>{
      naviagte('./checkout')
    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
            {cartItems.length ? (
                cartItems.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))
              ) : (
                <span className='empty-message'>Your cart is empty</span>
              )}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropDown;