# Crop_Management_System
This project is designed to help farmers make informed decisions regarding the crops they should cultivate based on environmental conditions. The app uses machine learning models trained on various agricultural datasets to recommend suitable crops and predict yield.

The system is divided into two main parts:

Frontend: The user interface, built using React and Material-UI, allows users to input environmental data and receive crop recommendations.
Backend: The backend, built using Flask (Python), hosts a machine learning model that processes input data and provides crop recommendations.


Features:

Crop Recommendation: Based on environmental data (e.g., nitrogen, phosphorus, potassium levels, temperature, humidity, pH, and rainfall), the system recommends the most suitable crop for cultivation.
Yield Prediction: The system can predict potential crop yield based on the same environmental inputs.
User-Friendly UI: A modern, responsive interface that allows users to easily input data and retrieve results.
API Integration: The backend exposes REST API endpoints to handle crop recommendations and yield predictions.

Technologies Used:

Frontend:
React
Material-UI for the responsive design
Axios for handling HTTP requests
React Router for navigation

Backend:

Flask (Python)
Scikit-learn for the machine learning model
Pickle for model serialization
NumPy for numerical operations
Flask-CORS for handling Cross-Origin Resource Sharing
