import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="surface-bg fixed top-0 z-20 w-full border-soft shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between p-4">
        <Link to={token ? "/dashboard" : "/login"}>
          <span className="text-2xl font-semibold text-main">DailyForge</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl transition-all duration-200 cursor-pointer hover:bg-[var(--accent)]/20"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun size={20} className="text-main" />
            ) : (
              <Moon size={20} className="text-main" />
            )}
          </button>

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-muted hover:text-main transition-colors font-medium cursor-pointer"
              >
                Login
              </Link>

              <Link to="/signup" className="btn btn-primary cursor-pointer">
                Signup
              </Link>
            </>
          ) : (
            <button onClick={logout} className="btn btn-primary px-4 py-2 cursor-pointer">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
