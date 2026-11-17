import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm tracking-tight">
            ST
          </span>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Support Ticket Admin Panel
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">Full Access · Ticket Operations</p>
          </div>
        </div>

        {/* User Info & Logout Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-xs font-bold text-slate-800">{user?.name || 'System Admin'}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">Admin</span>
            </div>
            <p className="text-[11px] text-slate-500">{user?.email}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-rose-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
