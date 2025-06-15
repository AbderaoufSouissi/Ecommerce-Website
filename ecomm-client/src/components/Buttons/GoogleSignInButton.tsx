import { useCallback } from "react";
import googleImage from "../../assets/img/google_image.png";
import { API_BASE_URL } from "../../api/constant";



const GoogleSignInButton = () => {
  const handleOnClick = useCallback(()=>{window.location.href = API_BASE_URL + "/oauth2/authorization/google"},[])
    

  return (
    <button 
      type="button"
      onClick={handleOnClick}
      className={`w-full bg-white border border-gray-300 rounded-md p-3 sm:p-4 my-2 font-semibold text-black text-center text-sm sm:text-base flex items-center justify-center cursor-pointer hover:bg-gray-200 duration-200`}
    >
      <img 
        className="h-5 sm:h-6 mr-2" 
        src={googleImage} 
        alt="google-image" 
      />
      Google
    </button>
  );
};

export default GoogleSignInButton;