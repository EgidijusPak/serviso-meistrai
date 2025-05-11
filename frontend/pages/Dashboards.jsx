import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Dashboard() {
  const query = useQuery();
  const searchTerm = query.get("search")?.toLowerCase() || "";
  const [employees, setEmployees] = useState([]);

  const { user } = useAuth(); // <-- Access authenticated user here

  const handleLikeToggle = async (empId, hasLiked) => {
    if (!user) {
      toast.warn("You must be logged in to like or dislike an employee.");
      return;
    }

    const url = `http://localhost:5000/api/employees/${
      hasLiked ? "dislike" : "like"
    }/${empId}`;

    try {
      await axios.post(url, { userId: user._id });

      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === empId
            ? {
                ...emp,
                emp_rating: hasLiked ? emp.emp_rating - 1 : emp.emp_rating + 1,
                likedBy: hasLiked
                  ? emp.likedBy.filter((id) => id !== user._id)
                  : [...emp.likedBy, user._id],
              }
            : emp
        )
      );

      toast.success(
        `Employee ${hasLiked ? "disliked" : "liked"} successfully!`
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        setEmployees(res.data);
      } catch (error) {
        console.error("Failed to load employees", error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    `${emp.emp_fname} ${emp.emp_lname}`.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="worker-grid">
      {filteredEmployees.map((emp) => (
        <div className="worker-card" key={emp._id}>
          <button
            className="like-button"
            onClick={() =>
              handleLikeToggle(emp._id, emp.likedBy?.includes(user?._id))
            }
            title={emp.likedBy?.includes(user?._id) ? "Dislike" : "Like"}
          >
            {emp.likedBy?.includes(user?._id) ? "❤️" : "🤍"}
          </button>
          <img src={emp.emp_photo} alt={`${emp.emp_fname} ${emp.emp_lname}`} />
          <h3>
            {emp.emp_fname} {emp.emp_lname}
          </h3>
          <p>
            <strong>Position:</strong> {emp.emp_position}
          </p>
          <p>
            <strong>Address:</strong> {emp.emp_address}
          </p>
          <p>
            <strong>Rating:</strong> {emp.emp_rating}
          </p>
        </div>
      ))}
    </div>
  );
}
