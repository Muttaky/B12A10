import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";

const SEARCH_DELAY_MS = 300;
const MIN_LOAD_TIME_MS = 500;

const Crops = () => {
  let appsData = useLoaderData();

  let [term, setTerm] = useState("");
  let [filApps, setFilApps] = useState(appsData);

  let [isSearching, setIsSearching] = useState(false);
  let [searchStartTime, setSearchStartTime] = useState(null);

  useEffect(() => {
    // If the search term is empty, just reset the filtered apps and stop
    if (term === "") {
      setFilApps(appsData);
      setIsSearching(false);
      return;
    }

    // 1. Show the loading indicator immediately when typing starts
    setIsSearching(true);
    setSearchStartTime(Date.now());

    // 2. Set up the debounce timer
    const debounceTimer = setTimeout(() => {
      // --- Actual Search Operation ---
      const newFilApps = appsData.filter((app) =>
        app.name.toLowerCase().includes(term.toLowerCase())
      );

      // 3. Calculate time elapsed and determine if we need to wait
      const elapsedTime = Date.now() - searchStartTime;
      const remainingTime = MIN_LOAD_TIME_MS - elapsedTime;

      if (remainingTime > 0) {
        // Wait for the minimum load time to pass
        setTimeout(() => {
          setFilApps(newFilApps);
          setIsSearching(false);
        }, remainingTime);
      } else {
        // If it already took longer than the minimum time, set results immediately
        setFilApps(newFilApps);
        setIsSearching(false);
      }
    }, SEARCH_DELAY_MS); // Wait 300ms after last keystroke (debounce)

    // Cleanup: Clear the debounce timer if the component unmounts or term changes
    return () => clearTimeout(debounceTimer);
  }, [term, appsData, searchStartTime]); // Re-run effect when term or appsData changes

  // DaisyUI Loading Indicator Component
  const SearchLoader = (
    <div className="flex justify-center items-center h-48">
      <span className="loading loading-ring loading-lg text-blue-500"></span>
    </div>
  );

  return (
    <div className="p-5">
      <div className="text-center py-10  border-blue-200">
        <h1 className="text-4xl font-bold text-gray-800">All Crops</h1>
        <p className="text-gray-500 mt-2">
          Explore All crops cultivated by farmers.
        </p>
      </div>

      <div className="mt-8 flex justify-between items-center px-4">
        <h3 className="text-lg font-semibold text-gray-700">
          ({filApps.length}) Crops Found
        </h3>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Apps"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="ml-2 focus:outline-none w-48"
          />
        </div>
      </div>
      {isSearching ? (
        SearchLoader
      ) : filApps.length === 0 && term !== "" ? (
        // Only show "No App Found" if search term is not empty
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600">
            ❌ No Crops Found for "{term}"
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your search term or check all categories.
          </p>
        </div>
      ) : (
        // Display the results grid
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5">
          {filApps.map((app) => (
            <div className="card bg-base-100 w-72 pt-5 shadow-sm mx-auto">
              <figure>
                <img src={app.image} alt="Apps" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{app.name}</h2>
                <div className="card-actions justify-between">
                  <button className="btn btn-active">
                    <Link key={app._id} to={`/crops/${app._id}`}>
                      View Details
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Crops;
