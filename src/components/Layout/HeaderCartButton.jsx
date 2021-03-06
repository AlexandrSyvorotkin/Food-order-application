import React, {useEffect, useState} from 'react';
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = ({onClick}) => {
    const [btnIsHightlighted, setBtnIsHightlighted] = useState(false)
    const cartCtx = useContext(CartContext)
    const {items} = cartCtx

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${styles.button} ${btnIsHightlighted ? styles.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHightlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHightlighted(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return (
        <button onClick={onClick} className={btnClasses}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;
