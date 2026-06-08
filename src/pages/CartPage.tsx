import { Link, useLocation } from "react-router-dom";
import { useEffect, type FC } from "react";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItemsData,
  selectCartLoading,
  resetPendingQuantities,
} from "../store/cartSlice";
import CartDetail from "../components/CartDetail";
import EmptyCart from "../components/EmptyCart";
import Loading from "../components/Loading";

const CartPage: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItemsData = useSelector(selectCartItemsData);
  const loading = useSelector(selectCartLoading);

  useEffect(
    function () {
      return function () {
        dispatch(resetPendingQuantities());
      };
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col md:px-8 pb-8">
      <Link to={location?.state?.from || "/"} className="self-end">
        <ArrowLeft className="text-gray-800 text-3xl md:text-4xl" />
      </Link>
      {loading && (
        <div className="flex justify-center items-center h-[80vh]">
          <Loading />
        </div>
      )}
      {!loading && (
        <div className="flex-1 bg-white p-4">
          {cartItemsData.length > 0 && <CartDetail />}
          {cartItemsData.length == 0 && <EmptyCart />}
        </div>
      )}
    </div>
  );
}

export default CartPage;
