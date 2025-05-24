type FavoriteIconProps = {
  filled?: boolean;
  size?: number;
  color?: string;
  onClick?: () => void;
  className?: string;
};

const FavoriteIcon = ({
  filled = false,
  size = 26,
  color = "red",
  onClick,
}: FavoriteIconProps) => {
  return (
    <div
      onClick={onClick}
      className={"flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 cursor-pointer"}

    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={filled ? color : "none"}
        viewBox="0 0 24 24"
        stroke={color}
        strokeWidth={2}
        width={size}
        height={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            filled
              ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              : "M16.5 3c-1.74 0-3.41 0.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"
          }
        />
      </svg>
    </div>
  );
};

export default FavoriteIcon;
