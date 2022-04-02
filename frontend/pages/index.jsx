import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        await axios.get("/api/protected");
        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
      }
    };

    fetchProtected();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setLoggedIn(false);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return loggedIn ? (
    <div>
      <h2>You're logged in!</h2>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div>
      <Link href="/login" passHref>
        <button>Login</button>
      </Link>
    </div>
  );
}
