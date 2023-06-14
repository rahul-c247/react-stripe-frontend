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

	useEffect(() => {
    setLoader(true)
    const plans = JSON.parse(localStorage.getItem('pricingData'));
    console.log('plans',plans);
		fetch('http://localhost:8001/v1/stripe/create-payment-intent', {
			method: 'POST',
      headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
        price:`${plans.price}00`,
        description:`${plans.type}`,
				currency:'usd',
      }),
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