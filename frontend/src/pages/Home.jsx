import { useState, useEffect } from 'react';
import axios from 'axios';

  

const Home = () => {

  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, []);

  const fetchTeachers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API}/teacher/get-teacher`);
    const teachers = response.data.teacher;
    if (teachers && Array.isArray(teachers)) {
      setTeacherCount(teachers.length);
    } else {
      setTeacherCount(0);
    }
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
};

 const fetchClasses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API}/class/get-class`);
      const classes = response.data.Class;
      if (classes && Array.isArray(classes)) {
        setClassCount(classes.length);
      } else {
        setClassCount(0);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  
  return (
    
    
    <>
      {/* Class Routine / Schedule System */}
      <section className="course">
        <h1>Class Routine / Schedule System</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="row">
          <div className="course-col">
            <h3>No of professors created so far.</h3>
            <h1>{teacherCount}</h1>
          </div>
          <div className="course-col">
            <h3>No of classes created so far.</h3>
            <h1>{classCount}</h1>
          </div>
          <div className="course-col">
            <h3>No of routines created.</h3>
            <h1>1</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
