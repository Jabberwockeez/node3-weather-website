const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value
    const url = 'http://127.0.0.1:3000/weather?address=' + encodeURIComponent(location)

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})