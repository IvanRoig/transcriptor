# **Setup Instructions**

## **What You Need**
1. **Tesseract OCR**:  
   - Install Tesseract OCR and ensure it's correctly set up.  
   - Update the `transcriber.py` file with the path where Tesseract is installed. Example:  
     ```python
     pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
     ```

2. **Node.js**:  
   - Ensure you have **Node.js version 10.9.0** installed.  
   - You can download it from [Node.js Official Website](https://nodejs.org/).  

3. **Electron**:  
   - Install Electron using the following command in the terminal:  
     ```bash
     npm install electron --save-dev
     ```

---

## **How to Use?**
1. **Navigate to the Project Directory**:  
   Open your terminal and move to the folder containing the code. For example:  
   ```bash
   cd "D:\Vs Code\proyectos\transcriptor"
2. **Install dependencies**:
    Run the following command to install all necessary dependencies:
    ```bash
    npm install
3. **Start the Application**:
    Once the installation is complete, run:
    ```bash
    npm start
4. **Important Note**:
- The app works when you press Ctrl + V to paste the image content for transcription.

## **Language Settings**
1. To change the language for OCR, open the `transcriber.py` file.
2. Locate the following line:  
   ```python
   text = pytesseract.image_to_string(image, lang="spa")
3. Update the lang parameter:
    - Use "spa" for Spanish.
    - Use "eng" for English



