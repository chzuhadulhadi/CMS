import axios from 'axios';
import {
    fetchTimetablesStart,
    fetchTimetablesSuccess,
    fetchTimetablesFailure,
    deleteTimetableStart,
    deleteTimetableSuccess,
    deleteTimetableFailure,
} from './timetableSlice';

const API_URL = process.env.REACT_APP_BASE_URL; // Replace with your actual API endpoint

// Action to fetch timetables
export const getAllTimetables = (schoolId) => async (dispatch) => {
    dispatch(fetchTimetablesStart());

    
    try {
        const result = await axios.get(`${API_URL}/timetable/list/${schoolId}`);
        
        if (result.data.message) {
            dispatch(fetchTimetablesFailure(result.data.message));
        } else {
            dispatch(fetchTimetablesSuccess(result.data));
        }
    } catch (error) {
        dispatch(fetchTimetablesFailure(error.message));
    }
};


export const getTimetable = (id, address) => async (dispatch) => {
    dispatch(fetchTimetablesStart());

    try {
      

        // if (result.data.message) {
        //     dispatch(fetchTimetablesFailure(result.data.message));
        // } else {
        //     dispatch(fetchTimetablesSuccess(result.data));
        // }
    } catch (error) {
        dispatch(fetchTimetablesFailure(error.message));
    }
}


// Action to delete a timetable
export const deleteTimetable = (timetableId) => async (dispatch) => {
    dispatch(deleteTimetableStart());

    try {
        const result = await axios.delete(`${API_URL}/timetable/delete/${timetableId}`);
        
        if (result.data.message) {
            dispatch(deleteTimetableFailure(result.data.message));
        } else {
            dispatch(deleteTimetableSuccess(result.data));
        }
    } catch (error) {
        dispatch(deleteTimetableFailure(error.message));
    }
};
