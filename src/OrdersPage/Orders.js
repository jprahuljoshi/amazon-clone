import React, { useEffect, useState } from 'react'
import './Orders.css'
import { db } from '../Firebase/firebase'
import Order from '../Order/Order'
import { useStateValue } from '../StateProvider/StateProvider'


const Orders = () => {

    const [{ basket, user }, dispatch] = useStateValue()

    const [orders, setOrders] = useState([])

    useEffect(() => {

        if (user) {
            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot((snapshot) => (
                    setOrders(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        }
        else {
            setOrders([])
        }

    }, [])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map((order) => (
                    <Order order={order}></Order>
                ))}
            </div>
        </div>
    )
}

export default Orders
