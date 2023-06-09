import { useState } from "react"
import Button from "../../components/Button"
import Column from "../../components/common/Column"
import Row from "../../components/common/Row"
import Pricing from "../../components/Pricing"
import { Link } from "react-router-dom"

function StepTwo(props){
  const [plans,setPlans] = useState()
  const [isPlanSelected,setIsPlanSelected] = useState(false)

  const selectPlan=(id)=>{
    setPlans(id)
    setIsPlanSelected(true)
  }
  
  const goToThirdStep =()=>{
    localStorage.setItem('pricingData', JSON.stringify({
      price:plans == 0 ? '$49' : plans == 1 ? '$199' : '$149',
      type:plans == 0 ? 'Monthly' : plans == 1 ? 'Yearly' : '6 Months',
      freeTrial:plans == 0 ? '15 days' : plans == 1 ? '45 Days' : '30 Days',
    }))
    props.setStepThree(true)
  }

  return(
    <div className={`step-two ${props.visible ? 'animate__animated animate__fadeInUp' : ''}`}>
      <div className="pricing-wrapper">
        <Row>
          <Column col="4">
            <Pricing price="$49" type="Monthly" onSelect={()=>selectPlan(0)} className={plans == 0 ? 'active' : ''} btnText={plans == 0 ? 'selected' : 'select'}/>
          </Column>
          <Column col="4">
            <Pricing price="$199" type="Yearly" save="save 20%" onSelect={()=>selectPlan(1)} className={plans == 1 ? 'active' : ''} btnText={plans == 1 ? 'selected' : 'select'}/>
          </Column>
          <Column col="4">
            <Pricing price="$149" type="6 Months" save="save 10%" onSelect={()=>selectPlan(2)} className={plans == 2 ? 'active' : ''} btnText={plans == 2 ? 'selected' : 'select'}/>
          </Column>
        </Row>
      </div>
      {isPlanSelected ?
      <div className="pricing-amount">
        <div className="pricing-summary">
          <h3>Summary</h3>
          <ul>
            {plans == 0 ?
              <li>Monthly subscription 15-Days free trial</li>
            : plans == 1 ?
              <li>Yearly subscription 45-Days free trial</li>
            : <li>6 Months subscription 30-Days free trial</li>}
            <li>Your first payment will be due on the [Insert Date].</li>
          </ul>
        </div>
        <div className="pricing-total">
          <h3>Payment Details</h3>
          <p>Yearly <span>{plans == 0 ? '$49' : plans == 1 ? '$199' : '$149'}</span></p>
          {/* <p>Discount <span>-$9</span></p> */}
          <h4>Total Pay <span>{plans == 0 ? '$49' : plans == 1 ? '$199' : '$149'}</span></h4>
        </div>
      </div>
      :null}
      <div className="pricing-btns">
        <Button type="button" onClick={props.backStep} className="btn black-btn">Back</Button>
        {isPlanSelected ? <Button type="button" className="btn" onClick={goToThirdStep}>Next step</Button>:null}
      </div>
      <div className="back-login"><Link to="/">Back to login</Link></div>
    </div>
  )
}

export default StepTwo