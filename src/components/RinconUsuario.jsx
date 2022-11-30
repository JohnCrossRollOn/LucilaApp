import { useAuth0 } from '@auth0/auth0-react';
import esAdmin from './esAdmin';

export default () => {
  const { loginWithPopup, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  return (
    <button
      onClick={isLoading ? null : isAuthenticated ? logout : loginWithPopup}
      className={`flex items-center ${
        esAdmin() ? 'bg-blue-500' : 'bg-pink-500'
      } text-white p-1 font-bold rounded-full h-full`}
    >
      {isLoading ? (
        'esperame'
      ) : isAuthenticated ? (
        <div className="flex flex-row h-full items-center">
          <img src={user.picture} className="h-full rounded-full" />
          <span className="px-2">{user.nickname}</span>
        </div>
      ) : (
        'loguearse'
      )}
    </button>
  );
};
