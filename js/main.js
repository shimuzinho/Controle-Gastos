if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg = await navigator.serviceWorker.register('/sw.js', { type: 'module' });

            console.log('Service worker registrada!', reg);
        } catch (err) {
            console.log('Service worker não registrada', err);
        }
    });
}

const buttonAbrirCamera = document.getElementById('buttonAbrirCamera');
const buttonFecharCamera = document.getElementById('buttonFecharCamera');
const buttonTirarFoto = document.getElementById('buttonTirarFoto');
const buttonTentarNovamente = document.getElementById('buttonTentarNovamente');
const buttonTrocarCamera = document.getElementById('buttonTrocarCamera');
const containerCamera = document.getElementById('containerCamera');
const cameraView = document.getElementById('cameraView');
const cameraOutput = document.getElementById('cameraOutput');
const cameraSensor = document.getElementById('cameraSensor');

<<<<<<< Updated upstream
let constraints = { video: { facingMode: usingFrontCamera ? 'user' : 'environment' }, audio: false };
=======
let usingFrontCamera = true;
let constraints = { video: { facingMode: 'user' }, audio: false };
>>>>>>> Stashed changes

const previewMode = () => {
    cameraView.style.display = 'none';
    buttonTirarFoto.style.display = 'none';
    cameraOutput.style.display = 'block';
    buttonTentarNovamente.style.display = 'inline-block';
};

const videoMode = () => {
    cameraView.style.display = 'block';
    buttonTirarFoto.style.display = 'inline-block';
    cameraOutput.style.display = 'none';
    buttonTentarNovamente.style.display = 'none';
}

buttonAbrirCamera.addEventListener('click', () => {
    containerCamera.style.display = 'flex';
    videoMode();
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
            stream.getTracks();
            cameraView.srcObject = stream;
        })
        .catch(err => {
            console.error(err);
        });
});

buttonTirarFoto.addEventListener('click', () => {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext('2d').drawImage(cameraView, 0, 0);
    const dataURL = cameraSensor.toDataURL('images/webp');
    cameraOutput.src = dataURL;
    previewMode();

    localStorage.setItem('image', dataURL);

    alert('Foto salva!');
});

buttonTrocarCamera.addEventListener('click', async () => {
    usingFrontCamera = !usingFrontCamera;
});

buttonTentarNovamente.addEventListener('click', () => {
    videoMode();
});

buttonFecharCamera.addEventListener('click', () => {
    containerCamera.style.display = 'none';
});