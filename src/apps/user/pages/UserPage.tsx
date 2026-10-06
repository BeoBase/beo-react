import { useEffect} from 'react';

import UserFinder from "../components/UserFinder.tsx";
import UsersContext from "../store/users-context.ts";

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

export default function UserPage() {
  useEffect(() => {
    document.title = 'Beo Base | Users';
  }, []);

  const usersContext = {
    users: DUMMY_USERS
  }

  return (
    <UsersContext.Provider value={usersContext}>
      <div>
        <UserFinder />
      </div>
    </UsersContext.Provider>
  );
}
