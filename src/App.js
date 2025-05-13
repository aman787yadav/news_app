// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchNewsData('India');
  }, []);

  const fetchNewsData = async (query) => {
    try {
      let apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=e2f7bbb941fb44488535aa9f780b9609`;
      if (category) {
        apiUrl += `&category=${category}`;
      }
      console.log('API URL:', apiUrl); // Log the API request URL
      const response = await fetch(apiUrl);
      const data = await response.json();
      setNewsData(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSearch = () => {
    fetchNewsData(searchQuery);
  };

  const handleReadMore = (url) => {
    window.open(url, '_blank'); // Open the URL in a new tab
  };

  const handleFilter = (category) => {
    
    fetchNewsData(category);
  };

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
          {newsData.map((item) => (
            <li key={item.title}>
              <div className="card">
                <img src={item.urlToImage} className="cardImage" alt={item.title} />
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
      </div>
    </div>
  );
};

export default App;










