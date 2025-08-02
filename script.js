const form = document.getElementById('card-form');
const preview = document.getElementById('card-preview');
const photoEl = document.getElementById('card-photo');
const nameEl = document.getElementById('card-name');
const roleEl = document.getElementById('card-role');
const phoneInput = document.getElementById('phone');
const phoneEl = document.getElementById('card-phone');
const canvas = document.getElementById('card-canvas');
const downloadBtn = document.getElementById('download-btn');

// Format phone number live
phoneInput.addEventListener('keydown', disallowNonNumericInput);
phoneInput.addEventListener('keyup', formatToPhone);

function disallowNonNumericInput(evt) {
  if (evt.ctrlKey || evt.key.length > 1) return;
  if (!/[0-9]/.test(evt.key)) evt.preventDefault();
}

function formatToPhone(evt) {
  const digits = evt.target.value.replace(/\D/g, '').substring(0,10);
  const area = digits.substring(0,3);
  const pre = digits.substring(3,6);
  const suf = digits.substring(6,10);
  if (digits.length > 6) evt.target.value = `(${area}) ${pre} - ${suf}`;
  else if (digits.length > 3) evt.target.value = `(${area}) ${pre}`;
  else if (digits.length > 0) evt.target.value = `(${area}`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const role = document.getElementById('role').value;
  const phone = phoneInput.value;
  const photoFile = document.getElementById('photo').files[0];
  if (!photoFile) return;

  const reader = new FileReader();
  reader.onload = () => {
    photoEl.src = reader.result;
    nameEl.textContent = name;
    roleEl.textContent = role;
    phoneEl.textContent = phone;
    preview.classList.remove('hidden');
    downloadBtn.classList.remove('hidden');

    html2canvas(preview).then(cam => {
      canvas.width = cam.width;
      canvas.height = cam.height;
      canvas.getContext('2d').drawImage(cam, 0, 0);
    });
  };
  reader.readAsDataURL(photoFile);
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'id-card.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});