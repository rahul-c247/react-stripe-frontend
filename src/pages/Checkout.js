import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import AddressForm from '../components/AddressForm';
import Header from '../components/Header';
import Container from '../components/common/Container';

function Payment(props) {
	/* const [stripePromise, setStripePromise] = useState(null); */
	const [clientSecret, setClientSecret] = useState('');
	const [products,setProducts] = useState([])

	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

	/* useEffect(() => {
		fetch('http://localhost:8001/v1/stripe/config').then(async (r) => {
			const { publishableKey } = await r.json();
			setStripePromise(loadStripe(publishableKey));
		});
	}, []); */

	useEffect(() => {
		/* setProducts(details) */
		const details = JSON.parse(localStorage.getItem('productDetails'));
		const customerEmail = JSON.parse(localStorage.getItem('gmailLogin'));
		const amount = details.price.toString().split(".")

		fetch('http://localhost:8001/v1/stripe/create-payment-intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				price:`${amount.length === 1 ? `${amount}00` : `${amount[0]}${amount[1]}`}`,
				currency:'usd',
				description:`${details.title} - Quantity(${details.quantity})`,
				productid:details.id,
				/* customerEmail:customerEmail.email */
			}),
		}).then(async (r) => {
			const { clientSecret } = await r.json();
			setClientSecret(clientSecret);
		});

		
	}, [props.products]);


	return (
		<>
		<Header/>
		<div className="products-wrapper">
			<div className="breadcrumb">
				<h2>Checkout</h2>
			</div>
			<div className="checkout-area">
				<Container>
					<div className="checkout-form">
						<h2>Fill out below feilds</h2>
						{stripePromise && clientSecret && (
							<Elements stripe={stripePromise} options={{ clientSecret }}>
								<AddressForm />
								<CheckoutForm />
							</Elements>
						)}
					</div>
				</Container>
			</div>
		</div>
		</>
	);
}

export default Payment;
