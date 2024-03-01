import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherDep, setNewTeacherDep] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/teacher/get-teacher`
      );
      setTeachers(response.data.teacher);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleAddTeacher = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/teacher/create-teacher`,
        {
          name: newTeacherName,
          dep: newTeacherDep,
        }
      );

      console.log("Teacher added successfully:", response.data);

      // Fetch updated teacher list after adding a new teacher
      fetchTeachers();

      // Clear input fields after successful submission
      setNewTeacherName("");
      setNewTeacherDep("");
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };


  const handleDeleteTeacher = async (teacherId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/teacher/delete-teacher/${teacherId}`
      );

      console.log("Teacher deleted successfully:", response.data);

      // Fetch updated teacher list after deleting a teacher
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleUpdateTeacher = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API}/teacher/update-teacher/${selectedTeacherId}`,
        {
          name: newTeacherName,
          dep: newTeacherDep,
        }
      );

      console.log("Teacher updated successfully:", response.data);

      // Fetch updated teacher list after updating a teacher
      fetchTeachers();

      // Clear input fields after successful submission
      setNewTeacherName("");
      setNewTeacherDep("");
      setSelectedTeacherId(null);
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleEditTeacher = (teacherId, teacherName, teacherDep) => {
    setSelectedTeacherId(teacherId);
    setNewTeacherName(teacherName);
    setNewTeacherDep(teacherDep);
  };

  return (
    <div>
    <div className="main-container">
    <SideNav/>
    <div className="main">
      <div className="searchbar2">
        <input type="text" name="" id="" placeholder="Search" />
        <div className="searchbtn">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
            className="icn srchicn"
            alt="search-button"
          />
        </div>
      </div>
      <div className="box-container">
      </div>
      <div className="report-container">
        <div className="report-header">
          <h1 className="recent-Articles">Teachers List</h1>
        </div>
        <div className="report-body">
          <div className="report-topic-heading">
            <h3 className="t-op">Teacher Name</h3>
            <h3 className="t-op">Department</h3>
            <h3 className="t-op">Button</h3>
            <h3 className="t-op">Action</h3>
          </div>
          <div className="items">
            {teachers.map((teacher) => (
              <div className="item1" key={teacher._id}>
                <h3 className="t-op-nextlvl">{teacher.name}</h3>
                <h3 className="t-op-nextlvl">{teacher.dep}</h3>
                    <button
                className="t-op-nextlvl label-tag"
                onClick={() => handleDeleteTeacher(teacher._id)}
              >
                Delete
              </button>
              <button
              className="t-op-nextlvl label-tag"
              onClick={() => handleEditTeacher(teacher._id, teacher.name, teacher.dep)}
            >
              Update
            </button>
              </div>
            ))}
          </div>
        </div>
          <div className="adding">
        <h3>{selectedTeacherId ? "Update Teacher:" : "Add New Teacher:"}</h3>
        <div className="input_data_teacher">
            <input
          type="text"
          placeholder="Name"
          value={newTeacherName}
          onChange={(e) => setNewTeacherName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={newTeacherDep}
          onChange={(e) => setNewTeacherDep(e.target.value)}
        />
        <button onClick={selectedTeacherId ? handleUpdateTeacher : handleAddTeacher}>
          {selectedTeacherId ? "Update Teacher" : "Add Teacher"}
        </button>
        </div>
      </div>
      </div>
    </div>
  </div>
    </div>
  );
};

export default Teacher;