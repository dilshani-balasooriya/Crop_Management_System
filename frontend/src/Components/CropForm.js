import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';

const CropForm = () => {
    const [formData, setFormData] = useState({
        Nitrogen: '',
        Phosporus: '',
        Potassium: '',
        Temperature: '',
        Humidity: '',
        Ph: '',
        Rainfall: ''
    });

    const [result, setResult] = useState('');
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Validate input data
    const validateInputs = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (isNaN(parseFloat(formData[key])) || parseFloat(formData[key]) <= 0) {
                newErrors[key] = 'Please enter a valid number greater than 0';
            }
        });
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Clear previous result before making a new request
        setResult('');

        // Convert formData to an object with number values
        const dataToSend = {
            Nitrogen: parseFloat(formData.Nitrogen),
            Phosporus: parseFloat(formData.Phosporus),
            Potassium: parseFloat(formData.Potassium),
            Temperature: parseFloat(formData.Temperature),
            Humidity: parseFloat(formData.Humidity),
            Ph: parseFloat(formData.Ph),
            Rainfall: parseFloat(formData.Rainfall)
        };

        try {
            const response = await axios.post('http://localhost:5000/predict', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setResult(response.data.result);
            setErrors({});
        } catch (error) {
            console.error('Error making prediction:', error);
            if (error.response) {
                setResult(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                setResult('Error: No response from server');
            } else {
                setResult('Error: Request setup issue');
            }
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem', borderRadius: '10px' }}>
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#2E3B55' }}>
                    Crop Recommendation
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(formData).map((key) => (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    fullWidth
                                    label={key}
                                    name={key}
                                    type="number"
                                    value={formData[key]}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    error={Boolean(errors[key])}
                                    helperText={errors[key]}
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ backgroundColor: '#4CAF50', color: '#fff', fontWeight: 'bold' }}
                            >
                                Predict
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {result && (
                    <Box mt={3} style={{ textAlign: 'center', backgroundColor: '#f0f4f7', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem' }}>
                        <Typography variant="h6" style={{ color: '#2E3B55' }}>
                            {result}
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default CropForm;
