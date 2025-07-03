# modelloader.py
import torch
from model import DualStageModel  # Make sure this points to your actual file

def load_model(path="/Users/yeldar/Documents/Web apps/cancernaai_app/backend/FINAL_iGEM_lung_cancer_model_20250614_025202.pth", strict=True):
    model = DualStageModel()
    model.eval()
    try:
        checkpoint = torch.load(path, map_location=torch.device("cpu"), weights_only=False)

        # Handle case where you saved only state_dict or full dict
        state_dict = checkpoint.get("model_state_dict", checkpoint)

        result = model.load_state_dict(state_dict, strict=strict)
        print("✅ Model loaded.")

        if result.missing_keys:
            print("⚠️ Missing keys:")
            for k in result.missing_keys:
                print("   ⛔", k)

        if result.unexpected_keys:
            print("⚠️ Unexpected keys:")
            for k in result.unexpected_keys:
                print("   🧩", k)

    except Exception as e:
        print(f"❌ Error loading model: {e}")
        raise

    return model
