import React, { useEffect, useState, useContext } from 'react';
import './Input.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from '../../FireBaseConfig';
import { getDatabase, ref, set, push } from 'firebase/database';
import { toggleContext } from '../../Context';
import ReactGA from "react-ga4";

const Input = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const receivedData = location.state;
    // console.log(receivedData);

    const [userData, setUserData] = useState({
        title: '',
        message: '',
    })
    //Toggle Theme values
    const theme = useContext(toggleContext);
    // console.log(theme);

    //function to add notes into react realtime database
    function addNotes() {
        ReactGA.event({ action: 'Click', category: 'Button-click', label: 'Save notes buton click' })
        const db = getDatabase(app);
        const newRef = push(ref(db, 'userNotes'));
        set(newRef, {
            noteTitle: userData.title,
            noteMessage: userData.message,
        }).then(() => {
            toast.success("Notes saved", {
                position: "top-right",
                autoClose: 1000
            });
        }).catch((error) => {
            alert('error:', error.message)
        })
        navigate('/')
    }

    //update specifice data into react realtime database
    useEffect(() => {
        setUserData({
            title: receivedData === null ? '' : receivedData.noteTitle,
            message: receivedData === null ? '' : receivedData.noteMessage
        })
    }, [])
    function updateNotes() {
        const db = getDatabase(app);
        const dbRef = ref(db, 'userNotes/' + receivedData.noteId);
        set(dbRef, {
            noteTitle: userData.title,
            noteMessage: userData.message,
        }).then(() => {
            toast.success("Note Update", {
                position: "top-right",
                autoClose: 1000
            });
        }).catch((error) => {
            alert('error:', error.message)
        })
        navigate('/')
    }

    return (
        <>
            <div className={theme.toggle === 'light' ? 'inputSection' : 'inputSection dark'}>
                <Navbar />
                <div className='inputFields container'>
                    <h1>Save your notes</h1>
                    <TextField onChange={(e) => setUserData({ ...userData, title: (e.target.value) })} className='textInputField' id="outlined-textarea" label="Notes Title" placeholder="Notes Title" multiline value={userData.title} /><br />
                    <TextField onChange={(e) => setUserData({ ...userData, message: (e.target.value) })} className='textInputField' id="outlined-multiline-static" label="Notes Message" multiline rows={6} placeholder="Notes Message" value={userData.message} /><br />
                    {receivedData === null ?
                        <Button className='buttonField' variant="outlined" color="success" onClick={addNotes}>Save Notes</Button>
                        :
                        <Button className='buttonField' variant="outlined" color="success" onClick={updateNotes}>Update Notes</Button>
                    }
                </div>
            </div>
        </>
    )
}

export default Input
