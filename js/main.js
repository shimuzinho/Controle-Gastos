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
const containerCamera = document.getElementById('containerCamera');
const cameraView = document.getElementById('cameraView');
const cameraOutput = document.getElementById('cameraOutput');
const cameraSensor = document.getElementById('cameraSensor');

let contrains = { video: { facingMode: 'user' }, audio: false };

const previewMode = () => {
    cameraView.style.display = 'none';
    buttonTirarFoto.style.display = 'none';
    cameraOutput.style.display = 'block';
}

buttonAbrirCamera.addEventListener('click', () => {
    containerCamera.style.display = 'flex';
    navigator.mediaDevices
        .getUserMedia(contrains)
        .then(stream => {
            stream.getTrack[1];
            cameraView.srcObject = stream;
        })
        .catch(err => {
            console.error(err);
        });
});

buttonTirarFoto.addEventListener('click', () => {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.heigth = cameraView.videoHeigth;
    cameraSensor.getContext('2d').drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL('images/webp');
    cameraOutput.classList.add('taken');
})

buttonFecharCamera.addEventListener('click', () => {
    containerCamera.style.display = 'none';
});

cameraTrigger.addEventListener('click', () => {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.heigth = cameraView.videoHeigth;
    cameraSensor.getContext('2d').drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL('images/webp');
    cameraOutput.classList.add('taken');
});