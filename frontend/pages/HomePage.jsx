import EmployeeCarousel from "../components/ImageCarousel";

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Our Top Employees
      </h1>
      <EmployeeCarousel />
    </div>
  );
}
