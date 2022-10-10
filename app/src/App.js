import logo from "./logo.svg";
import Cities from "./Cities";
import Reports from "./Reports";
import NewCity from "./NewCity";
import NewReport from "./NewReport";
import { useEffect, useState } from "react";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [reports, setReports] = useState(null);
  const [showCity, setShowCity] = useState(false);
  const [showNewCity, setShowNewCity] = useState(false);
  const [showNewReport, setShowNewReport] = useState(false);
  const url = "http://localhost:8000/cities";

  const loadCities = () => {
    setErr(null);
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCities(data.data);
        setLoaded(true);
      })
      .catch((error) => {
        setErr(error.message);
        setLoaded(true);
      });
  };

  const loadReports = (city_id) => {
    setErr(null);
    fetch(url + "/" + city_id + "/weather")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReports(data.data);
        setLoaded(true);
      })
      .catch((error) => {
        setErr(error.message);
        setLoaded(true);
      });
  };

  useEffect(() => {
    loadCities();
  }, []);

  const handleDelete = (id) => {
    setErr(null);
    fetch(url + "/" + id, { method: "DELETE" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        loadCities();
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleNewCity = (city) => {
    setErr(null);
    fetch(url, { method: "POST", body: JSON.stringify(city) })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        loadCities();
        setShowNewCity(false);
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleDeleteReport = (id) => {
    setErr(null);
    fetch(url + "/" + city.city_id + "/weather/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        loadReports(city.city_id);
        loadCities();
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleNewReport = (report) => {
    setErr(null);
    fetch(url + "/" + report.city_id + "/weather", {
      method: "POST",
      body: JSON.stringify(report),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        loadReports(report.city_id);
        setShowNewReport(false);
        loadCities();
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleShowCity = (city) => {
    setShowCity(true);
    setCity(city);
    loadReports(city.city_id);
  };

  return (
    <div>
      <div className="App">
        <div className="flex-container-space-between">
          <h1>Weather reports..</h1>
          <div
            className="flex-container-nowrap gutter pointer"
            onClick={() => setShowNewCity(true)}
            style={{ color: "green" }}
          >
            <span className="material-symbols-outlined flex-h-center medium-icon">
              add_circle
            </span>
            <div className="flex-h-center medium-icon">New location</div>
          </div>
        </div>
        {err && <span>{err}</span>}
        {!loaded && <span>Loading ...</span>}
        {cities && (
          <Cities
            cities={cities}
            handleDelete={handleDelete}
            handleShowCity={handleShowCity}
            setShowNewReport={setShowNewReport}
            setCity={setCity}
          />
        )}
      </div>
      {showCity && city && (
        <div className="modal city-modal">
          <div className="modal-content ">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => {
                  setShowCity(false);
                }}
              >
                &times;
              </span>
              <div className="flex-container-space-between">
                <div>
                  <h2>{city.city_label}</h2>
                  <h3>{city.country}</h3>
                </div>
                <div
                  style={{
                    color: "green",
                    marginTop: "15px",
                  }}
                  className="flex-container-nowrap gutter pointer"
                  onClick={() => {
                    setShowNewReport(true);
                  }}
                >
                  <span className="material-symbols-outlined flex-h-center">
                    add_circle
                  </span>
                  <div className="flex-h-center medium-icon">New report</div>
                </div>
              </div>
            </div>
            <div className="modal-body">
              {reports && (
                <Reports
                  reports={reports}
                  handleDeleteReport={handleDeleteReport}
                  handleNewReport={handleNewReport}
                  setShowNewReport={setShowNewReport}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {showNewCity && (
        <div className="modal city-modal">
          <div className="modal-content  modal-content-md">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => {
                  setShowNewCity(false);
                }}
              >
                &times;
              </span>
              <h2>New location</h2>
            </div>
            <div className="modal-body">
              <NewCity handleNewCity={handleNewCity} />
            </div>
          </div>
        </div>
      )}
      {showNewReport && city && (
        <div className="modal city-modal">
          <div className="modal-content modal-content-md">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => {
                  setShowNewReport(false);
                }}
              >
                &times;
              </span>
              <h2>New Report for {city.city_label}</h2>
            </div>
            <div className="modal-body">
              <NewReport city={city} handleNewReport={handleNewReport} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
