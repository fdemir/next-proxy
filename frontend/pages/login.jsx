import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const payload = {
      username,
      password
    }

    fetch('/api/login', {method: 'POST', body: payload})
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
    }).catch((e) => alert(e))
    
  }

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
        <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
