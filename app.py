from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.notebook_runner import run_pipeline

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    print("🔥 /predict hit!")

    try:
        data = request.get_json()
        print("📨 Received data:", data)

        ga = data.get("ga")
        month = int(data.get("month"))
        year = int(data.get("year"))

        if not ga or not month or not year:
            return jsonify({"error": "Missing GA, month or year in request"}), 400

        prediction = run_pipeline(ga, month, year)
        return jsonify({"prediction": prediction})

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("✅ Flask app starting from correct file...")
    app.run(debug=False)
