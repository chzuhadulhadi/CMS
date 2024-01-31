import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Popup from "../../components/Popup";
import { BlueButton, LightBlueButton } from "../../components/buttonStyles";
import { addStuff } from "../../redux/userRelated/userHandle";
import { useDispatch, useSelector } from "react-redux";

const StudentComplain = () => {
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const { status, currentUser, error } = useSelector((state) => state.user);

  const user = currentUser._id;
  const school = currentUser.school._id;
  const address = "Complain";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [comps, setComps] = useState(["", "", "", ""]);

  const fields = {
    user,
    date,
    complaint: [
      "Did the Teacher uploaded the Assignment on time?",
      "Did the Teacher uploaded the course material on time?",
      "Was Teacher behavior good?",
      "Teachers teaching style was understandable?",
    ]
      .map((item, index) => {
        return item + ":" + comps[index];
      })
      .join(","),
    school,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Done Successfully");
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("Network Error");
    }
  }, [status, error]);

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Complain</Typography>
            </Stack>
            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Typography variant="h6">
                  Did the Teacher upload the Assignment on time?{" "}
                </Typography>
                <Stack spacing={1} direction="row">
                  <Typography variant="body1">Yes</Typography>
                  <input
                    type="radio"
                    name="teacher"
                    value="yes"
                    onChange={(event) =>
                      setComps((prev) => {
                        const newComps = [...prev];
                        newComps[0] = event.target.value;
                        return newComps;
                      })
                    }
                    required
                    checked={comps[0] === "yes"}
                  />
                  <Typography variant="body1">No</Typography>
                  <input
                    type="radio"
                    name="teacher"
                    value="no"
                    onChange={(event) =>
                      setComps((prev) => {
                        const newComps = [...prev];
                        newComps[0] = event.target.value;
                        return newComps;
                      })
                    }
                    checked={comps[0] === "no"}
                    required
                  />
                </Stack>

                <Typography variant="h6">
                  Did the Teacher upload the course material on time?
                </Typography>
                <Stack spacing={1} direction="row">
                  <Typography variant="body1">Yes</Typography>
                  <input
                    type="radio"
                    name="school"
                    value="yes"
                    onChange={(event) =>
                      setComps((prev) => {
                        const newComps = [...prev];
                        newComps[1] = event.target.value;
                        return newComps;
                      })
                    }
                    checked={comps[1] === "yes"}
                    required
                  />
                  <Typography variant="body1">No</Typography>
                  <input
                    type="radio"
                    name="school"
                    value="no"
                    onChange={(event) =>
                      setComps((prev) => {
                        const newComps = [...prev];
                        newComps[1] = event.target.value;
                        return newComps;
                      })
                    }
                    checked={comps[1] === "no"}
                    required
                  />
                </Stack>

                <Typography variant="h6">
                  Was Teacher behavior good?{" "}
                </Typography>
                <Stack spacing={1} direction="row">
                  <Typography variant="body1">Yes</Typography>
                  <input
                    type="radio"
                    name="teacher_behavior"
                    value="yes"
                    onChange={(event) =>
                      setComps((prev) => {
                        const newComps = [...prev];
                        newComps[2] = event.target.value;
                        return newComps;
                      })
                    }
                    required
                    checked={comps[2] === "yes"}
                  />
                  <Typography variant="body1">No</Typography>
                  <input
                    type="radio"
                    name="teacher_behavior"
                    value="no"
                    onChange={(event) =>
                      setComps((prev) => {
                        const newComps = [...prev];
                        newComps[2] = event.target.value;
                        return newComps;
                      })
                    }
                    checked={comps[2] === "no"}
                    required
                  />
                </Stack>

                <Typography variant="h6">
                  Was Teacher's teaching style understandable?{" "}
                </Typography>
                <Stack spacing={1} direction="row">
                  <Typography variant="body1">Yes</Typography>
                  <input
                    type="radio"
                    name="teaching_style"
                    value="yes"
                    onChange={(event) =>
                      setComps((prev) => {
                        const newComps = [...prev];
                        newComps[3] = event.target.value;
                        return newComps;
                      })
                    }
                    required
                    checked={comps[3] === "yes"}
                  />
                  <Typography variant="body1">No</Typography>
                  <input
                    type="radio"
                    name="teaching_style"
                    value="no"
                    onChange={(event) =>
                      setComps((prev) => {
                        const newComps = [...prev];
                        newComps[3] = event.target.value;
                        return newComps;
                      })
                    }
                    checked={comps[3] === "no"}
                    required
                  />
                </Stack>
              </Stack>

              <LightBlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add"
                )}
              </LightBlueButton>
            </form>
          </div>
        </Box>
      </Box>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default StudentComplain;
