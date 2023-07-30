import React, { useEffect, useState } from 'react';

const Component = () => {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  const [search, setSearch] =useState('')

  function handleSubmit(e){

      const transaction = { date, description, category, amount }
      // console.log(transaction)

  fetch('http://localhost:8001/transactions',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(transaction)
  })
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = () => {
    fetch('http://localhost:8001/transactions')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (id) => {
    fetch( `http://localhost:8001/transactions/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {

    fetchData();
  } else {
    console.error('Error deleting data');
  }
})
.catch(error => {
  console.error('Error deleting data:', error);
});
  };

  return (
    <>
      <div className='Container'>The Royal Bank of Flatiron</div>
        <div className="Container1">
            <input type="Search"                     
className="Container1" onChange={(e) => setSearch(e.target.value)} placeholder="Search your Recent Transaction" />

            <div className="Container2">
            <button type="submit" className="search-icon" aria-label="Search">
            <i className="fa fa-search" aria-hidden="true"></i>
            </button>
            </div>
        </div>

    <div className="Container3">
      <form onSubmit={handleSubmit}>
        <div className="formDetails">
            <label htmlFor="date">Date: 
              <input type="date" 
              id="date" 
              name="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required/>
            </label>

            <input type="text" 
            id="description" 
            placeholder="Description" 
            value={description}
              onChange={(e) => setDescription(e.target.value)}
            required />

            <input type="text" 
            id="category" 
            placeholder="Category" 
            value={category}
              onChange={(e) => setCategory(e.target.value)}
            required />

            <input type="number" 
            id="amount" 
            name="amount" 
            min="0" 
            placeholder="Amount" 
            value={amount}
              onChange={(e) => setAmount(e.target.value)}
            required />

        </div>

        <div>
            <button className="Button">Add Transaction</button>
        </div>

      </form>

    </div>

  <div className='table-container'>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.filter((item) =>{
          return search.toLowerCase() === '' ? item : item.description.toLowerCase().includes(search)
        }).map(item => (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>{item.amount}</td>
            <td><button className="deleteButton" onClick={() => handleDelete(item.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</>
  );
};

export default Component;

