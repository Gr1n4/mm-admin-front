import { UserRole } from '@/types';
import { getSingleLoadingSelector } from '@ro-loading';
import { useSelector } from 'react-redux';
import { getUserSelector, isLogedinSelector } from './auth.selectors';
import { isAccept } from './auth.utils';

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
  if (!user) {
    return { isLogedin, isLoading, accept: false };
  }
  const accept = isAccept(user.role, role);
  return { isLogedin, isLoading, accept };
}
