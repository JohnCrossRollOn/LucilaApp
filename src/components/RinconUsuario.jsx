import { useAuth0 } from '@auth0/auth0-react';
import esAdmin from './esAdmin';

export default () => {
  const { loginWithPopup, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  return (
    <button
      onClick={isLoading ? null : isAuthenticated ? logout : loginWithPopup}
      className={`flex items-center ${
        esAdmin() ? 'bg-red-500' : 'bg-primario'
      } text-white p-1 font-bold rounded-full h-full`}
    >
      <div className="flex flex-row h-full items-center">
        {isLoading ? (
          <span>esperame</span>
        ) : isAuthenticated ? (
          <>
            <img src={user.picture} className="h-full rounded-full" />
            <span className="hidden md:inline">{user.nickname}</span>
          </>
        ) : (
          <span>loguearse</span>
        )}
      </div>
    </button>
  );
};
