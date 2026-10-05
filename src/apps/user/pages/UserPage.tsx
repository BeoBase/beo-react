import { useEffect } from 'react';

import Users from '../components/Users.tsx';

export default function UserPage() {
  useEffect(() => {
    document.title = 'Beo Base | Users';
  }, []);

  return (
    <div>
      <Users />
    </div>
  );
}
