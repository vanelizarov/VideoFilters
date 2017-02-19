require('webrtc-adapter');

//
//  DOM elements
//

const cameraView = window.video = document.getElementById('camera-view');
const filterButtons = document.querySelectorAll('button.button-filter');
const snapshotButton = document.querySelector('button.button-snapshot');

const constraints = {
    audio: false,
    video: true
};

//
//  Callbacks for getUserMedia()
//

const onMediaStream = (stream) => {
    window.stream = stream;
    cameraView.srcObject = stream;
};

const onNoMediaStream = (error) => {
    console.log(`No media stream, ${error}`);
};

navigator.mediaDevices.getUserMedia(constraints)
                        .then(onMediaStream)
                        .catch(onNoMediaStream);

//
//  Event listeners
//

filterButtons.forEach((b) => {
    b.addEventListener('click', (e) => {
        let filter = e.target.id === 'no-filter' ? '' : `url(../assets/filters.svg#${e.target.id})`;
        cameraView.style.webkitFilter = filter;
        cameraView.style.filter = filter;
    });
});

snapshotButton.addEventListener('click', () => {

    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    canvas.width = getComputedStyle(cameraView, null).width.replace('px', '');
    canvas.height = getComputedStyle(cameraView, null).height.replace('px', '');

    context.filter = getComputedStyle(cameraView, null).filter;
    context.drawImage(cameraView, 0, 0, canvas.width, canvas.height);

    let img = document.getElementById('snapshot-view');
    img.crossOrigin = 'anonymous';
    img.src = canvas.toDataURL('png');

});
