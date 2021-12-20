
const COORDS = 'coords'
const apikey = 'db1e8e28d93cbbabad4f0162fa37dbdf';
const wea = document.querySelector(".wea");

function getweather(lat,long){
    //데이터를 얻는 함수
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`
    ).then(function(res){
        return res.json();//json을 얻음
    }).then(function(json){
        console.log(json);
        const speed = json.wind.speed;
        
       
        const temp = json.main.temp;
        const place = json.name;
        const description = json.weather[0].description;
        const temp_min = json.main.temp_min;
        const temp_max = json.main.temp_max;
        const humidity = json.main.humidity;
        const feels_like = json.main.feels_like;
        
        
        const pressure = json.main.pressure; //이런거 다 넣으면 너무 혼잡할것같에서 장소랑 온도만 넣었습니다.
        wea.innerText = ` location: ${place}
        templeture: ${temp}°C
        wind:${speed}m/s
        weather:${description}
        temp_min:${temp_min}°C
        temp_max:${temp_max}°C
        humidity:${humidity}%
        pressure:${pressure}Hpa
        feelslike: ${feels_like}°C
       
        
           `;
           
    });
   
    
}
 
function savecoord(obj){
    localStorage.setItem(COORDS,JSON.stringify(obj));
    
}

function handelsucces(position){ 
    
    console.log("handle Geo Success!!");
    console.log(position.coords.latitude);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsobj = {
        latitude,
        longitude
    };
    savecoord(coordsobj); //위치정보를 저장합니다???.
    getweather(latitude,longitude)
}
function handleerror(){
    console.log("위치정보를 가져올수없습니다.");
    alert("plese allow location")
}
 
function askcall(){
    navigator.geolocation.getCurrentPosition(handelsucces,handleerror);
    //현재위치를 가져오는 함수일까????
}
 
function loadcoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askcall();
    }
    else{
        const parseCoords = JSON.parse(loadCoords);
        console.log(parseCoords);
        getweather(parseCoords.latitude,parseCoords.longitude);
        
    }
}
 
function init(){
    loadcoords();
}
 
init();