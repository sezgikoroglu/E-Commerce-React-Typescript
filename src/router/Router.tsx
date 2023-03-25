
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Products />} />
                    {/* <Route path="/products" element={<Products />} /> */}
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
