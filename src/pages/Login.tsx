import { useState } from "react"
import Button from "../components/Button"
import Container from "../components/Container"
import Input from "../components/Input"
import LayoutContent from "../components/LayoutContent"
import useUserStore from "../stores/user"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userStore = useUserStore()

  const Login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    userStore.Login(email, password)
  }

  return (
    <LayoutContent>
      <Container className="flex !w-full !h-full items-center justify-center">
        <form className="w-120 mx-auto mt-72" onSubmit={Login}>
          <div className="bold-text mb-4 text-xl text-center">
            Login
          </div>
          <Input value={email} className="border border-gray-300 rounded mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <Input value={password} className="border border-gray-300 rounded mb-3" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <Button className="w-full px-4 py-2 rounded" type="submit">
            Login
          </Button>
        </form>
      </Container>
    </LayoutContent>
  )
}

export default Login
