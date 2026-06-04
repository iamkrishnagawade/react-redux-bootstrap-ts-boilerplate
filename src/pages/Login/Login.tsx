import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import React, { useState } from "react";
import { authApi } from "../../features/auth/authApi";
import { storage } from "../../services/storage";
import { login } from "../../features/auth/authSlice";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await authApi.login(email, password);
      storage.setAccessToken(data.access_token);
      storage.setRefreshToken(data.refresh_token);

      dispatch(
        login({
          id: data.user.id,
          email: data.user.email,
        }),
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="form-control mb-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
