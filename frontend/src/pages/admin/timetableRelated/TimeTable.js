import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useNavigate, useParams
} from "react-router-dom";
import {
    Paper, Box, IconButton
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { getTimetable } from '../../../redux/timetableRelated/timetableHandel';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllTimetables } from '../../../redux/timetableRelated/timetableHandel';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import AddTimetable from './AddTimeTable';
import axios from 'axios';




const Timetable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [timetable, setTimetable] = useState(null);
    const [url, setUrl] = useState(null);
    const { currentUser } = useSelector(state => state.user);
    //get id from route
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        const binaryPdf = async () => {
            const result = await axios.get(
                `http://localhost:5000/Timetable/${id}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    responseType: 'arraybuffer' // Setting responseType to 'arraybuffer' for binary files
                }
            )
            //make a blob object of pdf
            console.log(result);
            const blob = new Blob([result.data], { type: 'application/pdf' })

            //convert blob object to blob url
            const blobURL = URL.createObjectURL(blob);
            setUrl(blobURL)
            
        };
        binaryPdf();

    }, []);


    return (
        <>
            {/* show pdf here */}
            <iframe src={url} width="100%" height="1000px"></iframe>

        </>
    );
};

export default Timetable;
