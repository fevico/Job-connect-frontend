import { Link } from "react-router-dom";

const CustomButton = ({ link, text, onClick }) => {
  const ButtonComponent = link ? (
    // If link prop is provided, render a React Router Link
    <Link
      to={link}
      className="py-1 px-4 font-medium text-white text-[12px] lg:text-[16px] text-center border-[#ACD4FF] hover:bg-blue-500 rounded-2xl border-2 bg-primary"
    >
      {text}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className="py-1 px-4 font-medium text-white text-[12px] lg:text-[16px] text-center border-[#ACD4FF] hover:bg-blue-500 rounded-2xl border-2 bg-primary"
    >
      {text}
    </button>
  );

  return ButtonComponent;
};

export default CustomButton;
