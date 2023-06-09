import StepTwo from "./StepTwo"
import StepOne from "./StepOne"
import StepThree from "./StepThree"
import '../../styles/auth.css'
import { useState } from "react"
import { Link } from "react-router-dom"

function Signup(){
  const [stepTwo, setStepTwo] = useState(false)
  const [stepThree, setStepThree] = useState(false)

  return(
    <div className="login-wrapper signup-wrapper">
      <div className="signup-steps">
        <h2>Set Up Your Account</h2>
        <ul>
          <li className="active">
            <span className="line"></span>
            <p>Step</p>
            <span>01</span>
          </li>
          <li className={`${stepTwo ? 'active' : ''}`}>
            <span className="line"></span>
            <p>Step</p>
            <span>02</span>
          </li>
          <li className={`${stepThree ? 'active' : ''}`}>
            <span className="line"></span>
            <p>Step</p>
            <span>03</span>
          </li>
        </ul>
      </div>
      {stepTwo === false ? 
        <StepOne setStepTwo={setStepTwo}></StepOne>
      :null}

      {stepTwo === true && stepThree === false ? 
        <StepTwo visible={stepTwo} backStep={()=> setStepTwo(false)} setStepThree={setStepThree}></StepTwo>
      :null}
      
      {stepThree === true ? 
        <StepThree visible={stepThree} backStep={()=> setStepThree(false)}></StepThree>
      :null}
    </div>
  )
}

export default Signup