import { Button } from "@material-tailwind/react";
import { Search } from "lucide-react";
import heroimage from "../../assets/homepage01.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBusinessCategory, getCities } from "../../redux/features/businessSlice";

export function HeroSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cities, BusinessCategory } = useSelector((state) => state.business);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [suggestions, setSuggestions] = useState([]); // new state
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  // Fetch suggestions while typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim().length > 1) {
        dispatch(getBusinessCategory({ keyword: searchTerm, city: selectedCity }))
          .unwrap()
          .then((res) => {
            setSuggestions(res.data?.businesses || []);
            setShowSuggestions(true);
          })
          .catch(() => setSuggestions([]));
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // debounce API call

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCity, dispatch]);

  const handleSearch = () => {
    if (!searchTerm.trim() && !selectedCity.trim()) return;

    dispatch(getBusinessCategory({ keyword: searchTerm, city: selectedCity }));
    navigate("/business-details", {
      state: { selectedCategory: searchTerm, location: selectedCity },
    });
  };

  return (
    <section
      className="relative min-h-[150px] sm:min-h-[200px] md:min-h-[300px] flex items-center justify-center bg-cover bg-no-repeat bg-[center_top_21%] py-8 sm:py-12 md:py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroimage})`,
      }}
    >
      <div className="container mx-auto px-4 text-center text-white max-w-7xl">
        <h1 className="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight">
          Discover Punjab's
          <span className="text-[--second-color]"> Business Community</span>
        </h1>

        <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base lg:text-base max-w-3xl mx-auto">
          Connect with authentic Punjabi businesses in your area. From
          traditional restaurants to modern services, find trusted businesses
          that understand your culture and values.
        </p>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-end relative">

            {/* Search Input with suggestions */}
            <div className="flex-1 w-full relative">
              <label className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 block text-left">
                What are you looking for?
              </label>
              <input
                type="text"
                placeholder="Search for businesses, services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => suggestions.length && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} 
                className="w-full rounded-md border border-gray-300 text-black bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-56 overflow-auto text-left">
                  {suggestions.map((biz) => (
                    <li
                      key={biz._id}
                      onClick={() => {
                        setSearchTerm(biz.businessName);   
                        setShowSuggestions(false);      
                      }}
                      className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {/* Logo */}
                      {biz.logoUrl ? (
                        <img
                          src={biz.logoUrl}
                          alt={biz.businessName}
                          className="h-8 w-8 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                          {biz.businessName?.charAt(0)}
                        </div>
                      )}

                      {/* Business Info */}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{biz.businessName}</p>
                        {/* <p className="text-xs text-gray-500">
                          {biz.category} • {biz.subCategory}
                        </p>
                        <p className="text-xs text-gray-400">{biz.address?.city}</p> */}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* City Select */}
            <div className="flex-1 w-full">
              <label className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 block text-left">
                Location
              </label>
              <select
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="" disabled>Select Location</option>
                {Array.isArray(cities) &&
                  cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>

            {/* Search Button */}
            <Button className="p-0">
              <div
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-8 py-3 rounded-md transition-colors w-full md:w-auto font-medium"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
