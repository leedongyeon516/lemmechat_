import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useInput } from '../../hooks/useInput'
import { useLoginMutation } from '../../slices/user/userApiSlice'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

import Tutorial from '../tutorial'
import Spinner from '../spinner'

const Login = ({ setUser, setSecret }) => {
  const [state, , onChangeHandler] = useInput({
    name: sessionStorage.getItem('name') || '',
    password: ''
  })
  const [hasError, setHasError] = useState(false)
  const [isTutorialOn, setIsTutorialOn] = useState(false)

  const { name, password } = state

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => setHasError(false), [name, password])

  const loginHandler = async e => {
    e.preventDefault()

    const formData = { username: name, password }

    const { data: isAuthenticated } = await login(formData)

    if (!isAuthenticated) {
      setHasError(true)
      return
    }

    sessionStorage.setItem('name', name)

    setUser(name)
    setSecret(password)
  }

  const guestLoginHandler = (e, guestName, guestSecret) => {
    e.preventDefault()

    setUser(guestName)
    setSecret(guestSecret)
  }

  console.log(isTutorialOn)
  return (
    <div className="position-relative register">
      <header className="p-4 fixed-top">
        <nav className="container navbar">
          <a href="/" className="navbar-brand text-light">
            LemmeCHAt
          </a>
        </nav>
      </header>

      <main className="row vw-100 vh-100 m-0 d-flex justify-content-center align-items-center">
        <div className="col-lg-6 col-md-6 p-5">
          {name && isLoading ? (
            <Spinner />
          ) : (
            <form className="d-flex flex-column align-items-center">
              <div>
                <br />
                <input
                  type="text"
                  name="name"
                  value={state.name}
                  placeholder="name"
                  onChange={onChangeHandler}
                  className={`p-2 border-0 error-${hasError}`}
                />
              </div>
              <div>
                <br />
                <input
                  type="password"
                  name="password"
                  value={state.password}
                  placeholder="password"
                  onChange={onChangeHandler}
                  className={`p-2 border-0 error-${hasError}`}
                />
              </div>
              <h5 className="py-3">
                wanna have a{' '}
                <Link to="/register" className="text-black">
                  <u>new</u>
                </Link>{' '}
                account?
                <QuestionMarkCircleIcon
                  className="tutorial-btn"
                  onClick={() => setIsTutorialOn(!isTutorialOn)}
                />
              </h5>
              <div className="my-2">
                <button
                  onClick={loginHandler}
                  className="btn text-black bg-white px-4 py-3 border-0 mx-2 rounded-pill"
                >
                  Login
                </button>
                <button
                  onClick={e => guestLoginHandler(e, 'guest', 'guestfldy')}
                  className="btn text-black bg-white px-4 py-3 border-0 mx-2 rounded-pill"
                >
                  Guest
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="col-lg-6 col-md-6 p-5">
          {isTutorialOn ? (
            <h2 className="text-white">Tutorial</h2>
          ) : (
            <h2 className="text-white">
              To have a conversation with AI you have to add the AI bot to your
              chat room.
            </h2>
          )}
        </div>
      </main>
    </div>
  )
}

export default Login
