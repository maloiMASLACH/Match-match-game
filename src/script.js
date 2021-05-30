const fileInput = document.querySelector('input[type="file"]');
const imageContainer = document.getElementById('registration-avatar');
const ctx = imageContainer.getContext('2d');
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = file.result;
    ctx.drawImage(img, 200, 200);
  };
});
