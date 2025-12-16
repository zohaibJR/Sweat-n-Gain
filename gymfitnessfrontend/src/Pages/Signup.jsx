import React from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {

        const navigate = useNavigate();
    
        const goToLogin= () => {
            navigate('/')
          }



  return (
        <div className='LoginMainDiv'>
        <div className='InnerDiv'>
            <div className='LeftSide'>

                <img alt="Pic here" />


            </div>

            <div className="RightSide">
                <img alt="Logo Here" />
                <h1>Sign up</h1>

                <div className="InputFeilds">

                    <input 
                        type="text" 
                        placeholder='Enter Name'
                    />

                    <input 
                        type="text" 
                        placeholder='Enter Email Address'
                    />

                    <input 
                        type="text" 
                        placeholder='Enter Country'
                    />

                    <input 
                        type="password"
                        placeholder='Enter Password'
                    />
                </div>

                <button>Login</button>

                <div className='SignUpText'>
                    <h4>Already have your Account ? <a href="#" onClick={(e) => { e.preventDefault(); goToLogin(); }}>Login</a></h4>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Signup
