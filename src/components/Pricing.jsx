import Button from "./Button"
import '../styles/pricing.css'

function Pricing(props){
    return(
        <div className={`pricing-box ${props.className}`}>
            <div className="check-icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" x="0" y="0" viewBox="0 0 455.111 455.111"><g><circle cx="227.556" cy="227.556" r="227.556" fill="#ff8200"></circle><path d="M455.111 227.556c0 125.156-102.4 227.556-227.556 227.556-72.533 0-136.533-32.711-177.778-85.333 38.4 31.289 88.178 49.778 142.222 49.778 125.156 0 227.556-102.4 227.556-227.556 0-54.044-18.489-103.822-49.778-142.222 52.623 41.243 85.334 105.243 85.334 177.777z" fill="#ff8200"></path><path d="M351.289 162.133 203.378 324.267c-9.956 11.378-27.022 11.378-36.978 0l-62.578-69.689c-8.533-9.956-8.533-25.6 1.422-35.556 9.956-8.533 25.6-8.533 35.556 1.422l44.089 49.778 129.422-140.8c9.956-9.956 25.6-11.378 35.556-1.422 9.955 8.533 9.955 25.6 1.422 34.133z" fill="#ffffff"></path></g></svg></div>
            {props.save?<span className="discount-tag">{props.save}</span>:null}
            <h2></h2>
            <h1>{props.price}</h1>
            <h3>{props.type}</h3>
            <Button className="btn" onClick={props.onSelect}>{props.btnText}</Button>
        </div>
    )
}
export default Pricing