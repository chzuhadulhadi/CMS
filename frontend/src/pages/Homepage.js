import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import UCPHomePage from "../assets/ucp.jpeg";
import { CustomColorButton, LightBlueButton, LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer  >
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={UCPHomePage} alt="students" style={{ width: '100%' , marginTop: '2rem' , borderRadius: '12px' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle style = {{textAlign: 'center'}}>
                            Welcome to
                            <br />
                            UCP Learning Management
                            <br />
                            System
                        </StyledTitle>
                        <StyledText style = {{textAlign: 'center'}}>
                            Streamline learning management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightBlueButton variant="contained" fullWidth >
                                    Login To Continue   
                                </LightBlueButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                            
                            </StyledLink>
                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{color:"#0B60B0"}}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
