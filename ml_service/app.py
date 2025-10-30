from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
from u2net import RembgModel
from metrics import compute_metrics

app = Flask(__name__)

# --- Folders ---
UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", "uploads")
RESULT_FOLDER = os.environ.get("RESULT_FOLDER", "results")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

# --- Load ML model ---
print("🚀 Starting ML service...")
model = RembgModel("u2net")
print("✅ ML service ready!")

# --- Health check ---
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


# --- Remove background endpoint (auto proxy metrics) ---
@app.route("/remove-bg", methods=["POST"])
def remove_background():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    filename = secure_filename(file.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    output_path = os.path.join(
        RESULT_FOLDER, f"{os.path.splitext(filename)[0]}_no_bg.png"
    )

    try:
        # Save uploaded image
        file.save(input_path)
        print(f"📷 Processing image: {filename}")

        # Remove background
        model.remove_bg(input_path, output_path)

        # Compute "proxy metrics" (input vs output)
        try:
            metrics = compute_metrics(output_path, input_path)
            print(f"📊 Proxy Metrics for {filename}:")
            for key, value in metrics.items():
                print(f"{key}: {value:.4f}")
        except Exception as e:
            print(f"⚠️ Could not compute metrics: {e}")

        # Return processed image
        return send_file(output_path, mimetype="image/png")

    except Exception as e:
        print(f"❌ Error processing image: {str(e)}")
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500


# --- Evaluate endpoint (with mask) ---
@app.route("/evaluate", methods=["POST"])
def evaluate():
    if "image" not in request.files or "mask" not in request.files:
        return jsonify({"error": "Both 'image' and 'mask' required"}), 400

    image = request.files["image"]
    mask = request.files["mask"]

    filename = secure_filename(image.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    pred_path = os.path.join(RESULT_FOLDER, f"{os.path.splitext(filename)[0]}_no_bg.png")
    gt_path = os.path.join(UPLOAD_FOLDER, secure_filename(mask.filename))

    try:
        image.save(input_path)
        mask.save(gt_path)

        # Run background removal
        model.remove_bg(input_path, pred_path)

        # Compute metrics
        metrics = compute_metrics(pred_path, gt_path)
        print(f"📊 Metrics for {filename}:")
        for key, value in metrics.items():
            print(f"{key}: {value:.4f}")

        return jsonify(metrics)

    except Exception as e:
        print(f"❌ Evaluation failed: {str(e)}")
        return jsonify({"error": f"Evaluation failed: {str(e)}"}), 500


# --- Run Flask app ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False)
