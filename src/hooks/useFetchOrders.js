import { useState, useEffect } from 'react';

const useFetchOrders = (userId) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:PORT/api/orders/${userId}`);
                const data = await response.json();

                if (data.status === 'success') {
                    setOrders(data.orders);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    return { orders, loading, error };
};

export default useFetchOrders;
