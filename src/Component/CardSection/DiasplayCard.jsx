import React, { useEffect, useState, useContext } from 'react'
import './DiasplayCard.scss'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from '../../FireBaseConfig';
import { getDatabase, ref, get, remove } from 'firebase/database';
import Navbar from '../Navbar/Navbar';
import { toggleContext } from '../../Context';
import ReactGA from "react-ga4";

const DiasplayCard = () => {
    const navigate = useNavigate();
    const [userNotes, setUserNotes] = useState([])
    let reverseArray = userNotes.toReversed();

    //Toggle Theme values
    const theme = useContext(toggleContext);
    // console.log(theme);

    //just navigate to input section not other use of this function
    function moveToInput() {
        ReactGA.event({ action: 'Click', category: 'Button', label: 'Add tasks buton click' });
        navigate('/userinput')
        toast.info("Add more notes?", {
            position: "top-right",
            autoClose: 1000
        });
    }


    //Get object data from firebase and shown in cards
    useEffect(() => {
        fetchData()
    }, [])
    async function fetchData() {
        const db = getDatabase(app);
        const dbRef = ref(db, 'userNotes');
        const data = await get(dbRef);
        if (data.exists()) {
            const dataValue = data.val();
            const newDataArray = (Object.keys(dataValue)).map((ele) => {
                return {
                    ...dataValue[ele],
                    noteId: ele
                }
            })
            setUserNotes(newDataArray)
        } else {
            toast.error("error", {
                position: "top-right",
                autoClose: 1000
            });

        }
    }

    //delete notes function
    async function deleteNote(id) {
        const db = getDatabase(app);
        const dbref = ref(db, 'userNotes/' + id)
        await remove(dbref);
        fetchData();
        toast.info("Selected note is deleted", {
            position: "top-center",
            autoClose: 1000
        });
    }

    //update notes function
    function updateNote(id) {
        let uniqObj = userNotes.find((ele) => {
            if (ele.noteId === id) {
                return ele;
            } else { }
        })
        // console.log(uniqObj);
        navigate('/userinput', { state: uniqObj });
        toast.info("Edit this note", {
            position: "top-center",
            autoClose: 1000
        });
    }

    //user search function
    const [search, setSearch] = useState('');
    // console.log(search);
    return (
        <>
            <div className={theme.toggle === 'light' ? 'cardSectionData' : 'cardSectionData dark'}>
                <Navbar />
                <div className='container mt-5'>
                    {/* Top button and search section */}
                    <div className='row'>
                        <div className='col-sm-6'>
                            <Button variant="contained" color="success" onClick={moveToInput}>Add Tasks</Button>
                        </div>
                        <div className='col-sm-6'>
                            <span className='search'>
                                <SearchIcon style={{ marginRight: '6px' }} />
                                <input onChange={(e) => (setSearch(e.target.value))} type="search" placeholder='type to search...' />
                            </span>
                        </div>
                    </div>

                    {/* card section */}
                    <div className='row'>
                        {/* {userNotes.map((item, id) => (
                            <div className='col-lg-4 col-md-6 col-sm-12' key={id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">{(item.noteTitle).slice(0, 35)}...</h3>
                                        <p className="card-text">{(item.noteMessage).slice(0, 250)}...</p>
                                        <div className='cardIcon'>
                                            <EditIcon onClick={() => updateNote(item.noteId)} id='editIcons' />
                                            <DeleteForeverIcon onClick={() => deleteNote(item.noteId)} id='deleteIcons' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))} */}

                        {reverseArray.map((item, id) => {
                            if (search === '') {
                                return <div className='col-lg-4 col-md-6 col-sm-12' key={id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title">{item.noteTitle}</h3>
                                            <p className="card-text">{item.noteMessage}</p>
                                            <div className='cardIcon'>
                                                <EditIcon onClick={() => updateNote(item.noteId)} id='editIcons' />
                                                <DeleteForeverIcon onClick={() => deleteNote(item.noteId)} id='deleteIcons' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } else if (item.noteTitle.toLowerCase().includes(search.toLowerCase())) {
                                return <div className='col-lg-4 col-md-6 col-sm-12' key={id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title">{item.noteTitle}</h3>
                                            <p className="card-text">{item.noteMessage}</p>
                                            <div className='cardIcon'>
                                                <EditIcon onClick={() => updateNote(item.noteId)} id='editIcons' />
                                                <DeleteForeverIcon onClick={() => deleteNote(item.noteId)} id='deleteIcons' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } else { }
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiasplayCard
