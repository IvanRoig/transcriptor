import sys
from PIL import ImageGrab, Image
import pytesseract
import base64
import io
import json

pytesseract.pytesseract.tesseract_cmd = r"D:\Tesseract\tesseract.exe"

def process_clipboard_image():
    try:
        image = ImageGrab.grabclipboard()
        if image is not None and isinstance(image, Image.Image):
            buffer = io.BytesIO()
            image.save(buffer, format="PNG")
            image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

            text = pytesseract.image_to_string(image, lang="spa")

            return {"success": True, "text": text.strip(), "image": f"data:image/png;base64,{image_base64}"}
        else:
            return {"success": False, "error": "No hay una imagen válida en el portapapeles."}
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    result = process_clipboard_image()
    print(json.dumps(result))
    sys.stdout.flush()
