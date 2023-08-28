import { useEffect, useState } from 'react'
import axios from "axios";

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            if (data) setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            if (data) setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <Jumbotron title="Hello World" subtitle='Welcome to React e-commerce' />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        sidebar
                    </div>
                    <div className='col-md-9'>
                        <h2 className='p-3 mt-2 h4 bg-light text-center'>
                           {products?.length} Products
                        </h2>
                        <div className='row'>
                            {products?.map(product => (
                                <div className='col-md-3' key={product._id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                       </div>
                    </div>
                </div>
        </div>
    
        </>
  )
}

export default Shop