import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

type LoginForm = {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginForm>()

  function onSubmit(data: LoginForm) {
    // Demo auth – accept any non-empty credentials
    if (data.email && data.password) {
      localStorage.setItem('authUser', JSON.stringify({ email: data.email }))
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h1>
        <p className="text-sm text-gray-600 mb-6">Access your payroll dashboard</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input className="input-field" type="email" {...register('email')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input className="input-field" type="password" {...register('password')} />
          </div>
          <button className="w-full btn-primary" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  )
}


