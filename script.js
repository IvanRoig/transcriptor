document.addEventListener('DOMContentLoaded', () => {
    const resultContainer = document.getElementById('result');
    
    const imageModal = document.createElement('div');
    imageModal.id = 'image-modal';
    imageModal.addEventListener('click', () => {
      imageModal.style.visibility = 'hidden';
      imageModal.style.opacity = '0';
    });
    document.body.appendChild(imageModal);
  
    document.addEventListener('paste', async (event) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
  
      for (const item of items) {
        if (item.type.indexOf('image') === 0) {
          const blob = item.getAsFile();
          const reader = new FileReader();
  
          reader.onload = async (e) => {
            const imageUrl = e.target.result;
  
            const chatContainer = document.createElement('div');
            chatContainer.className = 'chat-entry';
  
            const img = document.createElement('img');
            img.src = imageUrl;
            img.className = 'chat-image';
            
            img.addEventListener('click', () => {
              imageModal.innerHTML = `<img src="${imageUrl}" alt="Ampliada">`;
              imageModal.style.visibility = 'visible';
              imageModal.style.opacity = '1';
            });
  
            const transcriptionContainer = document.createElement('div');
            transcriptionContainer.className = 'chat-text processing';
            transcriptionContainer.textContent = 'Procesando...';
  
            chatContainer.appendChild(img);
            chatContainer.appendChild(transcriptionContainer);
            resultContainer.appendChild(chatContainer);
  
            try {
              const result = await window.electron.transcribeImage();
              if (result.success) {
                transcriptionContainer.textContent = result.text;
                transcriptionContainer.classList.remove('processing');
              } else {
                transcriptionContainer.textContent = `Error: ${result.error}`;
                transcriptionContainer.classList.remove('processing');
              }
            } catch (error) {
              transcriptionContainer.textContent = 'Hubo un error durante la transcripción.';
              transcriptionContainer.classList.remove('processing');
              console.error(error);
            }
          };
  
          reader.readAsDataURL(blob);
        }
      }
    });
  });
  