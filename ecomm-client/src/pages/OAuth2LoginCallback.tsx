import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLoading } from "../store/features/common"
import { saveToken } from "../utils/jwt-helper"

const OAuth2LoginCallback = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleOAuthLogin = async () => {
      dispatch(setLoading(true))

      const params = new URLSearchParams(window.location.search)
      const token = params.get("token")

      if (token) {
        saveToken(token)
        // ⏳ Add 2-second delay before navigating
        await new Promise((resolve) => setTimeout(resolve, 2000))
        navigate("/")
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        navigate("/v1/login")
      }

      dispatch(setLoading(false))
    }

    handleOAuthLogin()
  }, [navigate, dispatch])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mb-4"></div>
      <p className="text-center text-gray-700 font-medium text-lg">
        Logging you in...
      </p>
    </div>
  )
}

export default OAuth2LoginCallback
