// UserHeader.jsx
import ReusableHeader from '@src/Components/BaseHeader/ReusableHeader';
import { useDispatch } from 'react-redux';
import { logout } from '@src/redux/slices/userSlice';
import { ErrorNotification, getActiveRole, removeToken, SuccessNotification } from '@src/utils';
import { Axios } from '@src/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BasePopup from '@src/Components/UI/BasePopup';

const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(false);
  const [weeklyReminder, setWeeklyReminder] = useState(false);

  const handleLogout = async () => {
    const activeRole = getActiveRole();
    try {
      setIsLoggingOut(true);
      if (!activeRole) throw new Error("No active role found.");

      await Axios.post('/auth/logout', { role: activeRole });
      removeToken(activeRole);
      dispatch(logout());
      SuccessNotification("Logged out successfully!");
      navigate('/login');
    } catch (err) {
      console.error("Logout Error", err);
      ErrorNotification("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleReminder = async (type, value) => {
    try {
      await Axios.post('/notifications/update-reminder', {
        type, // 'daily' or 'weekly'
        enabled: value,
      });
      SuccessNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} reminder ${value ? 'enabled' : 'disabled'} successfully.`);
    } catch (err) {
      console.error("Toggle Reminder Error", err);
      ErrorNotification(`Failed to update ${type} reminder.`);
    }
  }

  const onSettingsHandler = () => {
    setShowPopup(true);
  }

  return (
    <>
      <ReusableHeader
        showIcons={true}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
        onSettingsHandler={onSettingsHandler}
      />

      <BasePopup
        title="Notification Settings"
        show={showPopup}
        onClose={() => setShowPopup(false)}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-c-zinc">Daily Reminder</span>
            <button
              onClick={() => {
                const newVal = !dailyReminder;
                setDailyReminder(newVal);
                toggleReminder('daily', newVal);
              }}
              className={`w-16 h-8 rounded-full flex items-center transition-colors duration-300 px-1 ${dailyReminder ? 'bg-c-zinc' : 'bg-gray-300'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${dailyReminder ? 'translate-x-8' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-c-zinc">Weekly Reminder</span>
            <button
              onClick={() => {
                const newVal = !weeklyReminder;
                setWeeklyReminder(newVal);
                toggleReminder('weekly', newVal);
              }}
              className={`w-16 h-8 rounded-full flex items-center transition-colors duration-300 px-1 ${weeklyReminder ? 'bg-c-zinc' : 'bg-gray-300'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${weeklyReminder ? 'translate-x-8' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </BasePopup>
    </>
  );
};

export default UserHeader;