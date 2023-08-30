import { useSearch } from "../context/search";

import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";

const Search = () => {
  const [values, setValues] = useSearch();
  console.log(values.result);
  return (
    <>
      <Jumbotron
        title="Search result"
        subtitle={
          values?.result?.length < 1
            ? "No products found"
            : `Found ${values?.result?.length} products`
        }
      />
      <div className="container mt-3">
        <div className="row">
                  {values?.result?.map((value) => (
              <div key={value._id} className="col-md-3">        
                  <ProductCard product={value} />
              </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
