import { useEffect, useState } from "react";
import { Product } from "../../components/interfaces";
import { getActiveProducts } from "../ApiHelper";
import PageWrapper from '../PageWrapper';
import Spinner from "../../components/Spinner/Spinner";

const DATA_STATES = {
  waiting: 'WAITING',
  loaded: 'LOADED',
  error: 'ERROR'
};

const ProductsPage = () => {
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { products, errorOccurred } = await getActiveProducts();
    setProducts(products);
    setLoadingState(errorOccurred ? DATA_STATES.error : DATA_STATES.loaded);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  let content;
  if (loadingState === DATA_STATES.waiting)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  else if (loadingState === DATA_STATES.loaded)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-white"
        data-testid="products-container"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.ProductID} className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src={product.ProductPhotoURL} alt={product.ProductName} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.ProductName}</div>
                <p className="text-gray-700 text-base">
                  Product ID: {product.ProductID}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  else
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occurred fetching the data!
      </div>
    );

  return (
    <PageWrapper>
      {content}
    </PageWrapper>
  );
}

export default ProductsPage;
