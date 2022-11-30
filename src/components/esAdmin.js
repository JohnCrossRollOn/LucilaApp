import { useAuth0 } from '@auth0/auth0-react';

export default () => {
  const { user } = useAuth0();
  return ['juanrolon54@outlook.com'].includes(user?.email);
};
