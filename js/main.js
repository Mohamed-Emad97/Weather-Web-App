//Global Variblies
//Days 
const firstDay = document.querySelector("#days");
const secondDay = document.querySelector("#next-day");
const thirdDay = document.querySelector("#next-day-2");
//Date
const dateOfDay = document.querySelector("#date");
//degree 
const firstDegree = document.querySelector("#degree");
const secondDegree = document.querySelector("#nextDegree");
const thirdDegree = document.querySelector("#nextDegree-2");
const firstMinDegree = document.querySelector("#minDegree");
const secondMinDegree = document.querySelector("#minDegree-2");
//Weather Details
const country = document.querySelector("#city");
const rainy = document.querySelector("#rainy");
const wind = document.querySelector("#wind");
const campass = document.querySelector("#compass");
const firstDescription = document.querySelector("#description");
const secondDescription = document.querySelector("#next-description");
const thirdescription = document.querySelector("#next-description-2");
//Images Icons
const firstImg = document.querySelector("#weatherImg");
const secondImg = document.querySelector("#nextImg");
const thirdImg = document.querySelector("#nextImg-1");
//search 
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const errorAlert = document.querySelector("#error");
//API Url 
let keyUrl = `51f98e4d9fb64934b1275415220106`;
let fullUrl = `http://api.weatherapi.com/v1/forecast.json?key=${keyUrl}&q=cairo&days=7`;
//Date Variblies
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const day = new Date();
let date = day.getMonth();
let newDay = day.getDay();
let dayNum = day.getUTCDate(); //Number Of Day
let currentDay = days[newDay]; //Day 
let currentMonth = months[date];// Month
console.log(days.length);
getData();
//Program Events
searchBtn.addEventListener("click", function(e){
    if (search.value == "") {
        e.preventDefault();
        errorAlert.classList.add("d-block");
        errorAlert.classList.remove("d-none");
    }else {
        e.preventDefault();
        errorAlert.classList.add("d-none");
        errorAlert.classList.remove("d-block");
        searchTxt = search.value;
        searchData(searchTxt);
    }
})


//Program Functions
async function getData() {
    let ressponse = await fetch(fullUrl, {
        method: "GET",
    });
    let data = await ressponse.json();
    display(data);
    console.log(data);
}

async function searchData(city) {
    let searchUrl = `http://api.weatherapi.com/v1/forecast.json?key=${keyUrl}&q=${city}&days=7`;
    let ressponse = await fetch(searchUrl, {
        method: "GET",
    });
    let data = await ressponse.json();
    display(data);
    console.log(data);
}

function display(data) {
    //Days & Date
    firstDay.innerHTML = currentDay;
    dateOfDay.innerHTML = `${dayNum} ${currentMonth}`;
    secondDay.innerHTML = days[newDay+1] == undefined? days[0] : days[newDay+1];
    thirdDay.innerHTML = newDay == (days.length-1)? days[1] : days[newDay+2] == undefined? days[0] : days[newDay+2];
    //First Day
    country.innerHTML = data.location.name;
    firstDegree.innerHTML = `${Math.round(data.current.temp_c)} C`;
    firstDescription.innerHTML = `${data.current.condition.text}`;
    rainy.innerHTML = `${Math.round(data.current.gust_mph)}%`;
    wind.innerHTML = `${data.current.wind_kph} KM`;
    campass.innerHTML = data.current.wind_dir;
    firstImg.setAttribute("src",data.current.condition.icon);
    //Second Day
    secondDegree.innerHTML = `${Math.round(data.forecast.forecastday[1].day.maxtemp_c)} C`;
    firstMinDegree.innerHTML = `${Math.round(data.forecast.forecastday[1].day.mintemp_c)} C`;
    secondDescription.innerHTML = `${data.forecast.forecastday[1].day.condition.text}`;
    secondImg.setAttribute("src",data.forecast.forecastday[1].day.condition.icon)
    //Third Day
    thirdDegree.innerHTML = `${Math.round(data.forecast.forecastday[2].day.maxtemp_c)} C`;
    secondMinDegree.innerHTML = `${Math.round(data.forecast.forecastday[2].day.mintemp_c)} C`;
    thirdescription.innerHTML = `${data.forecast.forecastday[2].day.condition.text}`;
    thirdImg.setAttribute("src",data.forecast.forecastday[2].day.condition.icon)

}