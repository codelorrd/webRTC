// let get the webcam

let video = document.querySelector('video')

navigator.mediaDevices.getUserMedia({video:true})

.then((stream) => {
    video.srcObject = stream

    return video.play()
})

.then(() => {
    // button reference

    let button = document.querySelector('button')

    button.disabled = false

    // onclick for button 

    button.onclick = () => {
        // take selfie or snapshot

        takeSnapShot()

        .then(download)
    }
})

// snapshot method

function takeSnapShot(){
    // canvas element

    let canvas = document.createElement('canvas')

    let ctx = canvas.getContext('2d')

    canvas.width = video.videoWidth

    canvas.height = video.videoHeight

    // draw the video on the canvas

    ctx.drawImage(video,0,0)

    // convert canvas to blob

    return new Promise((res,rej) => {
        canvas.toBlob(res, "image/jpeg")
    })
}

// download function


function download(blob) {
    // anchor tag 

    let a = document.createElement('a')

    a.href = URL.createObjectURL(blob)

    a.download = "screenshot.jpg"

    document.body.appendChild(a)
    a.click()
}