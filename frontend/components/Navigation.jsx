import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const logout1 = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {isAuthenticated && user?.role !== "admin" && (
          <>
            <button onClick={() => navigate("/dashboard")}>Home page</button>
            <button
              onClick={() => navigate(`/liked-workers?userId=${user._id}`)}
            >
              My Liked Workers
            </button>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search worker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </>
        )}

        {isAuthenticated && user?.role === "admin" && (
          <>
            <button onClick={() => navigate("/admin/add-worker")}>
              Pridėti meistrą
            </button>
            <button onClick={() => navigate("/admin/show-workers")}>
              Visi meistrai
            </button>
          </>
        )}
      </div>

      <div className="nav-right">
        {isAuthenticated ? (
          <button onClick={logout1}>Logout</button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
