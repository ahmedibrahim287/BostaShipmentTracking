import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import Home from "./pages/home/Home";
import TrackingShipments from "./pages/tracking-shipments/TrackingShipments";
import NotFound from "./pages/not-found/NotFound";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/track" element={<TrackingShipments />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
