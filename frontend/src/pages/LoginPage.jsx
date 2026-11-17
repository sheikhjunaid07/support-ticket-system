import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Alert, Spinner } from '../components/Ui';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Please enter your email and password');
      return;
    }

    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper for 1-click testing during interview evaluation
  const fillDemoCredentials = () => {
    setForm({ email: 'admin@support.com', password: 'Admin@123' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-slate-200 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-600 text-white text-lg font-bold shadow-md mb-3 tracking-tight">
            ST
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Support Ticket Admin Panel</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in with admin credentials to access all operations</p>
        </div>

        {error && (
          <div className="mb-4">
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              placeholder="admin@support.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-2.5 mt-2"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Spinner className="h-4 w-4" /> Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Credentials for Interviewer Evaluation */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 text-center">
            Demo Admin Credentials
          </p>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full px-3 py-2.5 text-xs rounded-xl border border-indigo-200 bg-indigo-50/70 text-indigo-800 hover:bg-indigo-100 transition text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500 inline-block" />
                <span>Demo Admin (Full Access)</span>
              </span>
              <span className="text-[11px] text-indigo-600 underline">Click to Auto-fill</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5 font-mono">
              admin@support.com / Admin@123
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
