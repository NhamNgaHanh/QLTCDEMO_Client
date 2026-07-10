import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import PileDataEntryForm from "./PileDataEntryForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/construction"
        element={<PileDataEntryForm />}
      />
    </Routes>
  );
}

export default App;