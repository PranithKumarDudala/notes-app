import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Header from '../Header'
import './index.css'
const DisplayNote = () => {

    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [key, setKey] = useState("")
    
    useEffect(() => {

        const jwtToken = localStorage.getItem('jwt_token')

        axios.get(`http://localhost:5000/notes/${id}`, {
            headers:{
                Authorization: `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            setTitle(response.data.title)
            setDescription(response.data.description)
            setKey(response.data.key)
        })
        .catch(err => {
            console.log(err)
        })

    },[])

    //we got the id of the note-item
    //now we need to fetch the details of the corresponding note item

    

    return (

        <div className="Home-body">

        <Header />

        

            <div className="display-note">
                <h1 className="display-title">{title}</h1>
                <p className="display-description">{description}</p>
                <p className="display-key">{key}</p>
            </div>

       

        </div>
    )
}

export default DisplayNote