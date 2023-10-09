let inputElem = document.querySelector(".cityInput");
let inputBtn = document.querySelector(".btn");
let http = new EasyHttp();

inputBtn.addEventListener("click", function (e) {
    e.preventDefault();

    http.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputElem.value}?unitGroup=metric&include=current&key=KBPSGAD3JWGC35C6XJBJFDAN4&contentType=json`)
        .then(users => console.log(users))
        .catch(err => console.log(err));
});

inputElem.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        http.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputElem.value}?unitGroup=metric&include=current&key=KBPSGAD3JWGC35C6XJBJFDAN4&contentType=json`)
            .then(users => console.log(users))
            .catch(err => console.log(err));
    }
});








