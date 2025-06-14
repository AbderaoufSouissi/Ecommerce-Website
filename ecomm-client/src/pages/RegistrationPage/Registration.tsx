import { NavLink, useNavigate } from "react-router-dom"
import coverImage from "../../assets/img/cover-image.jpg"
import googleImage from "../../assets/img/google_image.png"
import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { setLoading } from "../../store/features/common"
import EyeIcon from "../../components/common/EyeIcon"

interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}


const countryCodes = [
  { code: "+216", country: "Tunisia", flag: "🇹🇳" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+213", country: "Algeria", flag: "🇩🇿" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
];

const Registartion = () => {
  const [values, setValues] = useState<SignupCredentials>({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+216", // Default to Tunisia
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const[enableVerify,setEnableVerify] = useState<boolean>(false)

 const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError('');

  if (
    !values.firstName.trim() || !values.lastName.trim() || !values.email.trim() ||
    !values.phoneNumber.trim() || !values.password.trim() || !values.confirmPassword.trim()
  ) {
    setError("Please fill in all fields");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(values.email)) {
    setError("Please enter a valid email address");
    return;
  }

 
  const phoneRegex = /^[\d\s\-()]{8,}$/;
  if (!phoneRegex.test(values.phoneNumber)) {
    setError("Please enter a valid phone number");
    return;
  }

  if (values.password.length < 6) {
    setError("Password must be at least 6 characters long");
    return;
  }

  if (values.password !== values.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  dispatch(setLoading(true));

  
  const formattedPhoneNumber = `${values.countryCode} ${values.phoneNumber}`;
  console.log("Formatted phone number:", formattedPhoneNumber);
  


  setTimeout(() => {
    dispatch(setLoading(false));
    navigate("/v1/login");
  }, 1000);
}, [values, dispatch, navigate]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);
  
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setValues(values => ({...values, [e.target.name]: e.target.value}));

    if (error) {
      setError("");
    }
  }, [error]);

  const handleCountryCodeSelect = useCallback((code: string) => {
    setValues(values => ({...values, countryCode: code}));
    setShowCountryDropdown(false);
    if (error) {
      setError("");
    }
  }, [error]);

  const selectedCountry = countryCodes.find(country => country.code === values.countryCode);

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
     
        <div className="w-full flex justify-center mb-8 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold">Dabchi</h1>
        </div>

       
        <div className="w-full flex flex-col max-w-[350px] sm:max-w-[400px]">
          
          <div className="w-full flex flex-col mt-1 mb-4 sm:mb-6 text-center">
            <p className="text-sm sm:text-base text-gray-500 mb-4 font-semibold">
              Create your account to get started
            </p>
          </div>

         
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="w-full flex flex-col">
            <div className="w-full flex flex-col">
             
              <div className="w-full flex gap-2">
                <input 
                  type="text" 
                  name="firstName" 
                  value={values.firstName} 
                  onChange={handleOnChange} 
                  placeholder="First Name" 
                  className="bg-transparent w-full text-black py-2 my-2 border-b outline-none focus:border-black transition-colors text-sm sm:text-base" 
                  required
                />
                <input 
                  type="text" 
                  name="lastName" 
                  value={values.lastName} 
                  onChange={handleOnChange} 
                  placeholder="Last Name" 
                  className="bg-transparent w-full text-black py-2 my-2 border-b outline-none focus:border-black transition-colors text-sm sm:text-base" 
                  required
                />
              </div>

              <input 
                type="email" 
                name="email" 
                value={values.email} 
                onChange={handleOnChange} 
                placeholder="Email" 
                className="bg-transparent w-full text-black py-2 my-2 border-b outline-none focus:border-black transition-colors text-sm sm:text-base" 
                required
              />
              
             
              <div className="w-full flex my-2 border-b focus-within:border-black transition-colors">
              
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="bg-transparent text-black py-2 pr-2 outline-none text-sm sm:text-base flex items-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="mr-1">{selectedCountry?.flag}</span>
                    <span>{values.countryCode}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                 
                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto w-64">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountryCodeSelect(country.code)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center text-sm"
                        >
                          <span className="mr-2">{country.flag}</span>
                          <span className="mr-2">{country.code}</span>
                          <span className="text-gray-600">{country.country}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Phone Number Input */}
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  value={values.phoneNumber} 
                  onChange={handleOnChange} 
                  placeholder="Phone Number" 
                  className="bg-transparent flex-1 text-black py-2 pl-2 outline-none text-sm sm:text-base" 
                  required
                />
              </div>
              
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  value={values.password} 
                  onChange={handleOnChange} 
                  placeholder="Password" 
                  className="bg-transparent w-full text-black py-2 my-2 border-b outline-none focus:border-black transition-colors text-sm sm:text-base pr-10"
                  required 
                />
                <EyeIcon 
                  isVisible={showPassword} 
                  onClick={togglePasswordVisibility} 
                />
              </div>
              
              <div className="relative w-full">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword" 
                  value={values.confirmPassword} 
                  onChange={handleOnChange} 
                  placeholder="Confirm Password" 
                  className="bg-transparent w-full text-black py-2 my-2 border-b outline-none focus:border-black transition-colors text-sm sm:text-base pr-10"
                  required 
                />
                <EyeIcon 
                  isVisible={showConfirmPassword} 
                  onClick={toggleConfirmPasswordVisibility} 
                />
              </div>
            </div>
            
            <div className="w-full flex flex-col items-center mt-4">
              <button 
                type="submit"
                className="w-full bg-black border-1 rounded-md p-3 sm:p-4 my-2 font-semibold text-white text-center text-sm sm:text-base flex items-center justify-center cursor-pointer hover:text-black hover:bg-white duration-200"
              >
                Create Account
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
      
     
        <div className="w-full flex items-center justify-center mt-8 lg:mt-0">
          <p className="text-xs sm:text-sm font-normal text-black text-center">
            Already have an account?
            <NavLink  
              className="font-semibold cursor-pointer underline underline-offset-4 transition-all duration-300 hover:text-blue-600 ml-1" 
              to={"/v1/login"}
            > 
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
    )
}
export default Registartion