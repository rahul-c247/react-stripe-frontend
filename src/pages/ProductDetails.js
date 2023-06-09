import Header from "../components/Header"
import Row from "../components/common/Row"
import Container from "../components/common/Container"
import Column from "../components/common/Column"
import '../styles/products.css'
import { useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../components/Loader"
import Input from "../components/Input"
import Button from "../components/Button"
import axios from "axios"
import { Link } from "react-router-dom"
 
function ProductDetails(){
  const [product,setProduct] = useState()
  const [relatedProducts,setRelatedProducts] = useState([])
  const [loader,setLoader] = useState(false)
  const [quantity,setQuantity] = useState('1')

  const navigate = useNavigate()
  const {id} = useParams()

  const cate = product && product.category
  useEffect(()=>{
    setLoader(true)
    /* const singleProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      const res = await response.json()
      setProduct(res)
      setLoader(false)
    }
    singleProduct(); */

    axios.get(`${process.env.REACT_APP_PRODUCT_API}/products/${id}`)
    .then(function (response) {
      setProduct(response.data)
      setLoader(false)
    })

    axios.get(`${process.env.REACT_APP_PRODUCT_API}/products`)
    .then(function (response) {
      setRelatedProducts(response.data)
    })

  },[])
  
  const handleInput =(e)=>{
    setQuantity(e.target.value)
  }
  console.log('product',product);

  const goToCart =()=>{
    localStorage.setItem('productDetails',JSON.stringify({
      id:product.id,
      title:product.title,
      image:product.image,
      quantity:quantity,
      price:product.price * quantity
    }))
    navigate('/cart')
  }

  return(
    <>
      {loader == true ? 
      <Loader/>
      :<>
      <Header/>
      <div className="product-single-wrapper">
        <div className="breadcrumb">
          <h2>Products Details</h2>
        </div>
        <div className="products-area">
          <Container>
          <div className="product-detail-box">
            <Row>
              <Column col="4">
                <div className="product-image">
                  <img src={product && product.image} alt="product"/>
                </div>
              </Column>
              <Column col="8">
                <div className="product-data">
                  <div className="category">
                    <p>{product && product.category}</p>
                  </div>
                  <h2>{product && product.title}</h2>
                  <p>{product && product.description}</p>
                  <div className="rating">
                      {product && product.rating.rate <= 1.5 ? 
                        <img src="../star.png" alt="rating"/>
                      : product && product.rating.rate <= 2.5 ?<>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                        </>
                      : product && product.rating.rate <= 3.5 ?<>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                        </>
                      : product && product.rating.rate <= 4.5 ?<>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                        </>
                      : <>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                        <img src="../star.png" alt="rating"/>
                      </>
                      }
                    </div>
                  <div className="price">
                    <h3>${product && product.price * quantity}</h3>
                  </div>
                  <div className="quantity">
                    <Input 
                      label="Quantity"
                      type="number"
                      className="input-box"
                      name="quantity"
                      min="1"
                      value={quantity}
                      onChange={handleInput}/>
                  </div>
                  {/* <Button className="btn" onClick={goToCart}>Add to cart</Button> */}
                  <Link className="btn" to="/checkout" onClick={goToCart} style={{marginLeft:'10px'}}>Buy Now</Link>
                </div>
              </Column>
            </Row>
          </div>
          <div className="product-related">
            <h2>Related Products</h2>
            <Row>
              {relatedProducts.slice(5,9).map((item,key)=>{
                return(
                <Column col="3" key={key}>
                  <div className="products-box">
                    <div className="product-image">
                      <a href={`/products/${item.id}`}>
                          <img src={item.image} alt="procut-image"/>
                      </a>
                    </div>
                    <div className="product-data">
                        <div className="category">
                          <p>{item.category}</p>
                          <div className="rating">
                            {item.rating.rate <= 1.5 ? 
                              <img src="../star.png" alt="rating"/>
                            : item.rating.rate <= 2.5 ?<>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                              </>
                            : item.rating.rate <= 3.5 ?<>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                              </>
                            : item.rating.rate <= 4.5 ?<>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                              </>
                            : <>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                              <img src="../star.png" alt="rating"/>
                            </>
                            }
                          </div>
                        </div>
                        <h2><a href={`/products/${item.id}`}>{item.title.slice(0,40)}...</a></h2>
                        <div className="price">
                          <h3>${item.price}</h3>
                          <a className="btn">Add to cart</a>
                        </div>
                    </div>
                  </div>
                </Column>
                )
              })}
            </Row>
          </div>
          </Container>
        </div>
      </div></>}
    </>
  )
}

export default ProductDetails