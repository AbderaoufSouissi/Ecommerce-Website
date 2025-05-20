const Wishlist = () => {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      className="group transition-colors duration-200"
    >
      <rect width="44" height="44" rx="8" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 32s-10-6.6-10-14c0-3.3 2.7-6 6-6 2.1 0 4 1.1 5 2.7C24 13.1 25.9 12 28 12c3.3 0 6 2.7 6 6 0 7.4-10 14-10 14z"
        className="fill-white stroke-black group-hover:fill-red-500 group-hover:stroke-transparent transition-colors duration-200"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Wishlist;
