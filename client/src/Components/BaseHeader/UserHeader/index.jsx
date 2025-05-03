import ReusableHeader from '@src/Components/BaseHeader/ReusableHeader';
import { useDispatch } from 'react-redux';
import { logout } from '@src/redux/slices/userSlice';
import { ErrorNotification, getActiveRole, removeToken, SuccessNotification } from '@src/utils';
import { Axios } from '@src/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    const activeRole = getActiveRole();
    try {
      setIsLoggingOut(true);
      if (!activeRole) throw new Error("No active role found.");

      await Axios.post(`/auth/logout`, { role: activeRole });

      removeToken(activeRole); // clear localStorage
      dispatch(logout()); // clear redux
      SuccessNotification("Logged out successfully!");
      navigate(`/login`);
    } catch (err) {
      console.error("Logout Error", err);
      ErrorNotification("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // const menuItems = [
  //   { label: 'Dashboard', to: '/dashboard' },
  //   { label: 'Reports', to: '/reports' },
  // ];

  return <ReusableHeader
    // menuItems={menuItems}
    showIcons={true}
    onLogout={handleLogout}
    isLoggingOut={isLoggingOut}
  />;
};

export default UserHeader;
