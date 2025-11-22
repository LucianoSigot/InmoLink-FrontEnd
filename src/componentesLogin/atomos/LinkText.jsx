import { useNavigate } from "react-router-dom";

export const LinkText = ({ text, linkText, to }) => {
    const navigate = useNavigate();
    const baseStyles = 'text-blue-600 hover:underline cursor-pointer';
    return (
        <p className="text-center text-sm text-gray-600">
            {text}{" "}
            <span className="text-blue-600 hover:underline cursor-pointer ml-1" onClick={()=> navigate(to)}>
                {linkText}
            </span>
        </p>
    );
}