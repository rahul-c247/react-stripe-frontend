import Header from "../components/Header"
import Container from "../components/common/Container"
import '../styles/products.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Input from "../components/Input"

function Cart(){
  const [getProduct,setGetProduct] = useState([])
  const [detailsProduct,setDetailsProduct] = useState([])
  const [quantity,setQuantity] = useState('1')
  useEffect(() => {

    const cartData = JSON.parse(localStorage.getItem('products'));
    setGetProduct(cartData)

    const details = JSON.parse(localStorage.getItem('productDetails'));
    setDetailsProduct(details)

  }, []);
  const total = getProduct && getProduct.reduce((i,p) =>  i = i + p.price , 0 ) + (detailsProduct ? detailsProduct.price : null);

  console.log('detailsProduct',detailsProduct);

  const handleInput =(e)=>{
    setQuantity(e.target.value)
  }
  return(
    <>
      <Header/>
      <div className="products-wrapper">
        <div className="breadcrumb">
          <h2>Cart</h2>
          <Link to="/products">Back to product</Link>
        </div>
        <div className="products-area">
          <Container>
            {!getProduct.length == 0 ? 
              <>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {getProduct.map((item,key)=>{
                    return(
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>
                          <div className="cart-product">
                            <img src={item.image} alt="procut-image"/>
                            <h3>{item.title}</h3>
                          </div>
                        </td>
                        <td>
                          <div className="quantity">
                            {/* <Input 
                              type="number"
                              className="input-box"
                              name="quantity"
                              min="1"
                              value={quantity}
                              onChange={handleInput}/> */}
                              1
                          </div>
                        </td>
                        <td>${item.price}</td>
                      </tr>
                    )
                  })}
                  {detailsProduct ? 
                  <tr>
                    <td>{getProduct.length + 1}</td>
                    <td>
                      <div className="cart-product">
                        <img src={detailsProduct && detailsProduct.image} alt="procut-image"/>
                        <h3>{detailsProduct && detailsProduct.title}</h3>
                      </div>
                    </td>  
                    <td>
                      <div className="quantity">
                        {detailsProduct && detailsProduct.quantity}
                      </div>
                    </td>
                    <td>${detailsProduct && detailsProduct.price}</td>
                  </tr>
                  :null}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3"><div className="total-cart">Total Amount</div></td>
                    <td><div className="total-cart">${total.toFixed(2)}</div></td>
                  </tr>
                </tfoot>
              </table>
              <Link to="/checkout" className="btn">Checkout Payment</Link>
              </>:
              <div className="empty-box">
                <h2>Your cart is empty.</h2>
              </div>}
          </Container>
        </div>
      </div>
    </>
  )
}

export default Cart