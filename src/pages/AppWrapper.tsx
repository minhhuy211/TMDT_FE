import { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { isTokenValid } from '../utils/jwt-helper';
import { loadUserInfo } from '@/store/features/userSlice';
import { fetchUserDetails } from '@/api/userInfo';

interface AppInitializerProps {
    children: ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
    const dispatch = useDispatch<AppDispatch>(); // <== gõ kiểu cho dispatch

    useEffect(() => {
        const init = async () => {
            if (isTokenValid()) {
                try {
                    const user = await fetchUserDetails();
                    dispatch(loadUserInfo(user));
                } catch (err) {
                    console.error('Không thể tải lại thông tin người dùng:', err);
                }
            }
        };

        init();
    }, [dispatch]);

    return <>{children}</>;
};

export default AppInitializer;
