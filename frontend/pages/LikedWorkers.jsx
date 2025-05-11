import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LikedWorkers() {
  const query = useQuery();
  const userId = query.get("userId");
  const [liked, setLiked] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!userId) return;
    fetchLiked();
  }, [userId]);

  const fetchLiked = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/employees/liked/${userId}`
      );
      setLiked(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load liked employees.");
    }
  };

  const handleLikeToggle = async (empId, hasLiked) => {
    if (!user) {
      toast.error("You must be logged in to like/dislike an employee.");
      return;
    }

    const url = `http://localhost:5000/api/employees/${
      hasLiked ? "dislike" : "like"
    }/${empId}`;

    try {
      await axios.post(url, { userId: user._id });

      setLiked((prev) =>
        prev
          .map((emp) =>
            emp._id === empId
              ? {
                  ...emp,
                  emp_rating: hasLiked
                    ? emp.emp_rating - 1
                    : emp.emp_rating + 1,
                  likedBy: hasLiked
                    ? emp.likedBy.filter((id) => id !== user._id)
                    : [...emp.likedBy, user._id],
                }
              : emp
          )
          // If disliked, remove from list
          .filter((emp) => (hasLiked ? emp._id !== empId : true))
      );
      toast.success(
        `Employee ${hasLiked ? "disliked" : "liked"} successfully!`
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("An error occurred while updating like status.");
    }
  };

  return (
    <div className="worker-grid">
      {liked.map((emp) => {
        const hasLiked = emp.likedBy?.includes(user?._id);
        return (
          <div key={emp._id} className="worker-card">
            <button
              className="like-button"
              onClick={() => handleLikeToggle(emp._id, hasLiked)}
              title={hasLiked ? "Dislike" : "Like"}
            >
              {hasLiked ? "❤️" : "🤍"}
            </button>
            <img src={emp.emp_photo} alt="" />
            <h3>
              {emp.emp_fname} {emp.emp_lname}
            </h3>
            <p>{emp.emp_position}</p>
            <p>Rating: ⭐ {emp.emp_rating}</p>
          </div>
        );
      })}
    </div>
  );
}
