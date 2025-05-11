import Employee from "../models/Employee.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const saved = await newEmployee.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Employee not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeEmployee = async (req, res) => {
  const { userId } = req.body;
  const empId = req.params.id;

  console.log("Request received for emp_id:", empId);

  try {
    const employee = await Employee.findById(empId);

    if (!employee) {
      console.log("Employee not found for emp_id:", empId);
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("Employee found:", employee);

    if (employee.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You already liked this employee" });
    }

    employee.likedBy.push(userId);
    employee.emp_rating += 1;
    await employee.save();

    res.status(200).json({ message: "Employee liked", employee });
  } catch (error) {
    console.error("Error liking employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLikedEmployees = async (req, res) => {
  const { userId } = req.params;

  try {
    const employees = await Employee.find({ likedBy: userId });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dislikeEmployee = async (req, res) => {
  const { userId } = req.body;
  const { id: empId } = req.params;

  try {
    const employee = await Employee.findById(empId);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    if (!employee.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have not liked this employee" });
    }

    employee.likedBy = employee.likedBy.filter(
      (id) => id.toString() !== userId
    );
    employee.emp_rating = employee.emp_rating - 1;
    await employee.save();

    res.json({ message: "Employee disliked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
