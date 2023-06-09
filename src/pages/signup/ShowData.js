import { useEffect, useState } from "react"
import Row from "../../components/common/Row";
import Column from "../../components/common/Column";

function ShowData(){
  const [signupData,setSignupData] = useState([])
  const [pricingData,setPricingData] = useState([])
  const [cardData,setCardData] = useState([])
  useEffect(() => {
    const signup = JSON.parse(localStorage.getItem('signupData'));
    setSignupData(signup);

    const pricing = JSON.parse(localStorage.getItem('pricingData'));
    setPricingData(pricing);

    const card = JSON.parse(localStorage.getItem('cardData'));
    setCardData(card);

  }, []);
  return(
    <div className="user-data">
      <Row>
        <Column col="4">
          {signupData ? <h2>Your Details</h2> : null}
          {signupData && Object.entries(signupData).map((data,key)=>{
            return (
              <div className="plan-data">
                <p><strong>{data[0]}</strong> - {data[1]}</p>
              </div>
            )
          })}
        </Column>
        <Column col="4">
          {pricingData ? <h2>Your Plan</h2> : null}
          {pricingData && Object.entries(pricingData).map((data,key)=>{
            return (
              <div className="plan-data">
                <p><strong>{data[0]}</strong> - {data[1]}</p>
              </div>
            )
          })}
        </Column>
        <Column col="4">
          {cardData ? <h2>Your Card Details</h2> : null}
          {cardData && Object.entries(cardData).map((data,key)=>{
            return (
              <div className="plan-data">
                <p><strong>{data[0]}</strong> - {data[1]}</p>
              </div>
            )
          })}
        </Column>
      </Row>
    </div>
  )
}

export default ShowData