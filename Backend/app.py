from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load model and scaler
try:
    model = pickle.load(open('model.pkl', 'rb'))
    scaler = pickle.load(open('scaler.pkl', 'rb'))
except Exception as e:
    logger.error(f"Error loading model or scaler: {e}")
    raise

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return "Welcome to the Crop Recommendation API"

@app.route("/predict", methods=['POST'])
def predict():
    try:
        # Get data from the request
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Validate input data
        required_fields = ['Nitrogen', 'Phosporus', 'Potassium', 'Temperature', 'Humidity', 'Ph', 'Rainfall']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400
        
        # Convert input data to floats and ensure valid values
        try:
            N = float(data['Nitrogen'])
            P = float(data['Phosporus'])
            K = float(data['Potassium'])
            temp = float(data['Temperature'])
            humidity = float(data['Humidity'])
            ph = float(data['Ph'])
            rainfall = float(data['Rainfall'])
        except ValueError:
            return jsonify({'error': 'Invalid input data'}), 400

        # Validate ranges (example ranges, adjust as necessary)
        if not (0 <= N <= 300 and 0 <= P <= 300 and 0 <= K <= 300 and 0 <= temp <= 50 and 0 <= humidity <= 100 and 0 <= ph <= 14 and 0 <= rainfall <= 3000):
            return jsonify({'error': 'Input data out of range'}), 400

        # Prepare feature list
        feature_list = [N, P, K, temp, humidity, ph, rainfall]
        single_pred = np.array(feature_list).reshape(1, -1)

        # Scale features
        final_features = scaler.transform(single_pred)

        # Predict
        prediction = model.predict(final_features)

        # Crop dictionary
        crop_dict = {
            1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
            8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
            14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
            19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
        }

        # Prepare result
        crop = crop_dict.get(int(prediction[0]), "Unknown crop")
        result = f"{crop} is the best crop to be cultivated in these conditions."

        return jsonify({'result': result})

    except Exception as e:
        logger.error(f"Error occurred: {e}")
        return jsonify({'error': str(e)}), 400

# Main driver function
if __name__ == "__main__":
    app.run(debug=True)

