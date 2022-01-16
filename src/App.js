import { useDispatch } from "react-redux";
import "./App.css";
import Dialog from "./components/Dialog/Dialog";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import { setCategories, setStates } from "./redux/utility/utilitySlice";
import { useEffect } from "react";
import axios from "axios";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const res = await axios.get(
                    "https://my-json-server.typicode.com/drakulovski/dbplaceholder/states",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );
                console.log(res.data);
                dispatch(setStates({ states: res.data }));
            } catch (err) {
                console.log(err);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    "https://my-json-server.typicode.com/drakulovski/dbplaceholder/categories",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );
                console.log(res.data);
                dispatch(setCategories({ categories: res.data }));
            } catch (err) {
                console.log(err);
            }
        };
        fetchStates();
        fetchCategories();
    }, [dispatch]);

    return (
        <div className="app-container">
            <Navbar />
            <div className="page-container">
                <Products />
            </div>
            <Dialog />
        </div>
    );
}

export default App;
