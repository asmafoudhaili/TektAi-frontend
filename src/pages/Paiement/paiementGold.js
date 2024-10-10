import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { NioButton } from '../../components';


const stripePromise = loadStripe('pk_test_51PAyoKCZtwQ5P6ne6Yujxzj6YPH9wJRttPFbWKvWvlRzxfysMb1IqJzVP8to1o7mjp6aHunEU8RmZ5ym4Uleo3AK005GAGoR16');

const createCheckoutSession = async () => {
    try {
        const response = await axios.post('https://api.stripe.com/v1/checkout/sessions', {
            line_items: [{ price: 'price_1PBwljCZtwQ5P6neXYNc5P19', quantity: 1 }],
            mode: 'subscription', // Utiliser le mode d'abonnement
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/',
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer sk_test_51PAyoKCZtwQ5P6nemOGXZ68OoeHcDYDYPo5hQlTVlDsg0VwfsDByli51MIiK5MJHrlkYvFPItX58TjKFYI7Fp6JR000Rp9OQZo',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de la session de paiement :', error.response.data.error);
        throw error;
    }
};

const handleClick = async () => {
    try {
        const sessionData = await createCheckoutSession();
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({ sessionId: sessionData.id });

        if (result.error) {
            console.error('Erreur lors de la redirection vers le paiement :', result.error);
        }
    } catch (error) {
        console.error('Erreur lors de la gestion de l\'événement de clic :', error);
    }
};

const PaymentButtonGold = () => {
    return (
        <div className="pt-4">

        <NioButton onClick={handleClick} className="btn-block btn-outline-primary" label="Get Started" />
        </div>

    );
};

export default PaymentButtonGold;
