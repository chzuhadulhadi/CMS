import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import StudentSideBar from "./StudentSideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import StudentHomePage from "./StudentHomePage";
import StudentProfile from "./StudentProfile";
import StudentSubjects from "./StudentSubjects";
import ViewStdAttendance from "./ViewStdAttendance";
import StudentComplain from "./StudentComplain";
import Logout from "../Logout";
import AccountMenu from "../../components/AccountMenu";
import { AppBar, Drawer } from "../../components/styles";
import UcpLogo from "../../assets/ucpLogo.jpeg";
import UcpDark from "../../assets/UcpDarkLogo.jpeg";
import Timetable from '../admin/timetableRelated/TimeTable';
import ShowTimetable from '../student/ShowTimeTable';

const StudentDashboard = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          style={{ backgroundColor: "#080a43" }}
          open={open}
          position="absolute"
        >
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <img
              src={UcpLogo}
              alt="UcpLogo"
              style={{ width: "50px", height: "50px", margin: "10px" }}
            />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              University of Central Punjab
            </Typography>
            <AccountMenu />
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={open}
          sx={open ? styles.drawerStyled : styles.hideDrawer}
        >
          <Toolbar
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#080a43",
              color: "white",
            }}
            sx={styles.toolBarStyled}
          >
            <IconButton
              style={{ color: "white !important" }}
              onClick={toggleDrawer}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginLeft="1rem"
            >
              <IconButton>
                <img
                  src={UcpDark}
                  alt="UcpDarkLogo"
                  style={{ width: "70px", height: "60px", marginRight: '2rem'  ,  borderRadius: '25px'}}
                />
              </IconButton>

              <Typography
                style={{ textAlign: "center" , marginRight: '2rem' ,  borderRadius: '25px'}}
              >
                Student Dashboard
              </Typography>
            </Box>
          </Toolbar>
          <Divider />
          <List component="nav">
            <StudentSideBar />
          </List>
        </Drawer>
        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<StudentHomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/Student/dashboard" element={<StudentHomePage />} />
            <Route path="/Student/profile" element={<StudentProfile />} />
<Route path="/timetable/:id" element={<Timetable />} />
            <Route path="/Student/subjects" element={<StudentSubjects />} />
            <Route path="/Student/attendance" element={<ViewStdAttendance />} />
            <Route path="/Student/complain" element={<StudentComplain />} />
<Route path="/Student/timetable" element={<ShowTimetable />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default StudentDashboard;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },
  drawerStyled: {
    display: "flex",
  },
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
