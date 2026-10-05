// import { type ChangeEvent, Fragment, useState, useEffect } from 'react';
import { type ChangeEvent, Fragment, Component } from 'react';

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

interface UserFinderState {
  filteredUsers: DummyUser[];
  searchTerm: string;
}

class UserFinder extends Component<object, UserFinderState> {
  constructor(props: object) {
    super(props);
    this.state = {
      filteredUsers: DUMMY_USERS,
      searchTerm: '',
    }
  }

  componentDidMount() {
    // Send the http request here, imagine for now
    this.setState({filteredUsers: DUMMY_USERS});
  }

  componentDidUpdate(_prevProps: object, prevState: UserFinderState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   // const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');
//
//   // useEffect(() => {
//   //   setFilteredUsers(
//   //     DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//   //   );
//   // }, [searchTerm]);
//
//   // Calculated during render instead of state + effect (avoids an extra render).
//   const filteredUsers = DUMMY_USERS.filter((user) => user.name.includes(searchTerm));
//
//   const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };
//
//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
