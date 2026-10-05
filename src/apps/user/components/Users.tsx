import { Component } from 'react';

import User from './User.tsx';

import classes from '../styles/Users.module.scss';

interface UsersState {
  showUsers: boolean;
}

interface DummyUser {
  id: string;
  name: string;
}

const DUMMY_USERS: DummyUser[] = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class Users extends Component<object, UsersState> {
  constructor(props: object) {
    super(props);
    this.state = {
      showUsers: true,
    }
  }

  toggleUsersHandler() {
    this.setState((curState) => {
      return {showUsers: !curState.showUsers};
    });
  }

  render() {
    const usersList = (
      <ul>
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);
//
//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };
//
//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );
//
//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
