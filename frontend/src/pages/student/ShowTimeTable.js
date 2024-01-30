import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton
} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllTimetables } from '../../redux/timetableRelated/timetableHandel';
import TableTemplate from '../../components/TableTemplate';
import { GreenButton } from '../../components/buttonStyles';



const ShowTimetable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { timetablesList, loading, error, response } = useSelector((state) => state.timetable);
    const { currentUser } = useSelector(state => state.user);
    console.log(currentUser.school._id);
    useEffect(() => {
        dispatch(getAllTimetables(currentUser.school._id, "Timetable"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }
    const [addTimeTable, setTimeTable] = useState(false);

    const TimetableButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => navigate(`/timetable/${row._id}`)}>
                    <PreviewIcon color="primary" />
                </IconButton>
            </>
        );
    };





    return (
        <>

            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => setTimeTable(true)}>
                                Add Time Table
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(timetablesList) && timetablesList.length > 0 &&
                                <TableTemplate buttonHaver={TimetableButtonHaver}
                                    columns={[
                                        { id: 'fileName', label: 'File Name', minWidth: 170 },
                                        { id: 'fileType', label: 'File Type', minWidth: 170 },
                                        { id: 'uploadTime', label: 'Created At', minWidth: 170 },
                                    ]}
                                    rows={timetablesList}
                                />
                            }
                        </Paper>
                    }
                </>

            }


        </>
    );
};

export default ShowTimetable;
