const CartIcon = () => {
  return (
    <div className="w-11 h-11 rounded-md bg-transparent transition-colors duration-200 flex items-center justify-center">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200"
      >
        <path
          d="M16 14h1.5l1.6 8h10.4l1.6-6H19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-none group-hover:fill-black transition-colors duration-200"
        />
        <circle
          cx="20"
          cy="30"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="fill-none group-hover:fill-black transition-colors duration-200"
        />
        <circle
          cx="28"
          cy="30"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="fill-none group-hover:fill-black transition-colors duration-200"
        />
      </svg>
    </div>
  );
};

export default CartIcon;