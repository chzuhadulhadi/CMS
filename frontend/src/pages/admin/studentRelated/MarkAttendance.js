import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import QRCode from 'qrcode.react';


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
    const path = window.location.pathname.split("/");
    const subjectID = path[path.length - 1];
    const studentID = path[path.length - 2];
    const dispatch = useDispatch();
    const fields = { subName: subjectID, status: 'Present', date:new Date().toISOString().slice(0, 10) };
    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)

    }
    useEffect(() => {
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance")).then(() => {
            setLoader(false)
        }
        );
    }
        , []);

    return (
        <>{
            loader ? (
                <div>Loading...</div>
            ) : (
                <><div>Attendance Marked</div>
                {studentID}
                {subjectID}
                </>

            )
        }</>
    )
}

export default MarkAttendance