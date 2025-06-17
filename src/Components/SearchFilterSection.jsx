import { useState, useEffect } from "react"
import { Search, Filter, MapPin, ChevronDown, X } from "lucide-react"

const SearchFilterSection = ({ posts = [], onFilteredResults }) => {
  const [searchText, setSearchText] = useState("")
  const [category, setCategory] = useState("")
  const [place, setPlace] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showPlaceDropdown, setShowPlaceDropdown] = useState(false)

  // Get unique categories and places from actual posts data
  const getUniqueCategories = () => {
    const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))]
    const predefinedCategories = [
      "Electronics",
      "Books",
      "Clothing",
      "Accessories",
      "Documents",
      "Keys",
      "Devices",
      "Watches",
      "Laptop Charger",
      "Glasses",
      "Wallet",
      "Jacket",
      "Notebook",
      "Others",
    ]
    // Combine and remove duplicates
    return [...new Set([...predefinedCategories, ...categories])].sort()
  }

  const getUniquePlaces = () => {
    const places = [...new Set(posts.map((post) => post.place).filter(Boolean))]
    const predefinedPlaces = [
      "New Soft",
      "Orange Village",
      "HTU Square",
      "Library",
      "N Building",
      "S Building",
      "W Building",
      "Theater",
      "KHBP Building 17",
      "Parking Area",
      "Cafeteria",
      "Others",
    ]
    // Combine and remove duplicates
    return [...new Set([...predefinedPlaces, ...places])].sort()
  }

  const categories = getUniqueCategories()
  const places = getUniquePlaces()

  // Filter posts function
  const filterPosts = (text, cat, loc, date) => {
    console.log("Filtering with:", { text, cat, loc, date, totalPosts: posts.length })

    let filtered = [...posts]

    // Filter by search text (name, description, posted_by)
    if (text && text.trim()) {
      const searchLower = text.toLowerCase().trim()
      filtered = filtered.filter((post) => {
        const name = (post.name || "").toLowerCase()
        const description = (post.description || "").toLowerCase()
        const postedBy = (post.posted_by || "").toLowerCase()

        return name.includes(searchLower) || description.includes(searchLower) || postedBy.includes(searchLower)
      })
    }

    // Filter by category
    if (cat && cat.trim()) {
      filtered = filtered.filter((post) => {
        const postCategory = (post.category || "").toLowerCase().trim()
        const filterCategory = cat.toLowerCase().trim()
        return postCategory === filterCategory
      })
    }

    // Filter by place
    if (loc && loc.trim()) {
      filtered = filtered.filter((post) => {
        const postPlace = (post.place || "").toLowerCase().trim()
        const filterPlace = loc.toLowerCase().trim()
        return postPlace === filterPlace
      })
    }

    // Filter by date
    if (date && date.trim()) {
      filtered = filtered.filter((post) => {
        try {
          const postDate = new Date(post.date_lost).toISOString().split("T")[0]
          return postDate === date
        } catch (error) {
          console.error("Date filtering error:", error)
          return false
        }
      })
    }

    console.log("Filtered results:", filtered.length)

    // Send filtered results to parent component
    if (onFilteredResults) {
      onFilteredResults(filtered)
    }

    return filtered
  }

  // Handle search input
  const handleSearch = (e) => {
    const text = e.target.value
    setSearchText(text)
    filterPosts(text, category, place, selectedDate)
  }

  // Handle category selection
  const handleCategorySelect = (selectedCategory) => {
    console.log("Category selected:", selectedCategory)
    setCategory(selectedCategory)
    setShowCategoryDropdown(false)
    filterPosts(searchText, selectedCategory, place, selectedDate)
  }

  // Handle place selection
  const handlePlaceSelect = (selectedPlace) => {
    console.log("Place selected:", selectedPlace)
    setPlace(selectedPlace)
    setShowPlaceDropdown(false)
    filterPosts(searchText, category, selectedPlace, selectedDate)
  }

  // Handle date selection
  const handleDateSelect = (e) => {
    const date = e.target.value
    console.log("Date selected:", date)
    setSelectedDate(date)
    filterPosts(searchText, category, place, date)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchText("")
    setCategory("")
    setPlace("")
    setSelectedDate("")
    if (onFilteredResults) {
      onFilteredResults(posts)
    }
  }

  // Remove individual filter
  const removeFilter = (filterType) => {
    switch (filterType) {
      case "category":
        setCategory("")
        filterPosts(searchText, "", place, selectedDate)
        break
      case "place":
        setPlace("")
        filterPosts(searchText, category, "", selectedDate)
        break
      case "date":
        setSelectedDate("")
        filterPosts(searchText, category, place, "")
        break
      case "search":
        setSearchText("")
        filterPosts("", category, place, selectedDate)
        break
    }
  }

  // Format date for display
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return ""
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return dateStr
    }
  }

  // Initial filter when component mounts or posts change
  useEffect(() => {
    if (posts.length > 0) {
      filterPosts(searchText, category, place, selectedDate)
    }
  }, [posts])

  return (
    <>
      <style jsx>{`
        .search-filter-section {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .search-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          border: 2px solid #e8343f;
          border-radius: 50px;
          padding: 8px 20px;
          background: white;
          height: 50px;
          width: 100%;
          box-sizing: border-box;
        }

        .search-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          color: #e8343f;
          flex-shrink: 0;
        }

        .search-input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 16px;
          background: transparent;
          height: 100%;
          color: #333;
        }

        .search-input::placeholder {
          color: #999;
        }

        .filters-container {
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
        }

        .dropdown-wrapper {
          position: relative;
        }

        .filter-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: 2px solid #e8343f;
          border-radius: 50px;
          background: white;
          color: #e8343f;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.2s ease;
          min-width: 140px;
          justify-content: space-between;
        }

        .filter-button:hover {
          background: #fff5f5;
          transform: translateY(-1px);
        }

        .filter-button.active {
          background: #e8343f;
          color: white;
        }

        .filter-button.active .filter-icon,
        .filter-button.active .chevron-icon {
          color: white;
        }

        .filter-icon {
          width: 18px;
          height: 18px;
          color: #e8343f;
          flex-shrink: 0;
        }

        .chevron-icon {
          width: 16px;
          height: 16px;
          color: #e8343f;
          transition: transform 0.2s ease;
        }

        .filter-button.open .chevron-icon {
          transform: rotate(180deg);
        }

        .filter-content {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 220px;
          background: white;
          border: 2px solid #e8343f;
          border-radius: 12px;
          margin-top: 5px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          z-index: 1000;
          max-height: 250px;
          overflow-y: auto;
        }

        .dropdown-item {
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid #f0f0f0;
          font-size: 15px;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background: #fff5f5;
          color: #e8343f;
        }

        .date-input {
          padding: 12px 20px;
          border: 2px solid #e8343f;
          border-radius: 50px;
          background: white;
          color: #e8343f;
          font-size: 16px;
          font-weight: 500;
          min-width: 140px;
          cursor: pointer;
        }

        .date-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(232, 52, 63, 0.1);
        }

        .active-filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .filter-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #e8343f;
          color: white;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .filter-tag-remove {
          width: 16px;
          height: 16px;
          cursor: pointer;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .filter-tag-remove:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .clear-filters {
          padding: 12px 20px;
          border: 2px solid #ccc;
          border-radius: 50px;
          background: white;
          color: #666;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .clear-filters:hover {
          border-color: #e8343f;
          color: #e8343f;
        }

        .dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
        }

        @media screen and (max-width: 768px) {
          .search-filter-section {
            padding: 15px;
          }

          .filters-container {
            gap: 12px;
          }

          .filter-button,
          .date-input {
            padding: 10px 16px;
            font-size: 14px;
            min-width: 120px;
          }

          .search-bar {
            height: 45px;
            padding: 6px 16px;
          }

          .search-input {
            font-size: 14px;
          }
        }

        @media screen and (max-width: 480px) {
          .filters-container {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .dropdown-wrapper,
          .filter-button,
          .date-input,
          .clear-filters {
            width: 100%;
          }

          .dropdown-menu {
            width: 100%;
            left: 0;
            right: 0;
          }
        }
      `}</style>

      <div className="search-filter-section">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for lost items..."
              value={searchText}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="filters-container">
            {/* Category Dropdown */}
            <div className="dropdown-wrapper">
              {showCategoryDropdown && (
                <div className="dropdown-overlay" onClick={() => setShowCategoryDropdown(false)} />
              )}
              <button
                type="button"
                className={`filter-button ${category ? "active" : ""} ${showCategoryDropdown ? "open" : ""}`}
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <div className="filter-content">
                  <Filter className="filter-icon" size={18} />
                  <span>{category || "Category"}</span>
                </div>
                <ChevronDown className="chevron-icon" size={16} />
              </button>
              {showCategoryDropdown && (
                <div className="dropdown-menu">
                  {categories.map((item) => (
                    <div key={item} onClick={() => handleCategorySelect(item)} className="dropdown-item">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Place Dropdown */}
            <div className="dropdown-wrapper">
              {showPlaceDropdown && <div className="dropdown-overlay" onClick={() => setShowPlaceDropdown(false)} />}
              <button
                type="button"
                className={`filter-button ${place ? "active" : ""} ${showPlaceDropdown ? "open" : ""}`}
                onClick={() => setShowPlaceDropdown(!showPlaceDropdown)}
              >
                <div className="filter-content">
                  <MapPin className="filter-icon" size={18} />
                  <span>{place || "Place"}</span>
                </div>
                <ChevronDown className="chevron-icon" size={16} />
              </button>
              {showPlaceDropdown && (
                <div className="dropdown-menu">
                  {places.map((item) => (
                    <div key={item} onClick={() => handlePlaceSelect(item)} className="dropdown-item">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Picker */}
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateSelect}
              className="date-input"
              placeholder="Select Date"
            />

            {/* Clear All Button */}
            {(searchText || category || place || selectedDate) && (
              <button type="button" onClick={clearFilters} className="clear-filters">
                Clear All
              </button>
            )}
          </div>

          {/* Active Filters Tags */}
          {(searchText || category || place || selectedDate) && (
            <div className="active-filters">
              {searchText && (
                <div className="filter-tag">
                  <span>Search: "{searchText}"</span>
                  <div className="filter-tag-remove" onClick={() => removeFilter("search")}>
                    <X size={12} />
                  </div>
                </div>
              )}
              {category && (
                <div className="filter-tag">
                  <span>Category: {category}</span>
                  <div className="filter-tag-remove" onClick={() => removeFilter("category")}>
                    <X size={12} />
                  </div>
                </div>
              )}
              {place && (
                <div className="filter-tag">
                  <span>Place: {place}</span>
                  <div className="filter-tag-remove" onClick={() => removeFilter("place")}>
                    <X size={12} />
                  </div>
                </div>
              )}
              {selectedDate && (
                <div className="filter-tag">
                  <span>Date: {formatDisplayDate(selectedDate)}</span>
                  <div className="filter-tag-remove" onClick={() => removeFilter("date")}>
                    <X size={12} />
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default SearchFilterSection;
