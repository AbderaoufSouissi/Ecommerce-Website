import { NavLink, useNavigate } from "react-router-dom"
import coverImage from "../../assets/img/cover-image.jpg"
import googleImage from "../../assets/img/google_image.png"
import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import type { Credentials } from "../../api/types"
import { setLoading } from "../../store/features/common"
import { login } from "../../api/authentication"
import { saveToken } from "../../utils/jwt-helper"
import EyeIcon from "../../components/common/EyeIcon"

const Login = () => {
  const[values,setValues] = useState<Credentials>({username:"",password:""})
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  const navigate = useNavigate()

const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('')
    
    if (!values.username.trim() || !values.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

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
    if (error) {
      setError("");
    }
  }, [error]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-start">
      <div className="relative w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-screen flex flex-col">
        <div className="absolute top-[20%] sm:top-[25%] lg:top-[35%] left-[5%] sm:left-[8%] lg:left-[10%] flex flex-col z-10 px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-stone-50 font-bold my-2 lg:my-4 leading-tight">
            Tunisia's First Modern Minimal Style Clothing Brand
          </h1>
          <p className="text-lg sm:text-xl text-stone-50 font-semibold">
            Simplicity, crafted locally
          </p>
        </div>

        <img 
          src={coverImage} 
          alt="cover-image" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="w-full lg:w-1/2 bg-neutral-100 min-h-screen lg:h-screen flex flex-col p-6 sm:p-8 lg:p-12 xl:p-16 justify-between items-center">
        {/* LOGO */}
        <div className="w-full flex justify-center mb-8 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold">Dabchi</h1>
        </div>

      
        <div className="w-full flex flex-col max-w-[350px] sm:max-w-[400px]">
          
          <div className="w-full flex flex-col mb-4 sm:mb-6 text-center">
            <p className="text-sm sm:text-base text-gray-500 mb-4 font-semibold">
              Enter your email below to login to your account
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded">
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
                className="bg-transparent w-full text-black py-3 my-2 border-b outline-none focus:border-black transition-colors text-sm sm:text-base" 
                required
              />
              
           
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  value={values.password} 
                  onChange={handleOnChange} 
                  placeholder="Password" 
                  className="bg-transparent w-full text-black py-3 my-2 border-b outline-none focus:border-black transition-colors text-sm sm:text-base pr-10"
                  required 
                />
                <EyeIcon 
                  isVisible={showPassword} 
                  onClick={togglePasswordVisibility} 
                />
              </div>
            </div>

            <div className="w-full flex flex-row-reverse items-center justify-between mt-4">
              <p className="text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer hover:underline underline-offset-2">
                Forgot your password?
              </p>           
            </div>
            
            <div className="w-full flex flex-col items-center mt-6">
              <button 
                type="submit"
                className="w-full bg-black border-1 rounded-md p-3 sm:p-4 my-2 font-semibold text-white text-center text-sm sm:text-base flex items-center justify-center cursor-pointer hover:text-black hover:bg-white duration-200"
              >
                Login
              </button>
            </div>
          </form>

          <div className="w-full flex items-center justify-center relative my-6">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <p className="text-gray-500 text-xs sm:text-sm absolute bg-neutral-100 px-4">
              Or continue with
            </p>
          </div>

          <div className="w-full flex flex-col items-center">
            <button className="w-full bg-white border border-gray-300 rounded-md p-3 sm:p-4 my-2 font-semibold text-black text-center text-sm sm:text-base flex items-center justify-center cursor-pointer hover:bg-gray-200 duration-200">
              <img className="h-5 sm:h-6 mr-2" src={googleImage} alt="google-image" />
              Google
            </button>
          </div>
        </div>
      
        {/* Sign Up Link */}
        <div className="w-full flex items-center justify-center mt-2 lg:mt-0">
          <p className="text-xs sm:text-sm font-normal text-black text-center">
            Don't Have an account?
            <NavLink  
              className="font-semibold cursor-pointer underline underline-offset-4 transition-all duration-300 hover:text-blue-600 ml-1" 
              to={"/v1/register"}
            > 
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login