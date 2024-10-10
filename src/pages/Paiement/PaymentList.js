import { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('https://api.stripe.com/v1/payments', {
                    headers: {
                        'Authorization': 'Bearer sk_test_51PAyoKCZtwQ5P6nemOGXZ68OoeHcDYDYPo5hQlTVlDsg0VwfsDByli51MIiK5MJHrlkYvFPItX58TjKFYI7Fp6JR000Rp9OQZo',
                    },
                    params: {
                        limit: 20, // Limite le nombre de paiements retournés, ajustez selon vos besoins
                    },
                });
                setPayments(response.data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des paiements :', error.response.data.error);
            }
        };

        fetchPayments();
    }, []);
    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setValue(e.target.result);
          };
          reader.readAsText(file);
        }
      };
      const [value, setValue] = useState("");

    return (
        
        <div className="container mt-4">
                      <input type="file" onChange={onFileChange} style={{ display: "block", marginBottom: "10px" }} />

        <h2 className="mb-4">All Payments</h2>
        <div className="list-group">
            {payments.map(payment => (
                <div key={payment.id} className="list-group-item">
                    <p className="mb-1">customer: {payment.customer}</p>

                    <h5 className="mb-1">Amount: {payment.amount} {payment.currency}</h5>
                    <p className="mb-1">Status: {payment.status}</p>
                    <p className="mb-1">Payment Method: {payment.payment_method_details.type}</p>
                    <p className="mb-1">Date: {new Date(payment.created * 1000).toLocaleString()}</p>
                </div>
            ))}
        </div>
    </div>
);
};

export default PaymentList;
