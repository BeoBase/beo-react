import { useEffect } from 'react';

import UserFinder from "../components/UserFinder.tsx";

export default function UserPage() {
  useEffect(() => {
    document.title = 'Beo Base | Users';
  }, []);

  return (
    <div>
      <UserFinder />
    </div>
  );
}
