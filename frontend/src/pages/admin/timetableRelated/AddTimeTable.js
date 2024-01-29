import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFileStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';

const AddTimetable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const adminID = currentUser._id;
  const address = "Timetable";

  const submitHandler = (event) => {
    console.log(event.target);
    event.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('adminID', adminID);
    dispatch(addFileStuff(formData, address));
    setMessage("File Uploaded Successfully");
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/timetable');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form style={{ width: '300px', textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }} onSubmit={submitHandler}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', display: 'block' }}>Upload Timetable</span>

          {/* File Input */}
          <label style={{ display: 'block', marginBottom: '10px' }}>Choose File</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(event) => setFile(event.target.files[0])}
            required
          />

          {/* File Preview (if needed) */}
          {file && (
            <div style={{ marginTop: '10px' }}>
              {file.type === 'application/pdf' ? (
                <iframe
                  title="PDF Preview"
                  src={URL.createObjectURL(file)}
                  width="100%"
                  height="250px"
                  style={{ border: 'none' }}
                />
              ) : (
                <div>
                  <p>{file.name}</p>
                  <a href={URL.createObjectURL(file)} download>
                    Download File
                  </a>
                </div>
              )}
            </div>
          )}

          <button style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Upload'
            )}
          </button>
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddTimetable;
