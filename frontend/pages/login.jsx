import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      username,
      password,
    };

    axios
      .post("/api/auth/login", payload)
      .then((response) => {
        router.push("/");
      })
      .catch((error) => {
        alert(error?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
