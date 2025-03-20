import { useState } from "react";
import "./App.css";
import { Loading } from "./components/loading"
import { Navbar } from "./components/Navbar";
import { Mobilemenu } from "./components/Mobilemenu";
import { Home } from "./components/sections/home";
import { About } from "./components/sections/about";
import { Projects } from "./components/sections/project";
import { Contact } from "./components/sections/contact";
import "./index.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <Loading onComplete={() => setIsLoaded(true)} />}{" "}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
        style={{ backgroundColor: '#03181F' }}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Mobilemenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <About />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;