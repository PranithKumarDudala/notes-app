import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import Popup from 'reactjs-popup'


const Header = (props) => {

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [key, setKey] = useState("")
    const [description, setDescription] = useState("")
    const [isModalOpen, setModal] = useState(false) 

    const {onHomeSearch} = props
    

    const renderTriggerButton = () => {
        return (
            <button className='create' onClick={() => setModal(true)}>+</button>
        )
    }

    const onSubmitModal = (event) => {
        //event.preventDefault()
        

        const jwt = localStorage.getItem('jwt_token')

        axios.post("http://localhost:5000/notes",{
            title : title,
            key : key,
            description : description
        } ,{
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })
        .then(response => {
            
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    
        setModal(false)
        setTitle("")
        setKey("")
        

    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeKey = (event) => {
        setKey(event.target.value)
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const popupContent = () => {
        return (
            <div className = "notes-card">
                
                <form className='form-item'>
                    <div>
                    <label className='label'>Title</label>
                    <br/>
                    <input className='input-type' type = "text" value={title} onChange = {onChangeTitle} />
                    <br/>
                    <label className='label'>key</label>
                    <br/>
                    <input className='input-type' type = "text" value = {key} onChange={onChangeKey} />
                    <br/>
                    <label className='label'>Description</label>
                    <br/>
                   
                    
                    <textarea rows={20} className='input-type text-box' value = {description} onChange={onChangeDescription} >

                    </textarea>

                    <br/>
                    </div>
                    <input onClick={onSubmitModal} className='input-type-button' type='submit' />
                </form>
                
            </div>
        )
    }

    const onLogout = () => {
        localStorage.removeItem('jwt_token')
        navigate("/login")
    }

    const onSearch = (event) => {
        onHomeSearch(event.target.value)
    }

    return (
        <div className="header">
            <div>
                <Link className='title' to = "/">
                    Notes
                </Link>
            </div>
            <div className="text-element">
                <div className='input-button'>
                    <div><input className='search-box' type = "search" onChange = {onSearch} placeholder='search using keys' /></div>
                    <div>
                        <button onClick = {onLogout} className='search-box logout-btn'>Log out</button>
                    </div>
                    <div>
                        <Popup
                            open = {isModalOpen}

                            modal
                            
                            trigger={renderTriggerButton}
                            
                            closeOnDocumentClick
                        >
                            {popupContent}
                        </Popup>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Header