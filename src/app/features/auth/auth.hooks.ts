import { UserRole } from '@/types';
import { getSingleLoadingSelector } from '@ro-loading';
import { useSelector } from 'react-redux';
import { getUserSelector, isLogedinSelector } from './auth.selectors';

interface AuthHook {
  isLoading: boolean;
  isLogedin: boolean;
}

interface AuthRoleHook extends AuthHook {
  accept: boolean;
}

export function useAuth(): AuthHook {
  const isLogedin = useSelector(isLogedinSelector);
  const isRegisterLoading = useSelector((state) => getSingleLoadingSelector(state, 'register'));
  const isLoginLoading = useSelector((state) => getSingleLoadingSelector(state, 'login'));
  const isProfileLoading = useSelector((state) => getSingleLoadingSelector(state, 'profile'));
  return { isLogedin, isLoading: isRegisterLoading || isLoginLoading || isProfileLoading };
}

export function useAuthRole(role: UserRole): AuthRoleHook {
  const { isLogedin, isLoading } = useAuth();
  const user = useSelector(getUserSelector);
  if (role === UserRole.PATIENT) {
    return { isLogedin, isLoading, accept: isLogedin };
  }
  if (!user) {
    return { isLogedin, isLoading, accept: false };
  }
  if (role === UserRole.DOCTOR) {
    if (user.role === UserRole.DOCTOR || user.role === UserRole.ADMIN) {
      return { isLogedin, isLoading, accept: isLogedin };
    }
    return { isLogedin, isLoading, accept: false };
  }
  return { isLogedin, isLoading, accept: user.role === UserRole.ADMIN };
}
