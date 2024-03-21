import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Home from "./pages/home/Home";
import TrackingShipments from "./pages/tracking-shipments/TrackingShipments";
import NotFound from "./pages/not-found/NotFound";
import Navbar from "./components/navbar/Navbar";
import Prices from "./pages/prices/Prices";
import CallSales from "./pages/call-sales/call-sales";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/prices" index element={<Prices />}></Route>
          <Route path="/call-sales" index element={<CallSales />}></Route>

          <Route
            path="/tracking-shipment/:search"
            element={<TrackingShipments />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

// 7234258   ////   13737343 ///// 67151313

export default App;
