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

let contrains = { video: { facingMode: 'user' }, audio: false };

const cameraView = document.getElementById('cameraView');
const cameraOutput = document.getElementById('cameraOutput');
const cameraSensor = document.getElementById('cameraSensor');
const cameraTrigger = document.getElementById('cameraTrigger');

const cameraStart = () => {
    navigator.mediaDevices
    .getUserMedia(contrains)
    .then(stream => {
        stream.getTracks[0];
        cameraView.srcObject = stream;
    })
    .catch(err => {
        console.error('Ocorreu um erro: ' + err);
    });
};

cameraTrigger.addEventListener('click', () => {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.heigth = cameraView.videoHeigth;
    cameraSensor.getContext('2d').drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL('images/webp');
    cameraOutput.classList.add('taken');
});

window.addEventListener('load', cameraStart, false);