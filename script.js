let celciustemp;
let isCelsius = true;

async function weather() {

    const result_container=document.querySelector(".weather-result")
    const inp=document.getElementById("locationInput").value

    const base = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const apiKey = "GS45NCHPG49EA2D3PX4GXANPA";

    const finalurl = `${base}${inp}?unitGroup=metric&key=${apiKey}`;

    const response=await fetch(finalurl)
    const data=await response.json()

    console.log(data);

    const location=data.resolvedAddress;
    celciustemp=data.currentConditions.temp;
    const humidity = data.currentConditions.humidity;
    const condition = data.currentConditions.conditions;

    result_container.innerHTML=`
    <h3>${location.charAt(0).toUpperCase() + location.slice(1)}</h3>
    <p id="tempC">🌡 Temperature: ${celciustemp}°C</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>☁ Condition: ${condition}</p>
    `
    const toggleBtn = document.createElement("button");
toggleBtn.id = "toggle";
toggleBtn.classList.add("toggle-btn")
toggleBtn.innerText = "Show °F";

result_container.appendChild(toggleBtn);

    toggleBtn.addEventListener("click",()=>{

        if(isCelsius){
            const tempText=document.getElementById("tempC").innerText;
            const temper = parseFloat(tempText.slice(tempText.indexOf(":") + 1, tempText.indexOf("°")));
            const faren=(temper*1.8)+32

            document.getElementById("tempC").innerText = `🌡 Temperature: ${faren}°F`;
            toggleBtn.innerText = "Show °C";
            isCelsius = false;
        }
        else{
            const tempText=document.getElementById("tempC").innerText;
            document.getElementById("tempC").innerText = `🌡 Temperature: ${celciustemp}°C`;
            toggleBtn.innerText = "Show °F";
            isCelsius = true;
        }
    })
}

const form = document.getElementById("weatherForm");

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    weather()
})