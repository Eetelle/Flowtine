import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/user/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl mb-4">Cours disponibles</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id} className="mb-3 p-3 bg-gray-100 rounded">
            <h3 className="font-bold">{course.title}</h3>
            <a href={course.video} className="text-blue-600" target="_blank" rel="noreferrer">Voir la vidéo</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;