import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation/Navigation"

const ShopAppWrapper = () => {
  return (
      <div>
          <Navigation />
          <Outlet/>
      </div>
  )
}

export default ShopAppWrapper;