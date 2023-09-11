import { useEffect, useState } from 'react'
import axios from "axios";
import { Checkbox, Radio } from 'antd';

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";
import { prices } from "../prices";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checkedCategory, setCheckedCategory] = useState([]);
    const [radio, setRadio] = useState([]);

    useEffect(() => {
        if (!checkedCategory.length || radio.length) loadProducts();
    }, []);

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        if (checkedCategory.length || radio.length) loadFilteredProducts();
    }, [checkedCategory, radio]);

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

    const loadFilteredProducts = async () => {
        try {
            const { data } = await axios.post('/filtered-products', { checked: checkedCategory, radio });
            console.log('filtered products => ', data);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChecked = (isChecked, id) => {
        let all = [...checkedCategory];
        if (isChecked) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id);
        }
        setCheckedCategory(all);
    }

    return (
        <>
            <Jumbotron title="Hello World" subtitle='Welcome to React e-commerce' />
            <div className='container-fluid'>
                <div className='row box'>
                    <div className='col-md-3'>
                        <h2 className='p-3 mt-2 h4 bg-light text-center'>
                            Filter by categories
                        </h2>
                        <div className='row p-5'>
                            {categories?.map(category => (
                                <Checkbox
                                    key={category._id}
                                    onChange={e => handleChecked(e.target.checked, category._id)}
                                >
                                    {category.name}
                                </Checkbox>
                            ))}
                        </div>
                        <h2 className='p-3 mt-2 h4 bg-light text-center'>
                            Filter by price
                        </h2>
                        <div className='row p-5'>
                            <Radio.Group onChange={e => setRadio(e.target.value)}>
                                {prices?.map(price => (
                                    <div key={price._id}>
                                        <Radio value={price.array}>{price.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className='p-5 pt-0'>
                            <button 
                            className='btn btn-outline-secondary col-12'
                            onClick={() => window.location.reload()}
                            >Reset</button>
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <h2 className='p-3 mt-2 h4 bg-light text-center'>
                            {products?.length} Products
                        </h2>
                        <div className='row' style={{ height: '100vh', overflow: 'scroll' }}>
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