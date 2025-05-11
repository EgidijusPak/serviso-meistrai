import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const positions = [
  "Mechanic",
  "Manager",
  "Receptionist",
  "Technician",
  "Cleaner",
];

export default function ShowWorkers() {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    emp_fname: "",
    emp_lname: "",
    emp_address: "",
    emp_position: "",
    emp_photo: "",
    emp_rating: 0,
  });
  const [error, setError] = useState("");
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (employee) => {
    setIsEditing(employee._id);
    setFormData({
      emp_fname: employee.emp_fname,
      emp_lname: employee.emp_lname,
      emp_address: employee.emp_address,
      emp_position: employee.emp_position,
      emp_photo: employee.emp_photo,
      emp_rating: employee.emp_rating,
    });
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "Error deleting employee");
        return;
      }

      toast.success("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateForm = () => {
    setError("");

    if (
      !formData.emp_fname ||
      !formData.emp_lname ||
      !formData.emp_address ||
      !formData.emp_position ||
      !formData.emp_photo
    ) {
      setError("All fields are required!");
      return false;
    }

    if (!/^https:\/\//.test(formData.emp_photo)) {
      setError("Photo URL must begin with 'https://'");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/employees/${isEditing}`,
        formData
      );
      setIsEditing(null);
      setFormData({
        emp_fname: "",
        emp_lname: "",
        emp_address: "",
        emp_position: "",
        emp_photo: "",
        emp_rating: 0,
      });
      setError("");

      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error updating employee", err);
    }
  };

  const closeModal = () => {
    setIsEditing(null);
  };

  return (
    <div>
      <h2>Employees</h2>
      <div>
        {employees.map((employee) => (
          <div key={employee._id} className="employee-card">
            <img
              src={employee.emp_photo}
              alt={`${employee.emp_fname} ${employee.emp_lname}`}
            />
            <div>
              <h3>
                {employee.emp_fname} {employee.emp_lname}
              </h3>
              <p>Position: {employee.emp_position}</p>
              <p>Address: {employee.emp_address}</p>
              <p>Rating: {employee.emp_rating}</p>
              <button onClick={() => handleEdit(employee)}>Edit</button>
              <button
                onClick={() => handleDelete(employee._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && <div className="modal-overlay" onClick={closeModal}></div>}

      {isEditing && (
        <div className="edit-modal">
          <div className="edit-form">
            <h3>Edit Employee</h3>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  name="emp_fname"
                  value={formData.emp_fname}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  name="emp_lname"
                  value={formData.emp_lname}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Address</label>
                <input
                  type="text"
                  name="emp_address"
                  value={formData.emp_address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Position</label>
                <select
                  name="emp_position"
                  value={formData.emp_position}
                  onChange={handleChange}
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Photo URL</label>
                <input
                  type="text"
                  name="emp_photo"
                  value={formData.emp_photo}
                  onChange={handleChange}
                />
              </div>

              <button type="submit">Update Employee</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
