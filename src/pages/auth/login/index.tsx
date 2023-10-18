import { ReactNode } from 'react'
import LoginForm from 'src/@core/components/login'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const LoginPage = () => {
  return (
    <>
    <LoginForm />
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
