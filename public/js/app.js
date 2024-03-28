console.log("client")






const weatherForm = document.querySelector('form');
const loc = document.querySelector('.loc')
const data1 = document.querySelector('.data1')
const data2 = document.querySelector('.data2')


weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()

    const location = loc.value

    data1.textContent = "Loading..."
    data2.textContent=''
    console.log(location)
    if(location==''){
        data1.textContent = "Location shouldn't be empty"
    }

    fetch(`http://localhost:3000/weathers?location=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.Error){
            data1.textContent = data.Error
            console.log(data.Error)
        } else {
            data1.textContent = data.forecast
            data2.textContent = data.location
            console.log(data.forecast)
            console.log(data.location)
        }
    })
})


})