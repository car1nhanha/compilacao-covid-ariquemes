import { LineChart } from "lucide-react";
import { ChartComponent } from "./chart";

function App() {
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <LineChart className="header-icon" />
          <div>
            <h1 className="title">Covid Ariquemes</h1>
            <p className="subtitle">Comparação entre primeira dose, óbitos e casos confirmados</p>
          </div>
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
