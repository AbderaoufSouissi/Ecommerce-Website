import { NavLink, useNavigate } from "react-router-dom"
import coverImage from "../../assets/img/cover-image.jpg"
import googleImage from "../../assets/img/google_image.png"
import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import type { Credentials } from "../../api/types"
import { setLoading } from "../../store/features/common"
import { login } from "../../api/authentication"
import { saveToken } from "../../utils/jwt-helper"

const Login = () => {
  const[values,setValues] = useState<Credentials>({username:"",password:""})
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const navigate = useNavigate()

const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('')
    
    // Add validation for empty fields
    if (!values.username.trim() || !values.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Optional: Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.username)) {
      setError("Please enter a valid email address");
      return;
    }
    
    dispatch(setLoading(true))
    login(values).then(res => {
      if (res?.token) {
        saveToken(res?.token)
        navigate("/")
      }
      else {
        setError("Invalid credentials. Please try again.")
      }
    }).catch(error => {
      // Handle different types of errors
      if (error.response?.status === 401) {
        setError("Invalid email or password");
      } else if (error.response?.status === 400) {
        setError("Please check your input and try again");
      } else {
        setError("Something went wrong. Please try again later.");
      }
      console.error("Login error:", error);
    })
    .finally(() => {
     dispatch(setLoading(false));
    });

  }, [dispatch,navigate,values]);
  
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setValues(values => ({...values, [e.target.name]: e.target.value}));
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  }, [error]);

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[35%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-stone-50 font-bold my-4">Tunisia's First Modern Minimal Style Clothing Brand</h1>
          <p className="text-xl text-stone-50 font-semibold">Simplicity, crafted locally</p>
        </div>

        <img src={coverImage} alt="cover-image" className="w-full h-full object-cover" />
      </div>

      <div className="w-1/2 bg-neutral-100 h-full flex flex-col p-25 justify-between items-center">
        {/* LOGO IMAGE */}
        <h1 className="text-6xl font-semibold">Dabchi</h1>
        <div className="w-full flex flex-col max-w-[350px]">
          
          <div className="w-full flex flex-col mb-2 text-center">
            {/* <h3 className="text-3xl font-semibold mb-2">Login</h3> */}
            <p className="text-base text-gray-500 mb-2 font-semibold">Enter your email below to login to your account</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-red-500 text-sm mb-2 text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="w-full flex flex-col">
            <div className="w-full flex flex-col">
              <input 
                type="email" 
                name="username" 
                value={values.username} 
                onChange={handleOnChange} 
                placeholder="Email" 
                className="bg-transparent w-full text-black py-2 my-2 border-b outline-none focus:border-black transition-colors" 
                required
              />
              <input 
                type="password" 
                name="password" 
                value={values.password} 
                onChange={handleOnChange} 
                placeholder="Password" 
                className="bg-transparent w-full text-black py-2 my-2 border-b outline-none focus:border-black transition-colors"
                required 
              />
            </div>

            <div className="w-full flex flex-row-reverse items-center justify-between">
              <p className="text-sm font-semibold whitespace-nowrap cursor-pointer hover:underline underline-offset-2">Forgot your password?</p>           
            </div>
            
            <div className="w-full flex flex-col items-center">
              <button 
                type="submit"
                className="w-full bg-black border-1 rounded-md p-4 my-2 font-semibold text-white text-center flex items-center justify-center cursor-pointer hover:text-black hover:bg-white duration-200"
              >
                Login
              </button>
            </div>
          </form>

          <div className="w-full flex items-center justify-center relative my-6">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <p className="text-gray-500 text-sm absolute bg-[#f5f5f5] px-4">Or continue with</p>
          </div>

          <div className="w-full flex flex-col items-center">
            <button className="w-full bg-white border border-gray-300 rounded-md p-4 my-2 font-semibold text-black text-center flex items-center justify-center cursor-pointer hover:bg-gray-200 duration-200">
              <img className="h-6 mr-2" src={googleImage} alt="google-image" />
              Google
            </button>
          </div>
        </div>
      
        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-black">Don't Have an account?
          <NavLink  className="font-semibold cursor-pointer underline underline-offset-4 transition-all duration-300 hover:text-blue-600" to={"/v1/register"}> Sign Up</NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login