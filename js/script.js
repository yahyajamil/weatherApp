let tempElem = document.querySelector(".Temp");
let condition = document.querySelector(".small");
let city = document.querySelector(".city");
let windSpeed = document.querySelector(".wind-speed");
let humidity = document.querySelector(".humidity");
let sunRise = document.querySelector(".sun-rise");
let sunSet = document.querySelector(".sunset");
const weatherImage = document.querySelector(".weather-image img");
const cardContainer = document.querySelector(".card-container");
const statusBar = document.querySelector(".status-bar");

class EasyHttp {
   timeInterval;
   get(url) {
      return new Promise((resolve, reject) => {
         fetch(url)
            .then((res) => { return res.json() })
            .then((data) => {
               console.log(data);
               city.textContent = inputElem.value;

               let tzoffset = data.tzoffset;
               clearInterval(this.timeInterval); 

               function updateCurrentTime() {
                  const currentTime = new Date();
                  const adjustedTime = new Date(currentTime.getTime() + tzoffset * 60 * 60 * 1000);
                  const slicedTime = adjustedTime.toUTCString().slice(17, 25);
                  document.querySelector(".time").innerHTML = slicedTime;
               }

               updateCurrentTime();
               this.timeInterval = setInterval(updateCurrentTime, 1000);

               tempElem.textContent = `${data.currentConditions.temp}°C`;
               tempElem.style.fontSize = "3.5rem";
               condition.textContent = data.days[0].conditions;

               windSpeed.textContent = `${data.currentConditions.windspeed} km/h`;
               humidity.textContent = `${data.currentConditions.humidity}%`;
               sunRise.textContent = `${data.currentConditions.sunrise}`;
               sunSet.textContent = `${data.currentConditions.sunset}`;


               if (data.days[0].conditions === "Sunny" || data.days[0].conditions === "Clear") {
                  weatherImage.src = 'icons/day.svg';
               } else if (data.days[0].conditions === "Cloudy") {
                  weatherImage.src = 'icons/cloudy.svg';
                  
               } else if (data.days[0].conditions.includes("Snowy")) {
                  weatherImage.src = "icons/snowy1.svg";
                 
               } else if (data.days[0].conditions.includes("Rain")) {
                  weatherImage.src = "icons/rainy1.svg";
                  
               } else if (data.days[0].conditions.includes("Storm")) {
                  weatherImage.src = "icons/thunder.svg";
                  
               } else if (data.days[0].conditions.includes("Wind")) {
                  weatherImage.src = "icons/cloudy2.svg";
                  
               } else {
                  weatherImage.src = 'icons/cloudy3.svg';
                  
               }
               weatherImage.alt = data.days[0].conditions;

               cardContainer.classList.remove("d-none");
               statusBar.classList.remove("d-none");
               statusBar.classList.add("d-flex");

            })
            .catch((err) => {
               cardContainer.classList.remove("d-none");
               statusBar.classList.remove("d-flex");
               statusBar.classList.add("d-none");
               tempElem.textContent = "The City is invalid";
               tempElem.style.fontSize = "14px";
               condition.textContent = "";
               city.textContent = "";
               document.querySelector(".time").innerHTML = "";
               clearInterval(this.timeInterval)
            });
      })
   }
}

