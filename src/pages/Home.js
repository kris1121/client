import { useAuth } from '../context/auth'

import Jumbotron from '../components/cards/Jumbotron'

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <Jumbotron title="Hello World" />
      <pre>{ JSON.stringify(auth, null, 4) }</pre>
    </div>
  )
}

export default Home
