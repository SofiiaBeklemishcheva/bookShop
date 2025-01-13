import React, { useState, useEffect } from 'react';
import styles from './myProfile.module.css';
import useFetchOrders from '../../hooks/useFetchOrders';

const MyProfile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const { orders, loading, error } = useFetchOrders(userData?.id); // Używamy hooka do pobrania zamówień

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.profileContainer}>
            {userData ? (
                <>
                    <h2>{userData.login}'s Profile</h2>
                    <div className={styles.userDetails}>
                        <p><strong>Login:</strong> {userData.login}</p>
                        <p><strong>Password:</strong> {userData.password}</p> {/* Hasło powinno być ukryte w prawdziwej aplikacji */}
                    </div>

                    <h3>Your Orders</h3>
                    {orders.length > 0 ? (
                        <ul>
                            {orders.map((order) => (
                                <li key={order.id}>
                                    <p><strong>Order ID:</strong> {order.id}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Amount:</strong> {order.amount}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No orders found.</p>
                    )}
                </>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default MyProfile;
