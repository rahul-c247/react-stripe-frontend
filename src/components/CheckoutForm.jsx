import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';

export default function PlanForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsProcessing(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: `${window.location.origin}/paymentsuccess`,
			},
		});
		console.log('error',error);

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected error occured.');
		}

		setIsProcessing(false);
		console.log('e',e);
		console.log('res',res.json());
	};

	return (
		<form id='payment-form' onSubmit={handleSubmit}>
			<PaymentElement id='payment-element' />
			<button disabled={isProcessing || !stripe || !elements} id='submit' className='btn stripe-btn'>
				<span id='button-text'>
					{isProcessing ? 'Processing ... ' : 'Pay now'}
				</span>
			</button>
			{/* Show any error or success messages */}
			{message && <div id='payment-message'>{message}</div>}
		</form>
	);
}
