import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "../src/EmployeeCarousel.css";

const EmployeeCarousel = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // for mobile
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024, // for tablet
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {employees.map((emp) => (
          <div className="carousel-card" key={emp._id}>
            <img
              className="carousel-image"
              src={emp.emp_photo}
              alt={`${emp.emp_fname} ${emp.emp_lname}`}
            />
            <div className="carousel-info">
              <h3>
                {emp.emp_fname} {emp.emp_lname}
              </h3>
              <p>{emp.emp_position}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EmployeeCarousel;
