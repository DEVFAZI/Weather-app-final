const express = require("express");
const app = express();
const bodyParser = require("body-parser")
port = 3000;
const https = require('node:https');



app.get("/",(req,res)=>{
 res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="https://cdn.iconscout.com/icon/free/png-256/free-weather-191-461610.png" type="image/x-icon">
  <title>Weather-App | Cheak Weather</title>
  <Style>

    body{
      background-color: #87CEEB;
    }
    .container{
      height: 43vh;
    }
    
    .heading{
      margin-top: 25vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .heading h1{
      font-size: 1.5em;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      color: rgb(69, 87, 115);
    }
    
    .input{
      /* height: 97vh ; */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .input input{
      border: 3px solid black;
      text-align: center;
      margin-top: 30px;
      font-size: 30px;
      font-weight: 600;
      color: black;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      padding-top:0px ;
      height: 50px;
      width: 750px;
      border-radius: 8px;

    }

    .input input:active{
      border-color: #08455d;
      border-width: 3px;
    }

    .input input::placeholder{
      text-align: center;
      font-size: 27px;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #66BFBF;
    font-family: "Montserrat", sans-serif;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border: none;
    margin-top: 20px;
   }
   
   button:after {
    content: " ";
    width: 0%;
    height: 100%;
    background: #FFD401;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
   }
   
   button:hover::after {
    right: auto;
    left: 0;
    width: 100%;
   }
   
   button span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 18px 25px;
    color: #fff;
    font-size: 1.125em;
    font-weight: 700;
    letter-spacing: 0.3em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
   }
   
   .note{
    font-size: 1.5em;
    color: red;
   }

   button:hover span {
    color: #183153;
    animation: scaleUp 0.3s ease-in-out;
   }
   
   @keyframes scaleUp {
    0% {
     transform: scale(1);
    }
   
    50% {
     transform: scale(0.95);
    }
   
    100% {
     transform: scale(1);
    }
   }
   
   .btn{
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
   }
  </Style>
</head>
<body>
  <h1 class="note">Note: Click on the Weather Card to Get Farther Updates about Weather when the card appears</h1>
  <div class="container">
    <div class="heading">
      <h1>Welcome To Weather App</h1>
    </div>
    <form action="/" method="post">
    <div class="input">
    <input type="text" name="userCity" id="UserCity" placeholder="Enter Your City Name">
  </div>
  <div class="btn">
    <button type="submit">
      <span>Get Weather</span>
    </button>
    </div>
  </form>
  </div>
     
</body>
</html>`)

})

app.use(bodyParser.urlencoded({extended:true}))

app.post("/", (req,res)=>{
  console.log(req.body.userCity)
  

  let userCity = req.body.userCity;
  let url =`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=d342e60d9c20c020411b2bb98654b44b&q=${userCity}`

  https.get(url,(response)=>{
       response.on("data",(data)=>{
          const weatherData = JSON.parse(data)
          const temp = Math.floor(weatherData.main.temp);
          const feelLikeTemp = weatherData.main.feels_like;
          const pressure = weatherData.main.pressure;
          const humidity = weatherData.main.humidity;
          const wind = weatherData.wind.speed;
          const countryLocation = weatherData.sys.country;
          const yourLocation = weatherData.name;
          const clouds = weatherData.clouds.all;
          const icon = weatherData.weather[0].icon
          const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
          res.send(`<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="style.css">
              <link rel="shortcut icon" href="https://cdn.iconscout.com/icon/free/png-256/free-weather-191-461610.png" type="image/x-icon">
              <title>Weather-App | Cheak Weather</title>
              <style>
                  *{
              box-sizing:border-box;
              margin:0;
              padding:0;
            }
            html,
            body {
              height:100vh;
              display:flex;
              align-items:center;
              justify-content:center;
              background-color: #c3e3f1fa;
              font-family:arial;
              
            }
            .cardm {
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              top: 46.64%;
              left: 50%;
            }
            
            .card {
              position: absolute;
              width: 250px;
              height: 130px;
              border-radius: 25px;
              background: whitesmoke;
              color: black;
              z-index: 2;
              transition: .4s ease-in-out;
              background-color : #87CEEB;
            }
            
            .weather {
              position: relative;
              margin: 1em;
            }
            
            .main {
              font-size: 2em;
              position: relative;
              top: -3em;
              left: 4.3em;
            }
            
            .mainsub {
              position: relative;
              top: -10.2em;
              left: 14em;
              font-size: 0.6em;
            }
            
            .card2 {
              position: absolute;
              display: flex;
              flex-direction: row;
              width: 240px;
              height: 130px;
              border-radius: 35px;
              background: white;
              z-index: -1;
              transition: .4s ease-in-out;
            }
            
            .card:hover {
              background-color: #FFE87C;
              cursor: pointer;
            }
            
            .card:hover + .card2 {
              height: 300px;
              border-bottom-left-radius: 0px;
              border-bottom-right-radius: 0px;
            }
            
            .card:hover + .card2 .lower {
              top: 20.2em;
            }
            
            .upper {
              display: flex;
              flex-direction: row;
              position: relative;
              color: black;
              left: 1.8em;
              top: 0.5em;
              gap: 4em;
            }
            
            .humiditytext {
              position: relative;
              left: 3.6em;
              top: 2.7em;
              font-size: 0.6em;
            }
            
            .airtext {
              position: relative;
              left: 3.8em;
              top: 2.7em;
              font-size: 0.6em;
            }
            
            .lower {
              display: flex;
              flex-direction: row;
              position: absolute;
              text-align: center;
              color: black;
              left: 3em;
              top: 1em;
              margin-top: 0.7em;
              font-size: 0.7em;
              transition: .4s ease-in-out;
            }
            
            .aqi {
              margin-right: 3.25em;
            }
            
            .realfeel {
              margin-right: 1.8em;
            }
            
            .card3 {
              position: absolute;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              width: 240px;
              height: 30px;
              top: 4.7em;
              left: -2.4em;
              font-size: 1.24em;
              border-bottom-left-radius: 35px;
              border-bottom-right-radius: 35px;
              background: limegreen;
              transition: .4s ease-in-out;
            }
              </style>
          </head>
          <body>
              
              </div>
              <div class="cardm">
                  <div class="card">
                  <img src="${imgUrl}" alt="" class="weather">
                   
                    <div class="main"> ${temp} °C</div>
                    <div class="mainsub">${yourLocation}, ${countryLocation}</div>
                
                  </div>
                
                  <div class="card2">
                    <div class="upper">
                      <div class="humidity">
                        <div class="humiditytext">Humidity<br>${humidity}%</div>
                        <svg xml:space="preserve" viewBox="0 0 30 30" height="30px" width="30px" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1" class="humiditysvg">  <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                          AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABiVBMVEUAAAAAAP9NerV/f39O
                          e7ZQfLZVf6pRfbfL5fdRfbZIbbZmmcxols5nl85OebSPsteLrdVSfLZxl89ok9FqlM5ahsBdicNa
                          hsFcicRhjcdWgbpahsFfi8ZbhsFijsmErOWLt+9xndZcicJahsFahsFdicN5n81xjcZqlNRpls1q
                          lNBfn99pls9nkcxXgrpZgrtik81OebWNsdeMrtZOebRNerVZg7pwmMhNebRKdLRNerZNebHZ8v9o
                          lM9jj8rV7v3W7v1ch7+Ktu6Lt/CEsep7p+Cz1PO+3fqJte5/q+V+quOUvvLY8f+TvfKpzvapzfaq
                          z/aRvPGdxfSVv/LX8P/W8P+32fnK5vyMuPCmzPXW8P6ny/WWv/KOufGawvO22PjJ5vzB4PrU7v6i
                          yPSz1fiYwfKOufDD4funzPXF4vvE4vuOuvHV7/7U7/7G4/uNufCx1Pew0/ev0veu0feQu/G01viP
                          ufF/q+SCrud+quSItO2kyvWjyfVijslrltFmkcyEqtZgjMf///8NXQssAAAAPHRSTlMAAZgCW+EG
                          y+jMBxRaRXHC2H8bX0ry/vrhyvnw0PDHR0Be/e/4/f4SDDNiEFVb0eI5iMHCho7NwI0YOBdy59Cm
                          AAAAAWJLR0SCi7P/RAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cCEBITAJMBs+kAAAFb
                          SURBVCjPY2CAAUYmZgY8gIWVBY8sGzsHJxc2CW4eXiDJx28jIAjiCgnzgoV5ebiBpIiomK2duISk
                          lL2Ng6O0jIwsmCsnIW5nKyYqwiDv5AwELq5uNjY27h6enh5grpcLiHKSZ1BwBgNvH6C0j68zKlCA
                          SfvZgIA/LukAsHQAVDgwCE06OAQoGxoMlQ4Lj0CVdo6MsomKhrJjfGwi0aSdY+NiYcx4G5sEdGkk
                          kGhjk4RHOjnEJgWPtLNvKprL07CpgktHpEfgk/a3ycAnnWmThRDMxpDOscmFi6Xl5aNLF+QUwqWL
                          bIoxogQBSpJskkpwS5cC4yYFp3RZElA6qQwh7VFeAWZXVFYByWpwxNcAueUeQGlFJWUZCZXauloV
                          CRllVdt6NbB0QyOIq6TIoK4BSrWaWpogSltHVw8srW8A4mqoY6R6QyOgrLEJztxiamZuZsGGOztZ
                          WlnD2QBCYbJl9Cx9XAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xNlQxODoxOTowMCswMDow
                          MG/wqfUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDItMTZUMTg6MTk6MDArMDA6MDAerRFJAAAA
                          KHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAyLTE2VDE4OjE5OjAwKzAwOjAwSbgwlgAAAABJRU5ErkJggg==" y="0" x="0" height="30" width="30" id="image0"></image>
                          </svg>
                      </div>
                
                      <div class="air">
                        <div class="airtext">Wind<br>${wind} Km/h</div>
                          <svg class="airsvg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" xml:space="preserve">  <image id="image0" width="30" height="30" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABaFBMVEUAAAAA//8ilfIhlfMg
                            lvIglfMglvIeku8cjf8glvMhlfIflvMhlfIhlvIglvMhl/MglvIglfIglPEfmfIhlfIglvQfn/8g
                            lfIglvIhlfMglfIglvMhl/AhlfIcm/AAf/8qlOkglPYglvIZmf8zmf8hlfIglfIXi+cilPMhlvMg
                            lfQhlvMglvIhlfIgl/MglvMhlvMhlfMhlvIfl+8hlvMhlfMglvMglvI/f/8hlvMilvMelvAglfIg
                            lvMhlvIglPIglvIhlfIkkfUglfMglfMhlvMhlvMilvMjlfEglvMhlfIhlfMglfIflvEnnOshlvIf
                            lPEflfIek/QglvIglvMhlfIime4jlPAglvMglvEhlvMhl/MglfMglfMhlvIak/Edk/UhlvIglfMg
                            l/IglvIglfIilPIhlvMhlfMhk/Eqqv8glvIglfMcl/UhlfMhlvIhlvMhlfIglfIhlfIgl/QflPQh
                            lvP///+FIn/GAAAAdnRSTlMAAVKu1MmNIQmy91ig/Z5s0fo3KP5dCL27Lvm0NvwSAgwf+woFv7oL
                            Q0RGa9L1Vtndx4sgme3FZgTIFiI/hvZld3sch8Tv7kI683nV6DgN4GBQMsycjw8k6nWqRW3cUxMa
                            5dpnfLU87N8mBrxXG5jnibjLoi8YaHuXCQAAAAFiS0dEd0Zk+dcAAAAJcEhZcwAACxMAAAsTAQCa
                            nBgAAAAHdElNRQfnAhEIBBbLW8PtAAABJ0lEQVQoz62RZ1fCMBSG46atomBR1IJ7g+KotKKgxYl7
                            4Z6493x/v6T0QKMtn/p8ec/Nk5Pc5BLiHCWlZeUVlVU21sWBwgvWuho1bqG2Dh6vla0X4ctGQyP8
                            VrqpuUVPCQGXlQ+26tEGtBfpX0JHp73t6kYPs9Db159nYDAEj8RoNxjCQ+xxvuFIgZHRMcemQMi4
                            iP+I8kRU0TUHG9RJqpWYFVPTcahKsc/jkSAzfgNuVvvjk5gj84W7FhZZvYRl4o0apFawGmT0GsKm
                            an0DmzS31O3cQgo75t27SNLYQyRNc/8AhzkROzrOPjCEE1poMk7Pzi8Sl7gyxp5B/Fq4Aa//A7m9
                            y7V6/2Ac+/hEy8CzUb68ysDbezp/rZL5+Pz6NvWh/TgwzV+1HV523WQ81AAAACV0RVh0ZGF0ZTpj
                            cmVhdGUAMjAyMy0wMi0xN1QwODowNDoyMiswMDowML1dmzYAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
                            MjMtMDItMTdUMDg6MDQ6MjIrMDA6MDDMACOKAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAy
                            LTE3VDA4OjA0OjIyKzAwOjAwmxUCVQAAAABJRU5ErkJggg=="></image>
                        </svg>
                      </div>
                    </div>
                
                    <div class="lower">
                      <div class="aqi">
                        <svg class="aqisvg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                          AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABBVBMVEUAAABL4f9O5v9P5f9Q
                          5f9R5/8AZsxB0vYAd9EAeNQAd9MeoOM1w/EYmuIZm+IXnOIAAP8AccYmrOgYmuAWneEA//8AdtQZ
                          m+JP5f8ZmeUAf89L3vwcoOQYmeIAddEAeNUrseocjeIAd9QAeNMxu+4kqucZmuEYm+IWmeI5xfIf
                          n99P3/9Q5v9Q5v9Q5v9G2Pk0wPA+zfZN4v5L3/w+zfUyve8iqOcrs+s9zPVM4f1N4v1E1vklrOki
                          p+cmrOhH2fpP5f5F1/kstewqs+tO4/4nruott+0or+pL3vxE1flK3vxA0fcjqecrtOxO5P4yvvAs
                          tOw6yPNA0Pc7yfQ4xfI3xPL////cI4U2AAAALnRSTlMAEXF3ZWsFeC3S26iVh7MsAQnAVCIBZ7Ft
                          ChBv6GonVZQJs4yLxtPNLY8IEHuINVg0ZAAAAAFiS0dEVgoN6YkAAAAJcEhZcwAACxMAAAsTAQCa
                          nBgAAAAHdElNRQfnAhIFCRn0J5yMAAAAq0lEQVQY02NgIAkwMjFDARMjXJBFDw5Y4IKsCEFWmBgb
                          u56+gaERsiAHJxe3nrGJqZm5haWeFQ8vHz9QUEAQqt3a1MbWTkhYRBRmprG9A5qZYuJ6jk62ziYu
                          QEEJSaiglDRIjaOpraubu4wsupM8PL2g2gXk5BX0vH18LYwgZiqCLOJQUlbR0/Nz9LcNCAwKVlVT
                          10DRbh1iGqqphc+b2ANEW0cXCnS0SQt0ALCcIug70CWhAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIz
                          LTAyLTE4VDA1OjA5OjI1KzAwOjAwRMIpTAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wMi0xOFQw
                          NTowOToyNSswMDowMDWfkfAAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMDItMThUMDU6MDk6
                          MjUrMDA6MDBiirAvAAAAAElFTkSuQmCC"></image>
                        </svg>
                        <div class="aqitext">Clouds<br>${clouds}</div>
                      </div>
                
                      <div class="realfeel">
                        <svg class="rfsvg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                          AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABuVBMVEUAAAAAAAAECQkIDg4E
                          BAQAAAAAAAAFBQUHDAwIDg4MFBUNFRUKCgoPGhxGenw/b3FDdXcmRUYJDAwJDw9Pi40LFBQNFhYM
                          FhYPGhsMExUKEhIPGhoKEhQMExMOGhoMExMPGhoKFBQLExMNFxcKEhILFBQKExMKExQLEhILERMK
                          EREHDQ1SkJMuUlMABAQAAAASHh9FeXtAcXI8aWszWlwvU1M4Y2QjPT4NGBoAAAAAAAAAAAAAAAAA
                          AAAAAAAAAAAAAABYmZtWlplKgoVlsbRsvsF0zM9uwsVuwcNsvb9ecU53czF0bStgbkdqt7dntbhp
                          tbVxaCf5uxD+vxD7vBBTUilYlZdtwMNms7Zdc1P8vRDYpBR5b0imsKy0wcFzhoZdkpRldEx6cU3W
                          5eWLnJxdm51otrlZdl67kBWxvbmUo6RmfHxajo9ouLpqt7mJdiN8YxnH1dWVpaVfn6Jgl41OUUKv
                          u7pWe3xwxsldn6KmtLTO3NxUf4BswMN0ys1gpaedrKzT4uJjd3dsvcBqubxXg4Vgd3hthYVid3dh
                          dnZof39shYVkf4BVeXpqt7pksbJjr7Jdo6X////f0mPcAAAAQXRSTlMABGh/a1xUZIqPo7BH2vv4
                          /vJQgvyxwLLCpqXBsafBqcKutcCwuamtop+SgPzwOQzg/f728fD166Zla1o/PiEmFs+XjUIAAAAB
                          YktHRJKWBO8gAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wISBQ8aO3RqsAAAAQlJREFU
                          GNNjYMAOGJmYmVlY2djYmZk5OLm4ecBivHyOTs7O/ALOTo6Oji6ugkJAQWERNxTgLgoUFEMVc/MQ
                          BwpKuLl5enn7+PpBBf0lwYIBgUHBwSGhYeFgwQgpoKC0W2RUcHB0TGxcfAJYuwxYMDE4OCgpGQhS
                          UoGCabJAQTm39KDgjEyQYHJWdo5brjxQUMEtLz+ooDAZAoqKXRXBgm4lpWXJMFBeoQQUVHZzq6yC
                          i1XX1KoABVXr3OobYGKNTc0takBBdVc3t9a29vaOzq7unt4+t34NoKDmBFRvTtQCCmrroArq6gEF
                          9Q0MnY2MTUxNzYxBwNwCHMj6llbWNrZ29jZg4IAjKhgAAWdbVO4nzP4AAAAldEVYdGRhdGU6Y3Jl
                          YXRlADIwMjMtMDItMThUMDU6MTU6MjYrMDA6MDCumAyfAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIz
                          LTAyLTE4VDA1OjE1OjI2KzAwOjAw38W0IwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0x
                          OFQwNToxNToyNiswMDowMIjQlfwAAAAASUVORK5CYII="></image>
                        </svg>
                        <div class="realfeeltext">Real Feel<br>${feelLikeTemp} °C</div>
                      </div>
                
                      <div class="pressure">
                        <svg class="pressuresvg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                          AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABNVBMVEUAAAAAr8EArMAAqsAA
                          rMEBrMEBrMAAq8AArb8AqsIBrMEgtMa53+S53+QetMYArMEArMEAqrsArMA9scFegp4Cqr8Ao8gA
                          rMEErMHn6+wTobgArMAArMBCvc1sco8Aq8EArMFSqrmNWn1Dvs4Aq8EErcLo7O0SorgArMAAq8A8
                          sMBie5gCqr8BrMEftMa23eO33uQcs8YAq8AArMAAq8ABq8AAq8EAq8Mtdn9DW2OvvcSwvcSrucJ3
                          kZyvvcWvv8OruMJ6kZ55kJ2rusAArMHFzdLH0NS5xMru7u7l5+jm6Ojp3eDd4OK2ubvAhZL4G0en
                          rK1YYWV3foHu7e39Mlns7OwzXWQxW2Tl5+f6VHSssLKpra/9MVnc4OL1m6y5xcvv09kxcX5FWmR4
                          kJywvsWsusL///80ikJBAAAARHRSTlMAHUotv/j5vSw/9cvd3MrzPg/q4+rqDnXk+/NzucP3t873
                          /cJ05Przcunj8en0y93cyz28/vu7K1RASpWb/YBAhvP3hpKCbb4AAAABYktHRGYs1NklAAAACXBI
                          WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wISBRAIBZcVZgAAAM1JREFUGNNjYMAHGJmYGNGEmFlc
                          WNlc2DmQxTi5uHlc3Xj5+AUQYoJCwu4enl4e3iKiYnBBcQlJHw8PD18/fylpuKCMLFAoIDAoOERO
                          Hi6ooOjuERoWHuERqaSAUKkMVBkV7REcg6RSRVUtFijsEeevroGwXVMrHiSYoK2DsJ1BQFdP38PD
                          wJDfCNn1HMYmpqYmZuZoHrVITLTACBDLpCRLJK6VNRDY2CYn29qAWFZgQbsUIEhNBoJUEMsOLGhv
                          BwQOjk5Ojs4glj0DCQAAJCUofMKIT9cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDItMThUMDU6
                          MTY6MDgrMDA6MDBXtcu8AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTE4VDA1OjE2OjA4KzAw
                          OjAwJuhzAAAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xOFQwNToxNjowOCswMDowMHH9
                          Ut8AAAAASUVORK5CYII="></image>
                        </svg>
                        <div class="pressuretext">Pressure<br>${pressure} mbar</div>
                      </div>
                      <div class="card3">
                      Healthy
                      </div>
                    </div>
                  </div>
                </div>
                
          </body>
          </html>`)
      })
    
      
  })
})

app.listen(port, ()=>{
    console.log(`This server is running on port ${port}`)
})




