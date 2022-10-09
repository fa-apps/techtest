const Reports = ({ reports, handleDeleteReport, setShowNewReport }) => {
  const weatherIcons = {
    SUNNY: "sunny",
    RAINY: "Rainy",
    WINDY: "air",
    FOGGY: "Foggy",
    SNOW: "weather_snowy",
    HAIL: "grain",
    SHOWER: "shower",
    LIGHTNING: "thunderstorm",
    RAINDBOW: "looks",
    HURRICANE: "storm",
  };

  return (
    <div className="flex-container">
      {!reports.length && (
        <div onClick={() => setShowNewReport(true)} className="pointer card">
          No reports. Click here to create a report.
        </div>
      )}
      {reports.map((report) => (
        <article
          className="flex-container card-wrapper"
          key={report.weather_id}
        >
          <div className="card">
            <div className="card-header">
              <div>
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                }).format(new Date(report.date))}
              </div>
            </div>
            <div className="card-body">
              <div>
                <div className="flex-container-space-between">
                  <span className="material-symbols-outlined flex-h-center">
                    {weatherIcons[report.weather]}
                  </span>
                  <span style={{ textTransform: "lowercase" }}>
                    {report.weather}
                  </span>
                </div>

                <div className="flex-container-space-between">
                  <span className="material-symbols-outlined flex-h-center">
                    thermometer
                  </span>
                  <span>
                    {Math.round(parseInt(report.temperature))} &#8451;
                  </span>
                </div>

                <div className="flex-container-space-between">
                  <span className="material-symbols-outlined flex-h-center">
                    rainy
                  </span>
                  <span>{Math.round(parseInt(report.precipitation))} mm</span>
                </div>

                <div className="flex-container-space-between">
                  <span className="material-symbols-outlined flex-h-center">
                    humidity_mid
                  </span>
                  <span>{Math.round(parseInt(report.humidity))} %</span>
                </div>

                <div className="flex-container-space-between">
                  <span className="material-symbols-outlined flex-h-center">
                    air
                  </span>
                  <span>{Math.round(parseInt(report.wind))} Km/h</span>
                </div>
              </div>
              <div className="flex-container-space-between ">
                <span
                  className="material-symbols-outlined flex-h-center small-icon"
                  style={{
                    color: "lightsalmon",
                    textAlign: "right",
                    width: "100%",
                  }}
                  onClick={() => {
                    window.confirm("Delete, really?") &&
                      handleDeleteReport(report.weather_id);
                  }}
                >
                  delete
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Reports;
