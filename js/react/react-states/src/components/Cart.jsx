import { useState } from "react";

const Cart = () =>
{
    const [ cart, addToCart ] = useState({});
    const toCart = ( product ) =>
    {
        addToCart({ name: product });
    }

    const removeFromCart = () =>
    {
        addToCart({});
    }
    return (
        <div>
            <hr/>
            <div className="cart">
                <p>{Object.keys(cart).length === 0 ? 'Cart is empty' : cart.name}</p>
            </div>
            <div className="actions">
                <button onClick={ () => { toCart('Samsung Galaxy') } }>
                    Add Galaxy to cart
                </button>
                <button onClick={removeFromCart}>Remove from cart</button>
            </div>
        </div>
    )
}
export default Cart;