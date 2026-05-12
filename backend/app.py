# # from flask import Flask, request, jsonify, render_template
# # from transformers import pipeline

# # app = Flask(__name__)

# # # Load Hugging Face model
# # model_name = "sathwik-kom/fake-review-detection_1"
# # classifier = pipeline("text-classification", model=model_name)

# # @app.route("/")
# # def home():
# #     return render_template("input.html")  # Make sure input.html is in the "templates" folder

# # @app.route("/analyze", methods=["POST"])
# # def analyze():
# #     data = request.get_json()
# #     text = data.get("text", "")

# #     if not text:
# #         return jsonify({"error": "No text provided"}), 400

# #     result = classifier(text)[0]
# #     label = "Fake Review" if result["label"] == "LABEL_1" else "Genuine"
    
# #     return jsonify({"label": label, "score": result["score"]})

# # if __name__ == "__main__":
# #     app.run(debug=True)


# from flask import Flask, request, jsonify, render_template
# from transformers import pipeline
# from huggingface_hub import interpreter_login

# # Login to Hugging Face Hub
# #interpreter_login()

# app = Flask(__name__)

# # Load Hugging Face model
# model_name = "sathwik-kom/fake-review-detection_1"
# classifier = pipeline("text-classification", model=model_name)

# @app.route("/home")
# def home():
#     return render_template("input.html")  # Ensure input.html exists in the "templates" folder
# from flask import render_template

# @app.route('/')
# def login_page():
#     return render_template('form.html')


# @app.route("/analyze", methods=["POST"])
# def analyze():
#     data = request.get_json()
#     text = data.get("text", "")

#     if not text:
#         return jsonify({"error": "No text provided"}), 400

#     result = classifier(text)[0]
#     label = "Fake Review" if result["label"] == "LABEL_1" else "Genuine"
    
#     return jsonify({"label": label, "score": result["score"]})

# if __name__ == "__main__":
#     app.run(debug=True)










# from flask import Flask, request, jsonify, render_template, session, redirect, url_for
# from flask_pymongo import PyMongo
# from werkzeug.security import generate_password_hash, check_password_hash
# from transformers import pipeline
# import secrets

# app = Flask(__name__)
# app.secret_key = secrets.token_hex(16)  # Replace with a secure key

# # MongoDB Configuration
# app.config["MONGO_URI"] = "mongodb+srv://sathudemon37:sathudemon37@cluster0.rbhqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/users"
# mongo = PyMongo(app)

# # Load Hugging Face Model
# model_name = "sathwik-kom/fake-review-detection_1"
# classifier = pipeline("text-classification", model=model_name)

# # Login Page
# @app.route("/")
# def login_page():
#     return render_template("form.html")

# # Signup Route

# @app.route("/signup", methods=["POST"])
# def signup():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     users = mongo.db.users

#     # Check if user already exists
#     if users.find_one({"email": email}):
#         return jsonify({"error": "User already exists"}), 409

#     # Hash password before storing
#     hashed_password = generate_password_hash(password)

#     # Insert user into MongoDB
#     new_user = users.insert_one({"email": email, "password": hashed_password})

#     # Store user in session
#     session["user"] = str(new_user.inserted_id)  # Convert ObjectId to string

#     return jsonify({"message": "Signup successful", "userId": session["user"]}), 201


# # Login Route

# @app.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     user = mongo.db.users.find_one({"email": email})
#     if user and check_password_hash(user["password"], password):
#         session["user"] = email  # Store user in session
#         return redirect(url_for("home"))

#     return jsonify({"error": "Invalid credentials"}), 401


# # Protected Home Page
# @app.route("/home")
# def home():
#     if "user" not in session:
#         return redirect(url_for("login_page"))  # Redirect to login if not authenticated
#     return render_template("input.html")

# # Logout Route
# @app.route("/logout")
# def logout():
#     session.pop("user", None)  # Remove user from session
#     return redirect(url_for("login_page"))

# # Analyze Review Route
# @app.route("/analyze", methods=["POST"])
# def analyze():
#     if "user" not in session:
#         return jsonify({"error": "Unauthorized access"}), 401  # Restrict to logged-in users only

#     data = request.get_json()
#     text = data.get("text", "")

#     if not text:
#         return jsonify({"error": "No text provided"}), 400

#     result = classifier(text)[0]
#     label = "Fake Review" if result["label"] == "LABEL_1" else "Genuine"

#     return jsonify({"label": label, "score": result["score"]})

# if __name__ == "__main__":
#     app.run(debug=True)









from flask import Flask, request, jsonify, render_template, session
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
from transformers import pipeline
import secrets

# 1. Setup environment and paths
# override=True ensures that even if a variable was set in the shell, .env wins
load_dotenv(override=True)

# Since app.py is in 'backend/', templates are in '../frontend/templates'
app = Flask(__name__, 
            template_folder='../frontend/templates', 
            static_folder='../frontend/static')

CORS(app)
app.secret_key = secrets.token_hex(16)

# 2. Robust Database Connection
MONGO_URI = os.getenv("MONGO_URI")

# Debugging check: This will show in your terminal exactly what Python is seeing
if not MONGO_URI:
    print("❌ ERROR: MONGO_URI is not set. Check if your .env file is in the 'backend' folder.")
    # Fallback to avoid a crash, but it will still fail if Atlas is needed
    client = MongoClient("mongodb://localhost:27017") 
else:
    print(f"✅ MONGO_URI detected. Connecting to cluster...")
    client = MongoClient(MONGO_URI)

# Use 'testr' as specified in your prompt
db = client.get_database("testr") 

# 3. Load the BERT Model
print("🔄 Loading BERT Model... Please wait.")
model_name = "sathwik-kom/fake-review-detection_1"
classifier = pipeline("text-classification", model=model_name)
print("✅ BERT Model Loaded Successfully.")

# --- Routes ---

@app.route('/')
def serve_main():
    return render_template("form.html")

@app.route('/input')
def serve_input():
    return render_template("input.html")

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "All fields are required"}), 400

        if db.users.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 400

        hashed_password = generate_password_hash(password)
        result = db.users.insert_one({"email": email, "password": hashed_password})
        return jsonify({"message": "User registered successfully", "userId": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": f"Database Error: {str(e)}"}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        user = db.users.find_one({"email": email})
        if not user or not check_password_hash(user["password"], password):
            return jsonify({"error": "Invalid email or password"}), 401

        return jsonify({"message": "Login successful", "userId": str(user["_id"])}), 200
    except Exception as e:
        return jsonify({"error": f"Database Error: {str(e)}"}), 500

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    review_text = data.get("reviewText", "")

    if not review_text:
        return jsonify({"error": "No text provided"}), 400

    # BERT Classification
    result = classifier(review_text)[0]
    label = "Fake Review" if result["label"] == "LABEL_1" else "Genuine"

    return jsonify({
        "label": label, 
        "score": float(result["score"])
    })

@app.route('/test-db')
def test_db():
    try:
        # Pings the database to verify connection
        client.admin.command('ping')
        return jsonify({"status": "Online", "database": db.name})
    except Exception as e:
        return jsonify({"status": "Offline", "error": str(e)}), 500

if __name__ == '__main__':
    # Running on Port 5001 to avoid conflict with Node.js on Port 3000
    port = int(os.getenv("PORT", 5001))
    print(f"🚀 AI Engine starting on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)