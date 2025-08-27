import papermill as pm
import json
import os

def run_pipeline(ga, month, year):
    base_dir = os.path.dirname(os.path.abspath(__file__))  # backend/utils
    notebooks_dir = os.path.abspath(os.path.join(base_dir, "../notebooks"))
    data_raw_dir = os.path.join(notebooks_dir, "data", "raw")
    data_processed_dir = os.path.join(notebooks_dir, "data", "processed")
    outputs_dir = os.path.abspath(os.path.join(base_dir, "../outputs"))

    # Construct paths
    raw_excel_path = os.path.join(data_raw_dir, f"{ga}.xlsx")
    raw_csv_path = os.path.join(data_raw_dir, f"{ga}.csv")
    processed_path = os.path.join(data_processed_dir, f"processed_{ga}.csv")
    prediction_json_path = os.path.join(outputs_dir, "prediction.json")

    # Run preprocessing if the file does not exist
    if not os.path.exists(processed_path):
        print(f"⚠️ Processed file not found: {processed_path}")
        print("➡️ Running preprocessing notebook...")
        pm.execute_notebook(
            input_path=os.path.join(notebooks_dir, "preprocessing.ipynb"),
            output_path=os.path.join(notebooks_dir, f"output_preprocess_{ga}.ipynb"),
            parameters={
                "ga_name": ga,
                "raw_excel_path": raw_excel_path,
                "raw_csv_path": raw_csv_path,
                "output_path": processed_path
            }
        )
        if not os.path.exists(processed_path):
            raise FileNotFoundError(f"Preprocessing failed. File still missing: {processed_path}")
        print("✅ Preprocessing completed.")

    # Run training notebook
    print("➡️ Running training notebook...")
    pm.execute_notebook(
        input_path=os.path.join(notebooks_dir, "training.ipynb"),
        output_path=os.path.join(notebooks_dir, f"output_training_{ga}.ipynb"),
        parameters={
            "ga_name": ga,
            "month": month,
            "year": year,
            "input_path": processed_path,
            "output_path": prediction_json_path
        }
    )

    # Read prediction output
    if not os.path.exists(prediction_json_path):
        raise FileNotFoundError("Prediction result file not found after training.")

    with open(prediction_json_path, "r") as f:
        result = json.load(f)

    print(f"✅ Prediction loaded: {result['prediction']}")
    return result['prediction']
