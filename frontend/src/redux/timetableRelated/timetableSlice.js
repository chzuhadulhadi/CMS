import { createSlice } from '@reduxjs/toolkit';

const timetableSlice = createSlice({
  name: 'timetable',
  initialState: {
    timetablesList: [],
    loading: false,
    error: null,
    response: null,
  },
  reducers: {
    fetchTimetablesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTimetablesSuccess: (state, action) => {
      state.loading = false;
      state.timetablesList = action.payload;
      state.error = null;
    },
    fetchTimetablesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTimetableStart: (state) => {
      state.loading = true;
      state.error = null;
      state.response = null;
    },
    deleteTimetableSuccess: (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = null;
    },
    deleteTimetableFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTimetablesStart,
  fetchTimetablesSuccess,
  fetchTimetablesFailure,
  deleteTimetableStart,
  deleteTimetableSuccess,
  deleteTimetableFailure,
} = timetableSlice.actions;

export default timetableSlice.reducer;
