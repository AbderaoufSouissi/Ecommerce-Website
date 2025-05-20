const CartIcon = () => {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group transition-colors duration-200"
    >
      <rect width="44" height="44" rx="8" fill="white" />
      <path
        d="M16 14h1.5l1.6 8h10.4l1.6-6H19"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-white group-hover:fill-black transition-colors duration-200"
      />
      <circle
        cx="20"
        cy="30"
        r="1.5"
        stroke="black"
        strokeWidth="1.5"
        className="fill-white group-hover:fill-black transition-colors duration-200"
      />
      <circle
        cx="28"
        cy="30"
        r="1.5"
        stroke="black"
        strokeWidth="1.5"
        className="fill-white group-hover:fill-black transition-colors duration-200"
      />
    </svg>
  );
};

export default CartIcon;
