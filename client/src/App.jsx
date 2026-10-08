import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { API_BASE } from "./API_BASE";
function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [course, setCourse] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/students`)
      .then((res) => {
        setStudents(res.data);
        console.log(res);
      })
      .catch((err) => console.log("error: " + err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE}/students`, { name, course, age })
      .then((res) => {
        window.location.reload();
        console.log(res);
        setName();
        setCourse();
        setAge();
        setMessage("Student added successfully");
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (id) => {
    console.log(id);
    setIsEdit(true);
    setSelectedId(id);
    axios
      .get(`${API_BASE}/students/${id}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setCourse(res.data.course);
        setAge(res.data.age);
      })
      .catch((err) => console.log(err));
  };

  const updateRecord = (e) => {
    e.preventDefault();
    axios
      .put(`${API_BASE}/students/${selectedId}`, {
        name,
        course,
        age,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
        setName();
        setCourse();
        setAge();
        setSelectedId();
        setMessage("Student updated successfully");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`${API_BASE}/students/${id}`)
      .then((res) => {
        window.location.reload();
        setMessage("Student deleted successfully");
      })
      .catch((err) => console.log(err));
  };

  const resetValues = () => {
    setName();
    setCourse();
    setAge();
    setSelectedId();
    setMessage();
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <h2>{isEdit ? "Edit" : "Add"} Student</h2>
      <form onSubmit={isEdit ? updateRecord : handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter Course"
          onChange={(e) => setCourse(e.target.value)}
          value={course || ""}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Enter Age"
          onChange={(e) => setAge(e.target.value)}
          value={age || ""}
        />
        <br />
        <br />

        <button type="submit">{isEdit ? "Update" : "Add"} Student</button>
        {isEdit ? <button onClick={resetValues}>Cancel</button> : null}
      </form>
      <p>{message}</p>
      <br />
      <br />
      <h2>Student List</h2>
      {Array.isArray(students)
        ? students.map((student, index) => {
            return (
              <div key={index}>
                <p>Name: {student.name}</p>
                <p>Course: {student.course}</p>
                <p>Age: {student.age}</p>
                <div>
                  <button
                    type="button"
                    onClick={() => handleUpdate(student._id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;
