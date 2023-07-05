const link = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkHuC23We9rcH7ZsM1PdaT1g3RGSAjG4qpXpk8CIelBU2k7XZXQfpznlvDzGWbr-NXdetaFkw8LeF4/pub?output=tsv'
const audio = document.getElementById("myAudio"); 
const audioBtn = document.getElementById("audioBtn"); 

const acara = [
    '10.00 - 12:00',
    '10.00 - 12:00',
    '12.00 - 14:00'
]

const urlParams = new URLSearchParams(window.location.search)
const to = urlParams.get('to') || 'Tamu'
const sesi = urlParams.get('sesi') || 1


document.querySelector('#toName > u').innerText = to
document.querySelector('#jadwalAcara > b').innerText = acara[parseInt(sesi)]

console.log(to);
console.log(sesi);

function playAudio() { 
    if(audio.paused) {
        audio.play()
        audioBtn.src = './img/pause.svg'      
        console.log('played');    
    } else {
        audio.pause()
        audioBtn.src = './img/play.svg'      
        console.log('paused');

    }
} 

async function fetchDoa() {
    let res = await fetch(link)
    let csv = await res.text()

    //remove html
    csv = csv.replace(/(<([^>]+)>)/ig, '')
    
    let data = csv.split('\r\n')
    data.shift()

    data = data.map(x => x.split('\t') )

    displayData(data)
}

function displayData(data) {
    const el = document.querySelector('#chatContainer')
    const color = ['#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#ff9800', '#009688', '#4caf50', '#607d8b', '#ff5722']

    data = data.map(x => {
        const random = Math.floor(Math.random() * 10);
        let initial = x[1].split('')
        initial = initial[0].toUpperCase();

        return `
            <div class="flex-container">
                <div>
                    <span class="dot" style="background: ${color[random]}">
                        <b>${initial}</b>
                    </span>
                </div>
                <p>
                    <b>${x[1]}</b> (${x[0]})
                    <br>
                    <br>
                    ${x[3]}
                </p>
            </div>    
            `
    })

    el.innerHTML = data.join('\n')
}


fetchDoa()
document.querySelector('.modal-state').checked = true

setTimeout(() => {
    window.onscroll = function () {  
        // console.log('scroll');
        if(audio.paused) {
            playAudio()
        }
    }    
}, 1111);
