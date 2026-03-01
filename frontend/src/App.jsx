import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarbonProvider } from "./context/CarbonContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Insights from "./pages/Insights";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  // log immediately so we know the root script ran
  console.log("App component rendering");

  return (
    <CarbonProvider>
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </CarbonProvider>
  );
}

export default App;
