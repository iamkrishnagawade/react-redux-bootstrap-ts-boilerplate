import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mt-5">
      <h1>404</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFound;
