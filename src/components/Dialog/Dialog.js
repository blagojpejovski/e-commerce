import { useDispatch } from "react-redux";
import "./Dialog.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { openDialog } from "../../redux/dialog/dialogSlice";
import { createProduct } from "../../redux/product/productSlice";
import axios from "axios";

const Dialog = () => {
    const visible = useSelector((state) => state.dialog.dialogVisible);
    const states = useSelector((state) => state.utility.states);
    const categories = useSelector((state) => state.utility.categories);
    const dispatch = useDispatch();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        picture: "",
        description: "",
        categoryId: "Select category",
        stateId: "Select state",
    });
    const [validationErrors, setValidationErrors] = useState([]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (validationErrors.length) {
            console.log("slabo");
            return;
        }
        try {
            const res = await axios.post(
                "https://my-json-server.typicode.com/drakulovski/dbplaceholder/products"
            );
            dispatch(createProduct({ product: product }));
            dispatch(openDialog({ dialogVisible: false }));
            setProduct({
                title: "",
                price: "",
                picture: "",
                description: "",
                categoryId: "Select category",
                stateId: "Select state",
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const validateInput = () => {
            let validationErrorsArray = [];
            if (product.title.length < 4) {
                validationErrorsArray = [
                    ...validationErrorsArray,
                    "Title needs to be 4 characters or longer!",
                ];
            }
            const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
            if (!regex.test(product.picture)) {
                validationErrorsArray = [
                    ...validationErrorsArray,
                    "Image URL needs to be valid!",
                ];
            }

            if (product.price <= 4) {
                validationErrorsArray = [
                    ...validationErrorsArray,
                    "Price needs to be higher than 4!",
                ];
            }
            if (!states.find((state) => state.id === +product.stateId)) {
                validationErrorsArray = [
                    ...validationErrorsArray,
                    "Please select a state!",
                ];
            }
            if (
                !categories.find(
                    (category) => category.id === +product.categoryId
                )
            ) {
                validationErrorsArray = [
                    ...validationErrorsArray,
                    "Please select a category!",
                ];
            }
            if (
                states.find((state) => state.id === product.stateId)?.tax >
                    0.25 &&
                product.price <= 7
            ) {
                validationErrorsArray = [
                    ...validationErrorsArray,
                    "Price needs to be higher than 7 for states with tax above 0.25!",
                ];
            }
            setValidationErrors([...validationErrorsArray]);
        };
        validateInput();
    }, [product, states, categories]);

    return (
        <div className={visible ? "dialog-backdrop" : null}>
            <div
                className={`dialog-container ${
                    !visible && "dialog-container-hidden"
                }`}
            >
                <form className="form-container" onSubmit={handleSave}>
                    <div className="dialog-header">Create Product</div>
                    <div className="dialog-inputs-container">
                        <div className="dialog-select-container">
                            <select
                                value={product.stateId}
                                name="stateId"
                                onChange={handleChange}
                            >
                                <option value="Select state" disabled hidden>
                                    State
                                </option>
                                {states.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={product.categoryId}
                                name="categoryId"
                                onChange={handleChange}
                            >
                                <option value="Select category" disabled hidden>
                                    Category
                                </option>
                                {categories.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="dialog-input-row-container">
                            <div style={{ width: "65%" }}>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Name"
                                    value={product.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ width: "30%" }}>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Price"
                                    value={product.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                required
                                type="url"
                                name="picture"
                                id="picture"
                                placeholder="Image URL"
                                value={product.picture}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Description"
                                value={product.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="dialog-footer">
                        <div className="dialog-errors">
                            {validationErrors.map((error, key) => (
                                <div key={key}>{error}</div>
                            ))}
                        </div>
                        <div className="dialog-buttons-container">
                            <button
                                type="submit"
                                className={`primary`}
                                onMouseOver={(event) => {
                                    event.target.className =
                                        !validationErrors.length
                                            ? "primary hovered"
                                            : "primary";
                                }}
                                onMouseLeave={(event) => {
                                    event.target.className = "primary";
                                }}
                            >
                                Save
                            </button>
                            <button
                                className="secondary"
                                onClick={() => {
                                    dispatch(
                                        openDialog({ dialogVisible: false })
                                    );
                                    setProduct({
                                        title: "",
                                        price: "",
                                        picture: "",
                                        description: "",
                                        categoryId: "Select category",
                                        stateId: "Select state",
                                    });
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Dialog;
