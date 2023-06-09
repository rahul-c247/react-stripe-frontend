import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PlanForm from "../../components/PlanForm";
import AddressForm from '../../components/AddressForm';
import Loader from '../../components/Loader'

function StepThree(props){
	const [clientSecret, setClientSecret] = useState('');
	const [loader, setLoader] = useState(false);

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

  const options = {
    mode: 'payment',
    amount: 5000,
    currency: 'usd',
  };
	/* useEffect(() => {
		fetch('http://localhost:8001/v1/stripe/config').then(async (r) => {
			const { publishableKey } = await r.json();
			setStripePromise(loadStripe(publishableKey));
		});
	}, []); */

	useEffect(() => {
    setLoader(true)
		fetch(`${process.env.REACT_APP_API_END_POINT}/stripe/create-payment-intent`, {
			method: 'POST',
			body: JSON.stringify(options),
		}).then(async (res) => {
			const { clientSecret } = await res.json();
			setClientSecret(clientSecret);
      setTimeout(()=>{
        setLoader(false)
      },500)
		});
	}, []);

  console.log('clientSecret',clientSecret);
  console.log('stripePromise',stripePromise);
  
  return(
    <>
    <div className={`step-three ${props.visible ? 'animate__animated animate__fadeInUp' : ''}`}>
        <div className="login-box" style={{minHeight:'200px'}}>
          {loader ? <Loader/> :
          <>
            <h2>Secure Payment</h2>
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <AddressForm /><br/>
                <PlanForm />
              </Elements>
            )}
          </>}
        </div>
    </div>
    </>
  )
}

export default StepThree