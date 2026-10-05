// import { type ChangeEvent, Fragment, useState, useEffect } from 'react';
import { type ChangeEvent, Fragment, useState } from 'react';

import Users from './Users';
import classes from './UserFinder.module.scss';

export interface DummyUser {
  id: string;
  name: string;
}

const DUMMY_USERS: DummyUser[] = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

const UserFinder = () => {
  // const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   setFilteredUsers(
  //     DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
  //   );
  // }, [searchTerm]);

  // Calculated during render instead of state + effect (avoids an extra render).
  const filteredUsers = DUMMY_USERS.filter((user) => user.name.includes(searchTerm));

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type='search' onChange={searchChangeHandler} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
};

export default UserFinder;
