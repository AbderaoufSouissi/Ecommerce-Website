import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation/Navigation"
import Spinner from "../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store"; // Added 'type' keyword here

const ShopAppWrapper = () => {
  const isLoading = useSelector((state: RootState) => state.commonState?.loading)
  
  return (
    <div>
      <Navigation />
      <Outlet />
      {isLoading && <Spinner/>}
    </div>
  )
}

export default ShopAppWrapper;