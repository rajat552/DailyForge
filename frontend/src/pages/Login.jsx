import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  // input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // feedback states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // useNavigate object
  const navigate = useNavigate();

  // useContext for auth
  const { setUser, setToken } = useContext(AuthContext);

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // save token in localstorage for later api calls
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      // get user details
      const me = await api.get("/auth/me");
      setUser(me.data);

      // redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // login component
  return (
    <form
      className="
        surface-bg px-10 py-15 rounded-2xl
        w-full max-w-sm
        flex flex-col gap-6 animate-in
      "
      onSubmit={handleSubmit}
    >
      <div className="text-center space-y-1 mb-3">
        <h1 className="text-3xl font-bold text-main">Login</h1>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-main">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="user@email.com"
          required
          className="
            w-full px-3 py-2.5
            text-sm
            surface-bg
            border-soft
            rounded-sm
            shadow-xs
            input-focus
            hover-lift
          "
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-main">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="••••••••"
          required
          className="
            w-full px-3 py-2.5
            text-sm
            surface-bg
            border-soft
            rounded-base
            shadow-xs
            input-focus
            hover-lift
          "
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary cursor-pointer w-full mt-2 hover-lift disabled:opacity-60"
      >
        {loading ? "Logging in…" : "Login"}
      </button>

      {error && (
        <p className="text-center text-sm text-red-500 mt-2 animate-in">
          {error}
        </p>
      )}

      <p className="text-center text-sm text-muted">
        Don't have an account?{" "}
        <span
          onClick={() => {
            navigate("/signup");
          }}
          className="text-main font-medium cursor-pointer hover:underline transition-colors"
        >
          Sign up
        </span>
      </p>
    </form>
  );
};

export default Login;
