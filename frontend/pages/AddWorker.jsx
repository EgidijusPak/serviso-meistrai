import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const positions = [
  "Mechanic",
  "Manager",
  "Receptionist",
  "Cleaner",
  "Technician",
];

export function AddWorker() {
  const [formData, setFormData] = useState({
    emp_fname: "",
    emp_lname: "",
    emp_address: "",
    emp_position: "",
    emp_photo: "",
    emp_serviceName: "",
    emp_rating: 0,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.emp_fname.trim())
      newErrors.emp_fname = "First name is required";
    if (!formData.emp_lname.trim())
      newErrors.emp_lname = "Last name is required";
    if (!formData.emp_address.trim())
      newErrors.emp_address = "Address is required";
    if (!formData.emp_position) newErrors.emp_position = "Position is required";
    if (!formData.emp_serviceName)
      newErrors.emp_serviceName = "Name is required";
    if (!formData.emp_photo) newErrors.emp_photo = "Photo is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/employees", formData);
      toast.success("Employee added successfully!");
      setFormData({
        emp_fname: "",
        emp_lname: "",
        emp_address: "",
        emp_position: "",
        emp_photo: "",
        emp_serviceName: "",
        emp_rating: 0,
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("Failed to add employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="emp_fname"
          value={formData.emp_fname}
          onChange={handleChange}
        />
        {errors.emp_fname && <p className="error-text">{errors.emp_fname}</p>}
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="emp_lname"
          value={formData.emp_lname}
          onChange={handleChange}
        />
        {errors.emp_lname && <p className="error-text">{errors.emp_lname}</p>}
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="emp_address"
          value={formData.emp_address}
          onChange={handleChange}
        />
        {errors.emp_address && (
          <p className="error-text">{errors.emp_address}</p>
        )}
      </div>

      <div className="form-group">
        <label>Position</label>
        <select
          name="emp_position"
          value={formData.emp_position}
          onChange={handleChange}
        >
          <option value="">Select a position</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
        {errors.emp_position && (
          <p className="error-text">{errors.emp_position}</p>
        )}
      </div>

      <div className="form-group">
        <label>Serviso pavadinimas</label>
        <input
          type="text"
          name="emp_serviceName"
          value={formData.emp_serviceName}
          onChange={handleChange}
        />
        {errors.emp_serviceName && (
          <p className="error-text">{errors.emp_serviceName}</p>
        )}
      </div>

      <div className="form-group">
        <label>Photo URL (HTTPS)</label>
        <input
          type="text"
          name="emp_photo"
          value={formData.emp_photo}
          onChange={handleChange}
        />
        {errors.emp_photo && <p className="error-text">{errors.emp_photo}</p>}
      </div>

      <button type="submit" className="submit-btn">
        Add Employee
      </button>
    </form>
  );
}
