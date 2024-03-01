import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "./SideNav";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/subject/get-subject`
      );
      setSubjects(response.data.Subject);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleAddSubject = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/subject/create-subject`,
        {
          name: newSubjectName,
        }
      );

      console.log("Subject added successfully:", response.data);

      // Fetch updated subject list after adding a new subject
      fetchSubjects();

      // Clear input field after successful submission
      setNewSubjectName("");
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/subject/delete-subject/${subjectId}`
      );

      console.log("Subject deleted successfully:", response.data);

      // Fetch updated subject list after deleting a subject
      fetchSubjects();
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

   const handleUpdateSubject = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API}/subject/update-subject/${selectedSubjectId}`,
        {
          name: newSubjectName,
        }
      );

      console.log("Subject updated successfully:", response.data);

      // Fetch updated subject list after updating a subject
      fetchSubjects();

      // Clear input field after successful submission
      setNewSubjectName("");
      setSelectedSubjectId(null);
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  const handleEditSubject = (subjectId, subjectName) => {
    setSelectedSubjectId(subjectId);
    setNewSubjectName(subjectName);
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
          <h1 className="recent-Articles">Subjeects List</h1>
        </div>
        <div className="report-body">
          <div className="report-topic-heading">
            <h3 className="t-op">semester</h3>
            <h3 className="t-op">Delete</h3>
            <h3 className="t-op">Update</h3>
          </div>
        <div className="items">
          {subjects.map((subject) => (
            <div className="item1" key={subject._id}>
              <h3 className="t-op-nextlvl">{subject.name}</h3>
              <button
                className="t-op-nextlvl label-tag"
                onClick={() => handleDeleteSubject(subject._id)}
              >
                Delete
              </button>
              <button
              className="t-op-nextlvl label-tag"
              onClick={() => handleEditSubject(subject._id, subject.name)}
            >
              Update
            </button>
            </div>
          ))}
        </div>
        </div>
         <div className="adding">
        <h3>{selectedSubjectId ? "Update Subject:" : "Add New Subject:"}</h3>
        <div className="input_data_teacher">
            <input
          type="text"
          placeholder="Name"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
        />
        <button onClick={selectedSubjectId ? handleUpdateSubject : handleAddSubject}>
          {selectedSubjectId ? "Update Subject" : "Add Subject"}
        </button>
        </div>
      </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Subject;
