import { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "./SideNav";

const Routine = () => {
  const [routines, setRoutines] = useState([]);
  const [newDay, setNewDay] = useState("");
  const [newPeriod, setNewPeriod] = useState("");
  const [newClassId, setNewClassId] = useState("");
  const [newSubjectId, setNewSubjectId] = useState("");
  const [newTeacherId, setNewTeacherId] = useState("");
  const [selectedRoutineId, setSelectedRoutineId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [subject, setSubject] = useState([]);


  const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const handelClasses = async () => {
  try {
    const c = await axios.get(
      `${import.meta.env.VITE_APP_API}/class/get-class`
    );
    console.log(c.data.Class);  // Log the actual data returned from the API
    setClasses(c?.data?.Class);  // Set the classes state with the data
  } catch (error) {
    console.log(error);
  }
};

const handelTeacher = async () =>{
    try{
        const t = await axios.get(
            `${import.meta.env.VITE_APP_API}/teacher/get-teacher`
        );
    }catch (error){
        console.log(error);
    }
};


useEffect(() =>{
    handelClasses();
},[])

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/routine/get-routine`
      );
      setRoutines(response.data.Routine);
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };

  const handleAddRoutine = async () => {
    console.log(newDay, newPeriod, newClassId)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/routine/create-routine`,
        {
          day: newDay,
          period: newPeriod,
          classes: newClassId,
          subject: newSubjectId,
          teacher: newTeacherId,
        }
      );

      console.log("Routine added successfully:", response.data);

      // Fetch updated routine list after adding a new routine
      fetchRoutines();

      // Clear input fields after successful submission
      setNewDay("");
      setNewPeriod("");
      setNewClassId("");
      setNewSubjectId("");
      setNewTeacherId("");
    } catch (error) {
      console.error("Error adding routine:", error);
    }
  };

  console.log(classes)

  const handleDeleteRoutine = async (routineId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/routine/delete-routine/${routineId}`
      );

      console.log("Routine deleted successfully:", response.data);

      // Fetch updated routine list after deleting a routine
      fetchRoutines();
    } catch (error) {
      console.error("Error deleting routine:", error);
    }
  };

  const handleUpdateRoutine = async () => {
    try {
      // Check for teacher availability conflicts before updating
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/routine/get-routine-branch/${newTeacherId}`
      );

      const teacherRoutines = response.data.Routine;

      const hasConflict = teacherRoutines.some(
        (routine) =>
          routine._id !== selectedRoutineId &&
          routine.day === newDay &&
          routine.period === newPeriod
      );

      if (hasConflict) {
        alert("Teacher has a conflict at the selected day and period. Please choose a different time.");
        return;
      }

      const updateResponse = await axios.put(
        `${import.meta.env.VITE_APP_API}/routine/update-routine/${selectedRoutineId}`,
        {
          day: newDay,
          period: newPeriod,
          classes: newClassId,
          subject: newSubjectId,
          teacher: newTeacherId,
        }
      );

      console.log("Routine updated successfully:", updateResponse.data);

      // Fetch updated routine list after updating a routine
      fetchRoutines();

      // Clear input fields after successful submission
      setNewDay("");
      setNewPeriod("");
      setNewClassId("");
      setNewSubjectId("");
      setNewTeacherId("");
      setSelectedRoutineId(null);
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  const handleEditRoutine = (routine) => {
    setSelectedRoutineId(routine._id);
    setNewDay(routine.day);
    setNewPeriod(routine.period);
    setNewClassId(routine.classes);
    setNewSubjectId(routine.subject);
    setNewTeacherId(routine.teacher);
  };

  return (
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
          <h1 className="recent-Articles">Routine List</h1>
        </div>
        <div className="report-body">
          <div className="report-topic-heading">
            <h3 className="t-op">Day</h3>
            <h3 className="t-op">Time</h3>
            <h3 className="t-op">Action</h3>
          </div>
        
      <div className="items">
        {routines.map((routine) => (
          <div className="item1" key={routine._id}>
            <h3 className="t-op-nextlvl">{routine.day}</h3>
            <h3 className="t-op-nextlvl">{routine.period}</h3>
            {/* Include additional details as needed */}
            <button
              className="t-op-nextlvl label-tag"
              onClick={() => handleDeleteRoutine(routine._id)}
            >
              Delete
            </button>
            <button
              className="t-op-nextlvl label-tag"
              onClick={() => handleEditRoutine(routine)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
      {/* ... (your existing code) */}
      </div>
      <div>
        <h3>{selectedRoutineId ? "Update Routine:" : "Add New Routine:"}</h3>
        <div className="input_data_teacher">
            <input
          type="text"
          placeholder="Day"
          value={newDay}
          onChange={(e) => setNewDay(e.target.value)}
        />
        <input
          type="text"
          placeholder="Period"
          value={newPeriod}
          onChange={(e) => setNewPeriod(e.target.value)}
        />
        <select
          id="year-select"
          onChange={(e) => {
            console.log(e.target.value,"hello")
            setNewClassId(e.target.value)}}
          value={newClassId}
        >
          {classes?.map((semester) => (
            <option key={semester._id} value={semester._id}>
              {semester.name}
            </option>
          ))}
        </select>
        {/* Include additional input fields for class, subject, teacher */}
        <button onClick={selectedRoutineId ? handleUpdateRoutine : handleAddRoutine}>
          {selectedRoutineId ? "Update Routine" : "Add Routine"}
        </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Routine;
