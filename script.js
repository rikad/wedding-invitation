
async function fetchDoa() {
    const link = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkHuC23We9rcH7ZsM1PdaT1g3RGSAjG4qpXpk8CIelBU2k7XZXQfpznlvDzGWbr-NXdetaFkw8LeF4/pub?output=tsv'

    let res = await fetch(link)
    let csv = await res.text()
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

        return `
            <div class="flex-container">
                <div>
                    <span class="dot" style="background: ${color[random]}">
                        <b>R</b>
                    </span>
                </div>
                <p>
                    <b>${x[1]}</b> 
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