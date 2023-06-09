import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import svg from "../utilities/Svg"
import Responsive from "../utilities/Responsive"

function Header(props){
  const [emailData,setEmailData] = useState([])
  const [facebookData,setFacebookData] = useState([])
  const [cartData,setCartData] = useState([])
  const navigate = useNavigate()
  const {isMobile} = Responsive()
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/')
  }
  useEffect(() => {
    const emailLogin = JSON.parse(localStorage.getItem('gmailLogin'));
    setEmailData(emailLogin);

    const facebookLogin = JSON.parse(localStorage.getItem('facebookLogin'));
    setFacebookData(facebookLogin)

    const cartD = JSON.parse(localStorage.getItem('products'));
    setCartData(cartD)
  }, []);
  return(
    <>
      <div className="dashboard">
        <h2>Logo</h2>
        <div className="profile-right">
          {isMobile && <div className="header-toggle">{svg.bars}</div>}
          <Link to="/cart" className="header-cart">
            {props.updateCart ? <span>{props.updateCart === 'undefined' ? null : props.updateCart.length}</span> : <span>{cartData && cartData.length}</span>}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" x="0" y="0" viewBox="0 0 512 512"><g><path d="M402.351 381.058h-203.32l-11.806-47.224h266.587L512 101.085H129.038L108.882 20.46H0v33.4h82.804l82.208 328.827c-24.053 5.971-41.938 27.737-41.938 53.611 0 30.461 24.781 55.242 55.241 55.242 30.459 0 55.241-24.781 55.241-55.242a54.903 54.903 0 0 0-4.511-21.841h122.577a54.92 54.92 0 0 0-4.511 21.841c0 30.461 24.781 55.242 55.241 55.242 30.459 0 55.241-24.781 55.241-55.242-.001-30.458-24.782-55.24-55.242-55.24zm-115.322-80.624h-37.08l-8.284-66.275h45.365v66.275zm124.883-165.95h57.31l-16.568 66.275h-49.026l8.284-66.275zm-12.459 99.676h44.85l-16.568 66.275h-36.566l8.284-66.275zm-79.025-99.676h57.824l-8.284 66.275h-49.539v-66.275zm0 99.675h45.365l-8.284 66.275h-37.08v-66.275zm-33.399-99.675v66.275H237.49l-8.284-66.275h57.823zm-149.641 0h58.158l8.284 66.275h-49.873l-16.569-66.275zm24.919 99.675h45.699l8.284 66.275h-37.414l-16.569-66.275zm16.008 223.982c-12.043 0-21.841-9.798-21.841-21.842 0-12.043 9.798-21.841 21.841-21.841s21.841 9.798 21.841 21.841c0 12.044-9.798 21.842-21.841 21.842zm224.036 0c-12.043 0-21.841-9.798-21.841-21.842 0-12.043 9.798-21.841 21.841-21.841 12.043 0 21.841 9.798 21.841 21.841 0 12.044-9.798 21.842-21.841 21.842z" fill="#000000"></path></g></svg>
          </Link>
          {emailData ?
          <div className="profile-data">
            <img src={emailData && emailData.picture} alt="profile"/>
            {!isMobile && <div className="profile-detail">
              <h2>{emailData && emailData.given_name}{emailData && emailData.family_name}</h2>
              <p>{emailData && emailData.email}</p>
            </div>}
          </div>
          :null}
          {facebookData ?
          <div className="profile-data">
            <img src={facebookData && facebookData.picture} alt="profile"/>
            {!isMobile && <div className="profile-detail">
              <h2>{facebookData && facebookData.name}</h2>
            </div>}
          </div>
          :null}
          <Button className="btn" onClick={handleLogout}>Logout</Button>
        </div>
      </div> 
    </>
  )
}

export default Header