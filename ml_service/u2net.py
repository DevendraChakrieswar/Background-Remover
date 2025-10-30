from rembg import remove
from rembg.bg import new_session

class RembgModel:
    """Wrapper for rembg background removal model."""

    def __init__(self, model_name: str = "u2net"):
        print(f"Loading pre-trained model: {model_name} ...")
        try:
            self.session = new_session(model_name)
            self.model_name = model_name
            print("✅ Model loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            raise

    def remove_bg(self, image_path: str, output_path: str):
        """Remove background from an image file."""
        print(f"Processing image: {image_path}")
        try:
            with open(image_path, "rb") as f:
                input_bytes = f.read()

            print("Removing background with rembg...")
            output_bytes = remove(input_bytes, session=self.session, alpha_matting=False)

            with open(output_path, "wb") as f:
                f.write(output_bytes)

            print(f"✅ Background removed and saved at {output_path}")
        except Exception as e:
            print(f"❌ Error during background removal: {e}")
            raise
