import { type ChangeEvent, type ContextType, Fragment, Component } from 'react';

import Users from './Users';
import UsersContext from "../store/users-context.ts";

import classes from './UserFinder.module.scss';

export interface DummyUser {
  id: string;
  name: string;
}

interface UserFinderState {
  filteredUsers: DummyUser[];
  searchTerm: string;
}

class UserFinder extends Component<object, UserFinderState> {

  static contextType = UsersContext;
  declare context: ContextType<typeof UsersContext>;

  constructor(props: object) {
    super(props);
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    }
  }

  componentDidMount() {
    // Send the http request here, imagine for now
    this.setState({filteredUsers: this.context.users});
  }

  componentDidUpdate(_prevProps: object, prevState: UserFinderState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
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
