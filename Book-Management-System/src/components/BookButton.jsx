import { Link } from "react-router-dom"

export default function BookButton({ title, color, link, onClick }) {
  return (
    <Link to={link}>
      <button
        onClick={onClick}
        className="rounded-lg p-2 m-2 hover:brightness-110 active:scale-95 transition-all duration-200 font-outfit text-lg shadow-md bg-green-200"
        
      >
        {title}
      </button>
    </Link>
  );
}