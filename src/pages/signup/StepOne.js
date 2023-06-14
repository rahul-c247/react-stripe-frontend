import Input from "../../components/Input"
import Row from "../../components/common/Row"
import Column from "../../components/common/Column"
import Button from "../../components/Button"
import Notifications from "../../utilities/Notifications";
import Validators from "../../utilities/Validators"
import { useState } from "react"
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import { AuthSignup } from "../../services";
import { useNavigate } from "react-router-dom";

function StepOne(props){
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    dob:'',
    gender:'',
    email:'',
    password:'',
    check:''
  })

  const [fnameErr,setFnameErr] = useState('')
  const [lnameErr,setLnameErr] = useState('')
  const [dobErr,setDobErr] = useState('')
  const [genderErr,setGenderErr] = useState('')
  const [emailErr,setEmailErr] = useState('')
  const [passwordErr,setPasswordErr] = useState('')

  const navigate = useNavigate();

  const handleInput =(e)=>{
    const {name , value} = e.target
    setSignupData({
      ...signupData,
      [name]:value
    })
  }
  
  async function signupSubmit (e){
    e.preventDefault()
    console.log(signupData);
    {!signupData.firstName ? setFnameErr(Notifications.required) : setFnameErr('')}
    {!signupData.lastName ? setLnameErr(Notifications.required) : setLnameErr('')}
    {!signupData.dob ? setDobErr(Notifications.required) : setDobErr('')}
    {!signupData.gender ? setGenderErr(Notifications.required) : setGenderErr('')}

    if(!signupData.email){
      setEmailErr(Notifications.required)
    }else if(!signupData.email.includes('@')){
      setEmailErr(Notifications.invalidEmail)
    }else{
      setEmailErr('')
    }

    if(!signupData.password){
      setPasswordErr(Notifications.required)
    }else if(!Validators.passLength.test(signupData.password)){
      setPasswordErr(Notifications.passLengthErr)
    }else if(!Validators.capitalLetter.test(signupData.password)){
      setPasswordErr(Notifications.capitalLetterErr)
    }else if(!Validators.oneNumber.test(signupData.password)){
      setPasswordErr(Notifications.passNumberErr)
    }else if(!Validators.oneSpecialChar.test(signupData.password)){
      setPasswordErr(Notifications.specialCharErr)
    }else{
      setPasswordErr('')
    }

    const passValidator = Validators.passLength.test(signupData.password) && Validators.capitalLetter.test(signupData.password) && Validators.oneNumber.test(signupData.password) && Validators.oneSpecialChar.test(signupData.password)

    const saveSignupData = (signupData.firstName && signupData.lastName && signupData.dob && signupData.email && signupData.password && passValidator)
    
    if(saveSignupData){
      localStorage.setItem('signupData', JSON.stringify(signupData))
      setTimeout(()=>{
        props.setStepTwo(true)
      },200)

    }

    /* props.setStepTwo(true) */

    const result = await AuthSignup(signupData);
    console.log('result',result);

    if (result.status !== 200) {

      let errorMessage = result.response.data.errors.email;

      console.log(errorMessage,"errorMessage");
      /* Toast.fire({
        title: errorMessage,
        icon: 'error',
      }) */
      
      /* setLoading(false); */

      return;

    }
    /* return navigate('/'); */

    /* props.setStepTwo(true) */
  }
  return(
    <div className={`step-one animate__animated animate__fadeInUp`}>
      <div className="login-box">
        <h2>Signup Form</h2>
        <form onSubmit={signupSubmit}>
          <Row>
            <Column col='6'>
              <Input 
                label="First Name"
                type="text"
                placeholder="Enter first name"
                className="input-box"
                name="firstName"
                value={signupData.firstName}
                onChange={handleInput}
                error={fnameErr}/>
            </Column>

            <Column col='6'>
              <Input 
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                className="input-box"
                name="lastName"
                value={signupData.lastName}
                onChange={handleInput}
                error={lnameErr}/>
            </Column>

            <Column col='6'>
              <Input 
                label="Date of Birth"
                type="date"
                placeholder=""
                className="input-box"
                name="dob"
                value={signupData.dob}
                onChange={handleInput}
                error={dobErr}/>
            </Column>

            <Column col='6'>
              <div className="sigup-gender">
                <label>Gender</label>
                <Input 
                  type="radio"
                  name="gender"
                  value='male'
                  onChange={handleInput}
                  id='male'
                  /* error={genderErr} */>
                    <label htmlFor="male">Male</label>
                  </Input>
                <Input 
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInput}
                  id='female'
                  >
                    <label htmlFor="female">Female</label>
                  </Input>
                  <p className="error">{genderErr}</p>
                </div>
            </Column>

            <Column col='6'>
              <Input 
                label="Email"
                type="text"
                placeholder="Enter your email"
                className="input-box"
                name="email"
                value={signupData.email}
                onChange={handleInput}
                error={emailErr}/>
            </Column>

            <Column col='6'>
              <Input 
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="input-box"
                name="password"
                value={signupData.password}
                onChange={handleInput}
                error={passwordErr}/>
            </Column>

            <Column col='12'>
              <Input 
                type="checkbox"
                className=""
                name="check"
                value="checked"
                onChange={handleInput}>
                  <span>I would like to receive News and promotions emails.</span>
                </Input>

                <Button type="submit" className="btn">Next Step</Button>
                <div className="back-login"><Link to="/">Back to login</Link></div>
            </Column>
          </Row>
        </form>
      </div>
    </div>
  )
}

export default StepOne
