'use client'

import React, { useEffect, useState } from 'react';

import {
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Alert,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { blueGrey, lightBlue } from '@mui/material/colors';


export default function Login() {
    const [email, setEmail] = useState('')
    const [showEmailField, setShowEmailField] = useState(false)
    const [showGoogleAuth, setShowGoogleAuth] = useState(false)

    const handleLoginDefault = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    const emailField = () => {
        setShowEmailField(!showEmailField)
    }

    const googleAuthField = () => {
        setShowGoogleAuth(!showGoogleAuth)
    }

    return (
        <Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}>

                {showEmailField ? (
                    // Email login
                    <>
                        <TextField
                            size="medium"
                            label="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button variant="text" onClick={emailField}>Back</Button>
                    </>
                ) : showGoogleAuth ? (
                    // Google login
                    <>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 2,
                            // backgroundColor: 'grey',
                            padding: 3
                        }}>

                            <Typography>Opening Google Auth in popup</Typography>
                            <Typography>Waiting for user to authenticate </Typography>
                            <Button variant="text" onClick={googleAuthField}>Back</Button>
                        </Box>
                    </>
                ) : (
                    // Main login
                    <>
                        <Button variant="text" onClick={emailField}>Sign in with Email</Button>
                        <Button variant="text" onClick={googleAuthField}>Sign in with Google</Button>
                    </>
                )}

            </Box>
        </Container>
    );
}