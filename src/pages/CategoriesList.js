import React from 'react'
import { Link } from 'react-router-dom';

import useCategory  from "../hooks/useCategory";
import Jumbotron from '../components/cards/Jumbotron';

const CategoriesList= () => {

  const categories = useCategory();
  return (
    <>
      <Jumbotron title="Categories" subtitle="List of all categories" />
      <div className='container overflow-hidden'>
        <div className='row gx-5 gy-5 mt-3 mb-5'>
          {categories?.map(category => (
            <div className='col-md-6' key={category._id}>
              <button className='btn btn-light col-12  p-3'>
                <Link to={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              
              </button>
            </div> 
          ))}
        </div>
      </div>
  
    </>
  )
}

export default CategoriesList
