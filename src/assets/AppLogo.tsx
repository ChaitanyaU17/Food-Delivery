const AppLogo = ({
  width = 140,
  height = 40,
}: {
  width?: number;
  height?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 140 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 4C16 4 10 12 10 18C10 24.627 12.686 28 16 28C19.314 28 22 24.627 22 18C22 12 16 4 16 4Z"
      fill="#E23744"
    />
    <path
      d="M16 14C16 14 13 18 13 21C13 23.209 14.343 25 16 25C17.657 25 19 23.209 19 21C19 18 16 14 16 14Z"
      fill="#FC8019"
    />
    <text
      x="30"
      y="26"
      fontFamily="Poppins, sans-serif"
      fontWeight="700"
      fontSize="18"
      fill="#E23744"
    >
      Spice Route
    </text>
  </svg>
);

export default AppLogo;