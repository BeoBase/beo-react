import {Component} from 'react';
import classes from '../styles/User.module.scss';

interface UserProps {
  name: string;
}

class User extends Component<UserProps> {
  componentWillUnmount() {
    console.log('user will unmount');
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = ({ name }: UserProps) => {
//   return <li className={classes.user}>{name}</li>;
// };

export default User;
