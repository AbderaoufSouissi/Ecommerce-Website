import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import type { RootState } from "../store/store"
import Spinner from "../components/Spinner/Spinner"

const AuthWrapper = () => {

  const isLoading = useSelector((state: RootState) => state.commonState?.loading)
  return (
    <div>
      <Outlet />
      {isLoading && <Spinner/>}
    </div>
  )
}

export default AuthWrapper