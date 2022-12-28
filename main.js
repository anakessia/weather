document.querySelector(".search").addEventListener("submit", async (event) => {
    event.preventDefault();

    let input = document.querySelector("#searchInput").value;

    if (input !== "") {
        clearInfo();
        showWarning("Loading...");

     
     let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9104e92b527e018fe4ddb79d79d84d0c&units=metric&lang=pt_br`;

     //Requisição à API

     let results = await fetch(url);
     let json = await results.json();


        if (json.cod === 200) {
            showInfo({
             name: json.name,
             country: json.sys.country,
             temp: json.main.temp,
             tempIcon: json.weather[0].icon,
             windSpeed: json.wind.speed,
             windAngle: json.wind.deg
            });
        } else {
        clearInfo();
         showWarning("Location not found.");
        }
    } else {
    clearInfo();
    }

});

function showInfo(json) {
    showWarning("");
    document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${parseInt(json.temp)} <sup>°C</sup>`;
    document.querySelector('.windInfo').innerHTML = `${parseInt(json.windSpeed)} <span>Km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.windPointer').style.transform = `rotate(${json.windAngle-90}deg)`;
    document.querySelector('.result').style.display = 'block';
}

function clearInfo() {
    showWarning("");
    document.querySelector(".result").style.display = "none";
}

const showWarning = (msg) => {
    document.querySelector(".notice").innerHTML = msg;
};


    