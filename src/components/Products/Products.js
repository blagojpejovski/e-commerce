import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";
import { openDialog } from "../../redux/dialog/dialogSlice";
import { currentProducts } from "../../redux/product/productSlice";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductList from "./ProductList/ProductList";
import { sortProducts } from "../../redux/product/productSlice";

const Products = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    "https://my-json-server.typicode.com/drakulovski/dbplaceholder/products",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );
                dispatch(currentProducts({ products: res.data }));
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, [dispatch]);

    const handleSort = (e) => {
        dispatch(
            sortProducts({
                type: e.target.name,
                ascending: e.target.value === "ascending",
            })
        );
    };

    return (
        <div className="products-container">
            <div className="products-header">
                <div className="sort-container">
                    <select
                        className="primary"
                        defaultValue="default"
                        name="name"
                        onChange={handleSort}
                    >
                        <option value="default" disabled hidden>
                            Sort by name
                        </option>
                        <option value="ascending">Name Ascending</option>
                        <option value="descending">Name Descending</option>
                    </select>
                    <select
                        className="primary"
                        defaultValue="default"
                        name="price"
                        onChange={handleSort}
                    >
                        <option value="default" disabled hidden>
                            Sort by price
                        </option>
                        <option value="ascending">Price Ascending</option>
                        <option value="descending">Price Descending</option>
                    </select>
                </div>
                <button
                    onClick={() =>
                        dispatch(openDialog({ dialogVisible: true }))
                    }
                    className="primary"
                >
                    Add Product{" "}
                </button>
            </div>
            <div className="products">
                <ProductList />
                <ProductDetails />
            </div>
        </div>
    );
};
export default Products;
