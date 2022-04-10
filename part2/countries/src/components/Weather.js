import {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({country}) => {
    const apiKey = process.env.REACT_APP_API_KEY
    const [temp, setTemp] = useState("")
    const [wind, setWind] = useState("")
    const [weather, setWeather] = useState("")

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}&units=metric`)
            .then(response => {
                console.log(response.data)
                setTemp(response.data.main.temp)
                setWind(response.data.wind.speed)
                setWeather(response.data.weather[0].icon)
            })
    }, [])

    console.log(temp)

    return (
        <>
            <h3>Weather in {country.capital[0]}</h3>
            <p>temperature {temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather}@2x.png`} alt={"Country flag"}/>
            <p>wind {wind} m/s</p>
        </>
    )
}

export default Weather