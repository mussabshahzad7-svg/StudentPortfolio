
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Handle subject selection
  function handleSubject(e) {
    const { value, checked } = e.target;

    if (checked) {
      setSubjects([...subjects, value]);
    } else {
      setSubjects(subjects.filter((subject) => subject !== value));
    }
  }

  // Validate form
  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!age) {
      newErrors.age = "Age is required";
    } else if (Number(age) < 18 || Number(age) > 30) {
      newErrors.age = "Age must be between 18 and 30";
    }

    if (subjects.length === 0) {
      newErrors.subjects = "Please select at least one subject";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess("Student form submitted successfully!");

      console.log({
        name,
        age,
        subjects,
        address
      });

      setName("");
      setAge("");
      setSubjects([]);
      setAddress("");
    } else {
      setSuccess("");
    }
  }

  return (
    <div className="app-container">

      <header className="header">
        <h1>Student Registration Form</h1>
        <p>Web Engineering Laboratory - Task 1</p>
      </header>

      <section className="form-section">

        <h2>Enter Student Information</h2>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label>Student Name:</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && (
              <p className="error">{errors.name}</p>
            )}
          </div>

          {/* Age */}
          <div className="form-group">
            <label>Age:</label>

            <input
              type="number"
              placeholder="Enter your age (18-30)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            {errors.age && (
              <p className="error">{errors.age}</p>
            )}
          </div>

          {/* Subjects */}
          <div className="form-group">
            <label>Select Subjects:</label>

            <div className="subjects">
              {["Web", "OOP", "SDA"].map((subject) => (
                <label key={subject} className="subject-option">
                  <input
                    type="checkbox"
                    value={subject}
                    checked={subjects.includes(subject)}
                    onChange={handleSubject}
                  />
                  {subject}
                </label>
              ))}
            </div>

            {errors.subjects && (
              <p className="error">{errors.subjects}</p>
            )}
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address:</label>

            <textarea
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="4"
            />

            {errors.address && (
              <p className="error">{errors.address}</p>
            )}
          </div>

          <button type="submit" className="add-btn">
            Submit
          </button>

          {success && (
            <p className="success">{success}</p>
          )}

        </form>
      </section>

    </div>
  );
}

export default App;
