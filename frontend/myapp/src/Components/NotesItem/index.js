import {Link} from 'react-router-dom'
import { MdBorderColor, MdDelete } from "react-icons/md"
import axios from 'axios'
import './index.css'

const NotesItem = (props) => {
    const {notesDetails, deleteNoteItem} = props 
    const {title, key, _id} = notesDetails

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

    const getRandomColor = () => {
        const index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }

    

    const onDelete = () => {
        
        deleteNoteItem(_id)
        
    }
    
    return (

        
        
            <div className = {`notes-item ${getRandomColor()}`} >
                <Link className='link-item' to = {`/${_id}`}>
                    <div>
                        <h1 className='notes-title'>{title}</h1>
                        <p className='notes-key'>{key}</p>
                    </div>
                </Link>
                <MdDelete className = "delete-icon" onClick={onDelete} />
            </div>

        
        
    )
}

export default NotesItem