import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import QRCode from 'qrcode.react';
import axios from 'axios';



import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';

const MarkAttendance = () => {
    const [loader, setLoader] = useState(true)
const [message, setMessage] = useState('');
    const path = window.location.pathname.split("/");
    const subjectID = path[path.length - 1];
    const studentID = path[path.length - 2];
    const dispatch = useDispatch();
    const fields = { subName: subjectID, status: 'Present', date: new Date().toISOString().slice(0, 10) };
    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)

    }
    useEffect(() => {
        setMessage('submitting...');
        attendanceAPI();
    },[]);
    const attendanceAPI = async () => {
        setMessage(`${process.env.REACT_APP_BASE_URL}/${"StudentAttendance"}/${studentID}`);
        const result = await axios.put(`http://192.168.18.55:5000/${"StudentAttendance"}/${studentID}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        setMessage(result.data.message);
        
        console.log(result.data);
        setLoader(false);
        setMessage('Attendance Marked for roll no. ' + result.data.rollNum +' for today');
        if (result.data.message) {
            return result.data.message;
        } else {
            return result.data.message;

        }
    }

    return (
        <>
                    {message}
        {
            loader ? (
                <div>Loading...</div>
            ) : (
                <><div>Attendance Marked</div>
                {/* {studentID} */}
                    {/* {subjectID} */}
                </>

            )
        }</>
    )
}

export default MarkAttendance