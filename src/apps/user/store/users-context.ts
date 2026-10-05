import { createContext } from 'react';
import type { DummyUser } from '../components/UserFinder.tsx';

interface UsersContextValue {
  users: DummyUser[];
}

const UsersContext = createContext<UsersContextValue>({
  users: [],
});

export default UsersContext;