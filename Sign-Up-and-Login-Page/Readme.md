# Fake Review Detection using BERT

An AI-powered full-stack application that identifies deceptive e-commerce reviews using a fine-tuned BERT transformer model.

## 🚀 Features
- **BERT Model:** Fine-tuned and hosted on Hugging Face (`sathwik-kom/fake-review-detection_1`).
- **Backend:** Node.js & Express for user authentication and review management.
- **AI Engine:** Python Flask API for real-time sentiment and authenticity analysis.
- **Database:** MongoDB Atlas for secure data storage.

## 🛠 Project Structure
- `/backend/node_server`: Node.js API and MongoDB connection.
- `/backend/ai_engine`: Python Flask server for BERT predictions.
- `/frontend`: HTML/JS user interface.

## 🚦 Getting Started

### AI Engine
1. `cd backend/ai_engine`
2. `python3 -m venv venv && source venv/bin/activate`
3. `pip install -r requirements.txt`
4. `python app.py`

### Node Server
1. `cd backend/node_server`
2. `npm install`
3. `node server.js`


