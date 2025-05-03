import { useSelector } from 'react-redux';
import AdminHeader from './AdminHeader';
import UserHeader from './UserHeader';
import AuthHeader from './AuthHeader';

const BaseHeader = () => {
    const user = useSelector((state) => state.user);

    return (
        user?.role === 'admin' ? (
            <AdminHeader />
        )
            :
            user?.role === 'user' ? (
                <UserHeader />
            )
                :
                (
                    <AuthHeader />
                )
    );
};

export default BaseHeader;
