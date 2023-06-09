import Container from "../components/common/Container"
import ShowData from "../pages/signup/ShowData"
import Header from "../components/Header"
import Responsive from "../utilities/Responsive"

function Dashboard(){
  const {isMobile,isTablet,isMiniLaptop,isLaptop,isDesktop} = Responsive()
  return(
    <>
        <Header/>
        {
          isDesktop ? <h2 style={{textAlign:'center'}}>Desktop</h2> :
          isLaptop ? <h2 style={{textAlign:'center'}}>Laptop</h2> :
          isMiniLaptop ? <h2 style={{textAlign:'center'}}>Mini Laptop</h2> :
          isTablet ? <h2 style={{textAlign:'center'}}>Tablet</h2> :
          isMobile ? <h2 style={{textAlign:'center'}}>Mobile</h2> :
          null
        }
        <Container>
          <ShowData></ShowData>
        </Container>
    </>
  )
}

export default Dashboard