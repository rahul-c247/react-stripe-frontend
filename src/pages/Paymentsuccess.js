import { Link } from "react-router-dom"

function Paymentsuccess(){
    return(
        <div className="success-payment">
            <h1>Order placed 🎉</h1>
            <p>Thank you for purchasing our item. <br/>Your payment successfully received.</p>
            <Link to="/products" className="btn">Back to products</Link>
        </div>
    )
}

export default Paymentsuccess