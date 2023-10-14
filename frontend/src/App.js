import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../../../css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes></Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
