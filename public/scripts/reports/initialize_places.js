async function initializePlaces(){
    let response = await fetch('/api/places')
    let places = await response.json()
    console.log(places);
    let places_dropdown = document.getElementById('places')

    for(let place of places){
        let option = document.createElement('option')
        option.value = place._id
        option.textContent = place.location
        places_dropdown.appendChild(option)
    }
}


document.addEventListener('DOMContentLoaded', async (event) => {
    await initializePlaces();
}) 