import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCartItemsData } from "../store/cartSlice";
import CartRow from "./CartRow";
import { type FC } from "react";

const CartList: FC = () => {
  const cartItemsData = useSelector(selectCartItemsData);

  const rows = useMemo(
    function () {
      return cartItemsData.map(function (item) {
        return <CartRow key={item.id} item={item} />;
      });
    },
    [cartItemsData]
  );

  return (
    <div className="bg-white overflow-hidden">
      <div className="divide-y divide-gray-300">{rows}</div>
    </div>
  );
}

export default memo(CartList);
