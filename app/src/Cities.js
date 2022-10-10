const Cities = ({
  cities,
  handleDelete,
  handleShowCity,
  setShowNewReport,
  setCity,
}) => {
  return (
    <div className="flex-container">
      {cities.map((city) => (
        <article className="flex-container card-wrapper" key={city.city_id}>
          <div className="card">
            <div className="card-body">
              <div
                onClick={() => {
                  handleShowCity(city);
                }}
              >
                <h2>{city.city_label}</h2>
                <h3>{city.country}</h3>
              </div>
              <div className="flex-container-space-between ">
                <div className="flex-container-nowrap ">
                  <div
                    className="count"
                    onClick={() => {
                      handleShowCity(city);
                    }}
                    style={{
                      marginTop: "-5px",
                    }}
                  >
                    {city.report_count}
                  </div>

                  <span
                    className="material-symbols-outlined flex-h-center small-icon"
                    style={{
                      color: "green",
                      marginTop: "-5px",
                      paddingLeft: "10px",
                    }}
                    onClick={() => {
                      setCity(city);
                      setShowNewReport(true);
                    }}
                  >
                    add_circle
                  </span>
                </div>

                <span
                  className="material-symbols-outlined flex-h-center small-icon"
                  style={{
                    color: "lightsalmon",
                    float: "right",
                    marginTop: "-5px",
                  }}
                  onClick={() => {
                    window.confirm("Delete really?") &&
                      handleDelete(city.city_id);
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

export default Cities;
