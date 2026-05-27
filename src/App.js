// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [category] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchNewsData('India');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNewsData = async (query) => {
    try {
      let apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
      if (category) {
        apiUrl += `&category=${category}`;
      }
      console.log('API URL:', apiUrl); // Log the API request URL
      const response = await fetch(apiUrl);
      const data = await response.json();
      setNewsData(data.articles || []);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    fetchNewsData(searchQuery);
  };

  const handleReadMore = (url) => {
    window.open(url, '_blank'); // Open the URL in a new tab
  };

  const handleFilter = (category) => {
    fetchNewsData(category);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData ? newsData.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = newsData ? Math.ceil(newsData.length / itemsPerPage) : 0;

  return (
    <div>
      <nav className="navbar">
        <div className="logo">News App</div>
        <div className="filterButtons">
          <button className="filterButton" onClick={() => handleFilter('sports')}>Sports</button>
          <button className="filterButton" onClick={() => handleFilter('entertainment')}>Entertainment</button>
          <button className="filterButton" onClick={() => handleFilter('food')}>Food</button>
          <button className="filterButton" onClick={() => handleFilter('travel')}>Travel</button>
          <button className="filterButton" onClick={() => handleFilter('weather')}>Weather</button>
          <button className="filterButton" onClick={() => handleFilter('politics')}>Politics</button>
        </div>
        <div className="searchContainer">
          <input
            className="searchInput"
            placeholder="Search for news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="searchButton" onClick={handleSearch}>
            <span className="buttonText">Search</span>
          </button>
        </div>
      </nav>
      <div className="container">
        <ul>
          {currentItems.map((item) => (
            <li key={item.title}>
              <div className="card">
                <img 
                  src={item.urlToImage || 'https://placehold.co/400x220/f0f7ff/0056b3?text=No+Image'} 
                  className="cardImage" 
                  alt={item.title} 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x220/f0f7ff/0056b3?text=No+Image'; }}
                />
                <div className="cardContent">
                  <h2 className="newsTitle">{item.title}</h2>
                  <p className="newsDescription">{item.description}</p>
                  <button className="readMoreButton" onClick={() => handleReadMore(item.url)}>
                    Read More
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="pageButton"
            >
              Previous
            </button>
            <span className="pageInfo">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="pageButton"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;










