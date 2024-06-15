import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './index.css'

const SignUp = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const onFormSubmit = (event) => {
        event.preventDefault()
        
        
        const userDetails = {username, password}

        axios.post("http://localhost:5000/signup", userDetails)
        .then((response) => {
            const message = response.data.message
            console.log(message)

            if(message === 'SUCCESS')
            {
                navigate("/login")
            }
        })
        .catch((error) => {
            console.log("error : ", error)
        })
        
    }

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
        
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
        

        
    }


    useEffect(()=> {
        const jwtToken = localStorage.getItem("jwt_token")
        if(jwtToken){
            navigate("/")
        }
    })
    

        return (
            <div className='main-body'>
                <div className='login-page-card'>

                    <h1 className='heading'>Signup Page</h1>

                    <form  onSubmit={onFormSubmit}>
                        <label htmlFor = "username" className='labels'>Username</label>
                        <br/>
                        <input onChange={onUsernameChange} className = "input-element" type = "text" key="username" placeholder = "Username" value={username} />
                        <br/>
                        <label htmlFor = "password" className='labels'>Password</label>
                        <br/>
                        <input onChange={onPasswordChange} className = "input-element" placeholder='Password' type='password' key="password" value={password}/>

                        <br />

                        <input className='submit' type='submit' />
                    </form>

                    <Link to= "/login" className='signup'>Login?</Link>

                    

                </div>
            </div>
        )
    }


export default SignUp