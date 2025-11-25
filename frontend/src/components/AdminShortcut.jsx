import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminShortcut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      // Ctrl + Shift + A
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/admin/login');
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  return null;
};

export default AdminShortcut;
