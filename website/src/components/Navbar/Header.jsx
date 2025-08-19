import { useState } from "react";
import { Menu, X, Cloud, User } from "lucide-react";
import { Button } from "@material-tailwind/react";
import logo from "../../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        const apiKey = "fbe42682d13f061d214065730d9f3ad8"; // replace with correct key
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );

        const data = await res.json();
        console.log("res",res);
        

        if (res.ok) {
          setWeather({
            temp: Math.round(data.main.temp),
            city: data.name,
          });
        } else {
          console.error("Weather API error:", data);
          setWeather(null);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setWeather(null);
      }
    });
  }
}, []);


  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container flex py-1 items-center justify-between px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Punjabi Pages" className="w-14 h-14" />
          <span className="text-xl font-semibold text-[--main-color]">
            Punjabi Pages
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-[--main-color] text-sm font-normal transition-colors"
          >
            Home
          </Link>
          <Link
            to={"/categories"}
            className="text-gray-700 hover:text-[--main-color] text-sm font-normal transition-colors"
          >
            Categories
          </Link>
          <Link
            to={"/business"}
            className="text-gray-700 hover:text-[--main-color] text-sm font-normal transition-colors"
          >
            Businesses
          </Link>
          <Link
            to={"/about"}
            className="text-gray-700 hover:text-[--main-color] text-sm font-normal transition-colors"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="text-gray-700 hover:text-[--main-color] text-sm font-normal transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right side - Weather and Login */}
        <div className="flex items-center gap-4">
          {/* Weather */}
          <div className="hidden md:flex items-center gap-2 text-gray-600">
            <Cloud className="h-5 w-5 text-[--main-color]" />
            {weather ? (
              <span className="font-normal">
                {weather.temp}°C <span className="ml-1"></span>
              </span>
            ) : (
              <span className="font-normal">Loading...</span>
            )}
          </div>

          {/* Login Button */}
          <Link to={"/login"}>
            <Button className="hidden md:flex bg-[--main-color] hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-gray-300 px-3 py-2.5 bg-[--main-color]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-[--main-color] font-normal py-2 transition-colors"
            >
              Home
            </Link>
            <Link
              to={"/categories"}
              className="text-gray-700 hover:text-[--main-color] font-normal py-2 transition-colors"
            >
              Categories
            </Link>
            <Link
              to={"/business"}
              className="text-gray-700 hover:text-[--main-color] font-normal py-2 transition-colors"
            >
              Businesses
            </Link>
            <Link
              to={"/about"}
              className="text-gray-700 hover:text-[--main-color] font-normal py-2 transition-colors"
            >
              About
            </Link>
            <Link
              to={"/contact"}
              className="text-gray-700 hover:text-[--main-color] font-normal py-2 transition-colors"
            >
              Contact
            </Link>

            {/* Mobile Weather and Login */}
            <div className="flex items-center gap-2 text-gray-600 py-2">
              <Cloud className="h-5 w-5 text-[--main-color]" />
              <span className="font-normal">22°C</span>
            </div>

            <Link to={"/login"}>
              <Button className="w-full bg-[--main-color] hover:bg-blue-700 flex items-center justify-center text-white py-2 rounded-md font-medium mt-4">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
