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
const buttonSalvar = document.getElementById('buttonSalvar');
const containerCamera = document.getElementById('containerCamera');
const cameraView = document.getElementById('cameraView');
const cameraOutput = document.getElementById('cameraOutput');
const cameraSensor = document.getElementById('cameraSensor');

let constraints = { video: { facingMode: 'user' }, audio: false };

const previewMode = () => {
    cameraView.style.display = 'none';
    buttonTirarFoto.style.display = 'none';
    cameraOutput.style.display = 'block';
    buttonTentarNovamente.style.display = 'inline-block';
    buttonSalvar.style.display = 'inline-block';
    cameraSensor.style.display = 'none';
};

const videoMode = () => {
    cameraView.style.display = 'block';
    buttonTirarFoto.style.display = 'inline-block';
    cameraOutput.style.display = 'none';
    buttonTentarNovamente.style.display = 'none';
    buttonSalvar.style.display = 'none';
    cameraSensor.style.display = 'block';
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
    cameraSensor.heigth = cameraView.videoHeigth;
    cameraSensor.getContext('2d').drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL('images/webp');
    previewMode();
});

buttonTentarNovamente.addEventListener('click', () => {
    videoMode();
});

buttonFecharCamera.addEventListener('click', () => {
    containerCamera.style.display = 'none';
});