const FilterIcon = ({
  width = 20,
  height = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`filter-icon ${className}`}
      {...props}
    >
      {/* Three horizontal lines with different lengths to represent filtering */}
      <path d="M3 6H17" />
      <path d="M6 10H14" />
      <path d="M9 14H11" />
    </svg>
  );
};

export default FilterIcon;