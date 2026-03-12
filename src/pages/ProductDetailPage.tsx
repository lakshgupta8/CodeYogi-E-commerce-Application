import React, { Component, type FC } from "react";
import { useParams, useLocation, Link, type Location } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import NotFound from "../components/NotFound";
import LoadingProduct from "../components/LoadingProduct";
import { getProduct } from "../api";
import { type Product } from "../types";

interface ProductDetailPageProps {
  id: number;
  location: Location;
  addToCart: (productId: number, count: number) => void;
}

interface ProductDetailPageState {
  product: Product | null;
  loading: boolean;
  error: boolean;
  count: number;
}

class ProductDetailPageClass extends Component<ProductDetailPageProps, ProductDetailPageState> {
  constructor(props: ProductDetailPageProps) {
    super(props);
    this.state = {
      product: null,
      loading: true,
      error: false,
      count: 1,
    };

    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleProductSwitch = this.handleProductSwitch.bind(this);
  }

  componentDidMount() {
    this.fetchProduct();
  }

  componentDidUpdate(prevProps: ProductDetailPageProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchProduct();
    }
  }

  fetchProduct() {
    this.setState({ loading: true, error: false });
    getProduct(this.props.id)
      .then((product) => {
        this.setState({ product, loading: false });
      })
      .catch(() => {
        this.setState({ error: true, loading: false });
      });
  }

  handleCountChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ count: Number(event.target.value) });
  }

  handleAddToCart(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.textContent = "ADDING...";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "ADD TO CART";
      button.disabled = false;
    }, 300);

    this.props.addToCart(this.props.id, this.state.count);
    this.setState({ count: 1 });
  }

  handleProductSwitch() {
    this.setState({ loading: true });
  }

  render() {
    const { id, location } = this.props;
    const { product, loading, error, count } = this.state;

    const idList = location.state?.idList || [];

    const currentProductIndex = idList.findIndex((p: { id: number }) => p.id === id);
    const nextProduct = idList[currentProductIndex + 1];
    const prevProduct = idList[currentProductIndex - 1];

    let title, image, price, description, category;
    if (product) {
      title = product.title;
      const images = product.images || [];
      image = images[0];
      price = product.price;
      description = product.description;
      category = product.category;
    }

    return (
      <>
        {loading && <LoadingProduct />}
        {error && <NotFound />}
        {!loading && !error && (
          <div className="flex flex-col md:px-8 pb-8">
            <Link to={location.state?.from || "/"} className="self-end">
              <ArrowLeft className="text-gray-800 text-3xl md:text-4xl" />
            </Link>

            <div className="flex md:flex-row flex-col gap-3 bg-white px-4 md:px-8 py-6">
              <div className="flex justify-center items-center bg-gray-100 w-full md:w-1/2 h-full">
                <img
                  className="bg-gray-100 w-full h-full object-contain"
                  src={image}
                  alt={title}
                />
              </div>

              <div className="flex flex-col px-2 md:px-8 w-full md:w-1/2 overflow-auto">
                <div className="flex-1">
                  <h1 className="mb-6 md:mb-10 font-semibold text-gray-500 text-3xl lg:text-5xl">
                    {title}
                  </h1>
                  <p className="mb-4 font-bold text-gray-600 text-xl lg:text-3xl">
                    {price !== undefined && price !== null
                      ? price.toFixed(2)
                      : "-"}
                  </p>
                  <p className="mb-6 md:mb-8 font-semibold text-gray-500 text-base lg:text-2xl">
                    {description}
                  </p>

                  <div className="flex sm:flex-row flex-col items-center gap-3">
                    <input
                      type="number"
                      value={count}
                      onChange={this.handleCountChange}
                      min={1}
                      className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-dark w-24 sm:w-16 text-gray-600"
                    />
                    <button
                      onClick={this.handleAddToCart}
                      className="bg-primary-default hover:bg-primary-dark px-8 sm:px-12 py-2 rounded-md w-full sm:w-auto font-medium text-white"
                    >
                      ADD TO CART
                    </button>
                  </div>

                  <p className="mt-6 text-gray-500 text-base">
                    Category:
                    <span className="text-primary-default"> {category}</span>
                  </p>
                </div>

                <div className="flex justify-between mt-6 md:mt-10">
                  <div>
                    {prevProduct && (
                      <Link
                        to={"/product/" + prevProduct.id}
                        state={location.state}
                        className="flex flex-col items-center"
                        onClick={this.handleProductSwitch}
                      >
                        <ArrowLeft className="text-gray-800 text-3xl md:text-4xl" />
                        <p className="text-gray-800 text-sm md:text-xl">
                          Previous
                        </p>
                      </Link>
                    )}
                  </div>

                  <div>
                    {nextProduct && (
                      <Link
                        to={"/product/" + nextProduct.id}
                        state={location.state}
                        className="flex flex-col items-center"
                        onClick={this.handleProductSwitch}
                      >
                        <ArrowRight className="text-gray-800 text-3xl md:text-4xl" />
                        <p className="text-gray-800 text-sm md:text-xl">Next</p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const ProductDetailPage: FC = () => {
  const params = useParams();
  const id = +(params.id || 1);
  const location = useLocation();
  const { addToCart } = useCart();

  return <ProductDetailPageClass id={id} location={location} addToCart={addToCart} />;
};

export default ProductDetailPage;
