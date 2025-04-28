import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const API_URL = 'http://localhost:3500/students';

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchErorr, setfetchError] = useState(null);
  
  useEffect(()=>{
    const fetchStudents = async() =>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Server error: Failed to fetch data');
  
        const data = await response.json();
        setStudents(data);
      }
      catch(error){
        setfetchError(error.message);
      }
      finally{
        setLoading(false)
      }
    };
    setTimeout(()=>{
      fetchStudents();}, 3000)
  })
  return(
    <section>
    <div className="App">
    <h1>Student List</h1>
    {loading && <p>Loading data...</p>}
    {fetchErorr && <p style={{ color: 'red' }}>Error: {fetchErorr}</p>}
    {!loading && !fetchErorr && (
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.name} - {student.age} years old</li>
        ))}
      </ul>
    )}
  </div>
  </section>
  )
}
export default App;
