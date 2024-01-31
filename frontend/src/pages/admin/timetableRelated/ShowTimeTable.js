import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PreviewIcon from '@mui/icons-material/Preview';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllTimetables } from '../../../redux/timetableRelated/timetableHandel';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import AddTimetable from './AddTimeTable';



const ShowTimetable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { timetablesList, loading, error, response } = useSelector((state) => state.timetable);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllTimetables(currentUser._id, "Timetable"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllTimetables(currentUser._id, "Timetable"));
            })
    }

    const [addTimeTable, setTimeTable] = useState(false);

  

    const TimetableButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Timetable")}>
                    <DeleteIcon color="error" />
                </IconButton>
<IconButton onClick={() => navigate(`/timetable/${row._id}`)}>
                    <PreviewIcon color="primary" />
                </IconButton>
            </>
        );
    };

    

    const actions = [
        {
            icon: <NoteAddIcon color="primary" />, name: 'Add New Time Table',
            action: () => navigate("/Admin/timetable")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All TimeTables',
            action: () => deleteHandler(currentUser._id, "Timetables")
        }
    ];


    return (
        <>
        
            {loading ?
                <div>Loading...</div>
                :
                <>
                 {addTimeTable && < AddTimetable />} 
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
                            {<SpeedDialTemplate actions={actions} />}
                        </Paper>
                    }
                </>

            }
            
            
        </>
    );
};

export default ShowTimetable;
