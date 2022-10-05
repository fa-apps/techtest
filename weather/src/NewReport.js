import { useState } from "react";

const NewReport = ({ city, handleNewReport }) => {
  const [weather, setWeather] = useState("SUNNY");
  const [temperature, setTemperature] = useState(20);
  const [precipitation, setPrecipitation] = useState(0);
  const [humidity, setHumidity] = useState(20);
  const [wind, setWind] = useState(10);
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(9);
  const [day, setDay] = useState(25);
  const [hour, setHour] = useState("12:00");

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex-container gutter-xl ">
        <div>
          <label>Date:</label>
          <br />
          <input
            size="4"
            name="year"
            style={{ marginBottom: "10px", width: "3em" }}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            size="2"
            type="number"
            name="month"
            style={{ marginBottom: "10px", width: "2.7em" }}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            type="number"
            size="2"
            name="day"
            style={{ marginBottom: "10px", width: "2.7em" }}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <select
            name="hour"
            style={{ marginBottom: "10px", marginLeft: "20px" }}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          >
            {["06:00", "12:00", "18:00"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Weather:</label>
          <select
            name="weather"
            style={{ marginBottom: "10px", marginLeft: "20px" }}
            value={weather}
            onChange={(e) =>
              setWeather(e.target.options[e.target.selectedIndex].text)
            }
          >
            {[
              "SUNNY",
              "RAINY",
              "WINDY",
              "FOGGY",
              "SNOW",
              "HAIL",
              "SHOWER",
              "LIGHTNING",
              "RAINDBOW",
              "HURRICANE",
            ].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Temperature:</label>
          <input
            type="number"
            name="temperature"
            style={{ marginBottom: "10px" }}
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>
        <div>
          <label>Precipitation:</label>
          <input
            type="number"
            name="precipitation"
            style={{ marginBottom: "10px" }}
            value={precipitation}
            onChange={(e) => setPrecipitation(e.target.value)}
          />
        </div>
        <div>
          <label>Humidity:</label>
          <input
            type="number"
            name="humidity"
            style={{ marginBottom: "10px" }}
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />
        </div>
        <div>
          <label>Wind:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            type="number"
            name="wind"
            style={{ marginBottom: "10px" }}
            value={wind}
            onChange={(e) => setWind(e.target.value)}
          />
        </div>
        <button
          style={{ marginBottom: "10px" }}
          onClick={() =>
            handleNewReport({
              date:
                year +
                "-" +
                (month < 10 ? "0" + month : month) +
                "-" +
                (day < 10 ? "0" + day : day) +
                " " +
                hour +
                ":00",
              temperature,
              precipitation,
              humidity,
              wind,
              weather,
              city_id: city.city_id,
            })
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NewReport;
