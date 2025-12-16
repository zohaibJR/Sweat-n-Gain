import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Style/Signup.css'

function Login() {

    const navigate = useNavigate();

    const goToSignUp= () => {
        navigate('/signup')
      }
    


  return (
    <div className='LoginMainDiv'>
        <div className='InnerDiv'>
            <div className='LeftSide'>

                <img alt="Pic here" />


            </div>

            <div className="RightSide">
                <img alt="Logo Here" />
                <h1>Login</h1>

                <div className="InputFeilds">
                    <input 
                        type="text" 
                        placeholder='Enter Email Address'
                    />

                    <input 
                        type="password"
                        placeholder='Enter Password'
                    />
                </div>

                <a href="">Forgot Password</a>

                <button>Login</button>

                <div className='SignUpText'>
                    <h4>Don't have your Account ? <a href="#" onClick={(e) => { e.preventDefault(); goToSignUp(); }}>Sign up</a></h4>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Login
