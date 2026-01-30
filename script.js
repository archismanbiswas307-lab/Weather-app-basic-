const container =document.querySelector('.container');
const search =document.querySelector('.search-box button');
const weatherBox =document.querySelector('.weather-box');
const weatherDetails =document.querySelector('.weather-details');
const error404=document.querySelector('.not-found');
const cityHide=document.querySelector('.city-hide');

search.addEventListener('click' , () =>{

    const APIKey='aaa062e925ecf5a201945fec0f9b84eb';
    const city = document.querySelector('.search-box input').value;

    if(city == '') return ;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        
        if (json.cod == 404) {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box .box .info-weather .weather img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return;
        }

        else{
                cityHide.textContent = city;

                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');
                
            setTimeout(() => {
                container.classList.remove('active');   
            }, 2500);

            switch (json.weather[0].main ) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;

                case 'Rain':
                    image.src = 'rain.png';
                    break;

                case 'Snow':
                    image.src = 'snow.png';
                    break;

                case 'Clouds':
                    image.src = 'cloud.png';
                    break;

                case 'Mist':
                    image.src =  'mist.png';
                    break;

                case 'Haze':
                    image.src = 'mist.png';
                    break;
                
                default:
                    image.src = 'cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneinfoWeather = infoWeather.cloneNode(true);
            const elCloneinfoHumidity = infoHumidity.cloneNode(true);
            const elCloneinfoWind = infoWind.cloneNode(true);

            elCloneinfoWeather.id ='clone-info-weather';
            elCloneinfoWeather.classList.add('active-clone');

            elCloneinfoHumidity.id ='clone-info-humidity';
            elCloneinfoHumidity.classList.add('active-clone');

            elCloneinfoWind.id ='clone-info-wind';
            elCloneinfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend" , elCloneinfoWeather);
                infoHumidity.insertAdjacentElement("afterend" , elCloneinfoHumidity);
                infoWind.insertAdjacentElement("afterend" , elCloneinfoWind);
            }, 2200);

            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];
            
            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];

            if (totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200);
            }
        }

    });
});



