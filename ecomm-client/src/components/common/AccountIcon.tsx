const AccountIcon = () => {
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
        stroke="black"
        strokeWidth="1.5"
        className="fill-white group-hover:fill-black transition-colors duration-200"
        d="M22 22c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"
      />
      <path
        stroke="black"
        strokeWidth="1.5"
        className="fill-white group-hover:fill-black transition-colors duration-200"
        d="M14 32c0-4 4-6 8-6s8 2 8 6v2H14v-2z"
      />
    </svg>
  );
};

export default AccountIcon;
