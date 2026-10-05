import classes from '../styles/User.module.scss';

interface UserProps {
  name: string;
}

const User = ({ name }: UserProps) => {
  return <li className={classes.user}>{name}</li>;
};

export default User;
