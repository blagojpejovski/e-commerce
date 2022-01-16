import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "../../../redux/product/productSlice";
import "../Products.css";

const ProductList = () => {
    const products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();

    const handleClick = (productId) => {
        dispatch(
            selectProduct({
                productId,
            })
        );
    };

    return (
        <div className="product-list">
            {products.map((product) => (
                <div
                    className="product-list-item"
                    key={product.id}
                    onClick={() => handleClick(product.id)}
                >
                    <div className="product-list-item-header">
                        <div>{product.id}</div>
                        <div>{product.stock ? "In stock" : "Not in stock"}</div>
                    </div>

                    <div className="product-list-item-title">
                        <div>{product.title}</div>
                    </div>
                    <div className="product-list-item-footer">
                        ${product.price}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
