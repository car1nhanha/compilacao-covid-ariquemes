import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export const ChartComponent = () => {
  const [data, setData] = useState([
    {
      date: "2022-03-27",
      amount_confirmed: 22657,
      amount_deaths: 497,
      first_dose: 0,
    },
    {
      date: "2022-03-26",
      amount_confirmed: 22657,
      amount_deaths: 497,
      first_dose: 0,
    },
    {
      date: "2022-03-25",
      amount_confirmed: 22657,
      amount_deaths: 497,
      first_dose: 9,
    },
    {
      date: "2022-03-24",
      amount_confirmed: 22657,
      amount_deaths: 497,
      first_dose: 19,
    },
  ]);

  const [showConfirmed, setShowConfirmed] = useState(true);
  const [showDeaths, setShowDeaths] = useState(true);
  const [showFirstDose, setShowFirstDose] = useState(true);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    fetch("merged_data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth * 0.9;
      const height = window.innerHeight * 0.6;
      setChartDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="chart-wrapper">
      <div className="chart-filters">
        <button
          className={`filter-button ${showConfirmed ? "active" : ""}`}
          onClick={() => setShowConfirmed(!showConfirmed)}
        >
          Confirmados
        </button>
        <button className={`filter-button ${showDeaths ? "active" : ""}`} onClick={() => setShowDeaths(!showDeaths)}>
          Óbitos
        </button>
        <button
          className={`filter-button ${showFirstDose ? "active" : ""}`}
          onClick={() => setShowFirstDose(!showFirstDose)}
        >
          Primeira Dose
        </button>
      </div>
      <AreaChart
        width={chartDimensions.width}
        height={chartDimensions.height}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorFirstDose" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fca5a5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#fca5a5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "none",
            borderRadius: "0.5rem",
            color: "#f1f5f9",
          }}
        />
        {showConfirmed && (
          <Area
            type="monotone"
            dataKey="amount_confirmed"
            name="Confirmados"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorConfirmed)"
          />
        )}
        {showDeaths && (
          <Area
            type="monotone"
            dataKey="amount_deaths"
            name="Óbitos"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorDeaths)"
          />
        )}
        {showFirstDose && (
          <Area
            type="monotone"
            dataKey="first_dose_cumulative"
            name="Primeira Dose"
            stroke="#fca5a5"
            fillOpacity={1}
            fill="url(#colorFirstDose)"
          />
        )}
      </AreaChart>
    </div>
  );
};
