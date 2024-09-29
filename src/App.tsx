import { useState, useEffect } from 'react'
import './App.css'

interface Project {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  description: string;
}

function App() {  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc')
      .then((response) => {
        response.json().then((data) => setProjects(data.items));
        setError(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => setLoading(false))
  }, []);

  return (
    <div className='app-wrapper'>
      <h1>Top TypeScript Projects on GitHub</h1>
      {loading && <div className='loading'>Loading...</div>}
      {error && <div className='error'>Something went wrong</div>}
      {!loading && !error && (
        <div className='list'>
          {projects.map((project) => (
            <div key={project.id} className='list-item'>
              <a href={project.html_url} target="_blank">
                {project.name}
              </a>
              <p>⭐ {project.stargazers_count}</p>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
