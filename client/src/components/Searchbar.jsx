import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "../assets/ai.png";

const Searchbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const srchRef = useRef(null);

  const inputvalues = ["Gaming", "Business", "Editing", "Battery", "Casual"];
  const [searchText, setSearchText] = useState("");
  const [tags, setTags] = useState([]); 

  // Detect outside click
  useEffect(() => {
    const handler = (e) => {
      if (srchRef.current && !srchRef.current.contains(e.target)) {
        setOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Add a tag when suggestion clicked
  const addTag = (value) => {
    if (!tags.includes(value)) {
      setTags([...tags, value]);
      setSearchText(""); // clear text after selection
    }
  };

  // Remove a tag
  const removeTag = (value) => {
    setTags(tags.filter((tag) => tag !== value));
  };

  return (
    <div
      className="flex justify-center transition-all duration-500 relative w-full"
      ref={srchRef}
    >
      <div
        className={`w-250 max-w-[300] bg-black/40 backdrop-blur-md border border-white rounded-2xl 
              flex flex-col px-4 shadow-md overflow-hidden transition-all duration-300 ${
                open ? "h-auto py-2" : "h-12"
              }`}
        onClick={() => setOpen(true)}
      >
        {/* Input + tags */}
        <div className="flex items-center flex-wrap mb-10 gap-2 min-h-[40px]">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-gray-200 text-black px-3 py-1 rounded-full text-sm"
            >
              {tag}
              <button
                className="font-bold ml-1 hover:bg-gray-300 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                <img
                  src="https://img.icons8.com/?size=100&id=46&format=png&color=000000"
                  alt="x"
                  className="w-3 h-3"
                />
              </button>

            </div>
          ))}

          <input
              type="text"
              placeholder={tags.length === 0 && searchText === "" 
                ? "Search for laptops, models, or specs..." 
                : ""}
              value={searchText}
              name="search"
              autoComplete="off"
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                setOpen(true);
              }}
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white px-2 min-w-[100px]"
            />


          <img
            src={SearchIcon}
            alt="search"
            className="w-5 h-5 ml-2 opacity-100 cursor-pointer invert"
          />
        </div>

        {/* Suggestions */}
        {open && isFocused && (
          <div className="mt-2 px-1 text-gray-900 text-sm">
            <div className="flex flex-wrap gap-2">
              {inputvalues.map((value, index) => (
                <div
                  key={index}
                  onClick={() => addTag(value)}
                  className="py-1.5 px-3 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
