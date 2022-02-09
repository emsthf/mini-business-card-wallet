import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AddCard from "./routes/AddCard";
import CardList from "./routes/CardList";
import DetailCard from "./routes/DetailCard";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<AddCard />} />
        <Route path="/cardList*" element={<CardList />} />
        <Route path="/detail*" element={<DetailCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
