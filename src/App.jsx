import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://randomuser.me/api/?results=505'); 
      const data = await res.json();
      setUsers(data.results);
    };
    fetchData();
  }, []);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = users.slice(startIndex, startIndex + itemsPerPage);

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

 
  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Paginated Users</h1>
      
      {/* Display current data */}
      {currentData.map((user, index) => (
        <div key={index} style={{ margin: '10px 0', border: '1px solid #ccc', padding: '10px' }}>
          <p>
            <strong>Name:</strong> {user.name.first} {user.name.last}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ))}

      {/* Pagination buttons */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handlePrevPage}
          style={{
            padding: '10px',
            margin: '0 5px',
            background: currentPage === 1 ? '#ddd' : '#007BFF',
            color: currentPage === 1 ? '#000' : '#fff',
            border: 'none',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        
        {/* Display page numbers */}
        {[...Array(Math.ceil(users.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              padding: '10px',
              margin: '0 5px',
              background: currentPage === index + 1 ? 'blue' : '#ddd',
              color: currentPage === index + 1 ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          style={{
            padding: '10px',
            margin: '0 5px',
            background: currentPage === Math.ceil(users.length / itemsPerPage) ? '#ddd' : '#007BFF',
            color: currentPage === Math.ceil(users.length / itemsPerPage) ? '#000' : '#fff',
            border: 'none',
            cursor: currentPage === Math.ceil(users.length / itemsPerPage) ? 'not-allowed' : 'pointer',
          }}
          disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
