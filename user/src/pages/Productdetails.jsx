import ButtonComponent from "../component/ButtonComponent"
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import RecomentedProduct from "../component/RecomentedProduct"
import Notfound from "./Notfound";
import "./CSS/productdetails.css"
const Productdetails = () => {
    const { productId } = useParams();
  const id = atob(productId);
  console.log(id);
  
    // const recomentedProduct = useSelector((state) => state.products.filteredProduct.filter(product => product._id !== id));
    const recomentedProduct = useSelector((state) => 
        [...state.products.filteredProduct.filter(product => product._id !== id)]
    );
    
    console.log('Filtered Products:', recomentedProduct);
    const product = useSelector((state) => state.products.productList.find(product => product._id === id));
    console.log("product",product);
    
    const imgPath = useSelector((state) => state.common.imagePath)

    const productFeature = [
        {
            url: "../images/delivary.png",
            description: "Fast Delivery"
        },
        {
            url: "../images/card.png",
            description: "Free Shipping"
        },
        {
            url: "../images/secure.png",
            description: "Secure Checkout"
        },
    ];
    return (
        <>
        <div className="topSpacing">
            {
                product ?
                    (<div className="productDetails-container">
                        <div className="left-container">
                            {product && <img src={imgPath + product.image} alt="" />}
                        </div>
                        <div className="rigt-container">
                            <div className="product-name">
                                {product && product.name}
                            </div>
                            <div className="price productdetails-price">
                                <div className="newprice">₹ {product && product.newPrice}</div>
                                <div className="oldPrice"> ₹ {product && product.oldPrice}</div>
                            </div>
                            <div className="addToCart fixedBtn">
                                <Link to="/cart">
                                <ButtonComponent
                                    text="ADD TO CART"
                                    classs="addbtn smallBtn checkOut"
                                    product={product}
                                    // onClick={addProduct}
                                />
                                </Link>
                            </div>
                            <div className="sub-headding">
                                Description
                            </div>
                            <div className="aboutProductDescription">
                                {product && product.description}
                            </div>
                            <div className="product-featureCOntainer">
                                {
                                    productFeature.map((feature, index) =>
                                        <div className="shipping" key={index}>
                                            <img className="featureImage" src={feature.url} alt="" />
                                            <div className="feature">
                                                {feature.description}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>) : <Notfound />
            }
        </div>
            <h1 className="headding">Related products</h1>
            <RecomentedProduct recomentedProducts={recomentedProduct} headding="Our Top Food Items" />
        </>
    );
}
export default Productdetails;

