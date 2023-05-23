import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/nav";
import Footer from "./components/footer";
import About from "./components/about";

function App() {
  return (
    <div className="App">
      <Navigation />
      <About />
      <Footer />
    </div>
  );
}

export default App;
