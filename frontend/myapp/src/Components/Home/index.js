import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../Header'
import NotesItem from '../NotesItem'

import './index.css'



const Home = () => {

    const [notesList, setNotesList] = useState([])
    const [input, setInput] = useState("")
    

    const navigate = useNavigate()

    
    
    

    // this api call is to get data from the database
    useEffect(() => {

        const jwt = localStorage.getItem('jwt_token')

        axios.get("http://localhost:5000/notes", {
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })
        .then(response => {
            
            setNotesList(response.data.NotesList)
        })
        .catch(err => {
            console.log(err)
        })

    },[])

    

    // this api call is to post data into database

    


    useEffect(() => {{
        const jwtToken = localStorage.getItem('jwt_token')

        if(jwtToken === null){
            navigate("/login")
        }
    }}, [])

    
    const onHomeSearch = (input) => {
        
        setInput(input)
        
    }

    const deleteNoteItem = (id) => {

        const jwtToken = localStorage.getItem("jwt_token")

        axios.delete(`http://localhost:5000/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })

        setNotesList(notesList.filter((each) => each._id !== id))

    }

    const  filterednotesList = notesList.filter((each) => each.key.includes(input))

    return (
        <div className='Home-body'>
            
            <Header onHomeSearch = {onHomeSearch} />
            
            

            <div className='notes-container'>
                {

                    

                    filterednotesList.map((each) => {
                        return (
                            <NotesItem notesDetails = {each} deleteNoteItem = {deleteNoteItem} key = {each._id} />
                        )
                    })
                }

            </div> 
        </div>
    )

}

export default Home