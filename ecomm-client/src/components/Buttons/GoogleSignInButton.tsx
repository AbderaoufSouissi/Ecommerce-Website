import googleImage from "../../assets/img/google_image.png";

interface GoogleSignInButtonProps {
  onClick?: () => void;
  className?: string;
}

const GoogleSignInButton = ({ onClick, className = ""}: GoogleSignInButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log("Google Sign-In clicked");
    }
  };

  return (
    <button 
      type="button"
      onClick={handleClick}
      className={`w-full bg-white border border-gray-300 rounded-md p-3 sm:p-4 my-2 font-semibold text-black text-center text-sm sm:text-base flex items-center justify-center cursor-pointer hover:bg-gray-200 duration-200 ${className}`}
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