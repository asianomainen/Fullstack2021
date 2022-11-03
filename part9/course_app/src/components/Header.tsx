interface Props {
  name: string
}

const Header = ({ name }: Props): JSX.Element => {
  return <h1>{name}</h1>
}

export default Header