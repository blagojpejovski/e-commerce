import { useSelector } from "react-redux";
import "../Products.css";

const ProductDetails = () => {
    const product = useSelector((state) => state.product.selectedProduct);

    return (
        <div className="product-details">
            <div className="product-image-container">
                <img
                    className="product-image"
                    src={product.picture}
                    alt="Image of product"
                />
            </div>
            <div className="product-info-container">
                <div className="product-header">
                    <div>{product.title}</div>
                    <div className="product-id">{product.id}</div>
                </div>
                <div className="product-description">{product.description}</div>
                <div className="product-header">
                    <div className="product-availability">
                        {product.stock ? "In stock" : "Not in stock"}
                    </div>
                    <div>${product.price}</div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
