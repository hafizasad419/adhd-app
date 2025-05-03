import ReusableHeader from '@src/Components/BaseHeader/ReusableHeader';

const AuthHeader = () => {
  const menuItems = [
    { label: 'Sign Up', to: '/signup', type: "primary" },
    { label: 'Log In', to: '/login', type: "outline" },
  ];

  return <ReusableHeader
    menuItems={menuItems} />;
};

export default AuthHeader;
