import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [results, setResults] = useState([]);
  const arr = [];



  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(`https://cors-anywhere.herokuapp.com/https://webappsa.riziv-inami.fgov.be/silverpages/Home/SearchHcw/?Form.Name=${lastName}&Form.FirstName=${firstName}`)
    .then(res => {
      let htmlObject = document.createElement('div');
      htmlObject.innerHTML = res.data;
      let filteredData = htmlObject.querySelectorAll("div.col-sm-8");
      console.log(filteredData)
      for (let i = 0; i<filteredData.length; i++) {
        if (filteredData[i].innerText.includes(lastName.toUpperCase())) {
          console.log(filteredData[i])
          arr.push([filteredData[i].innerText, filteredData[i+1].innerText.replace(/[^\d]/g, ''), filteredData[i+2].innerText])
        }
      }
      console.log(arr)
      setResults(arr)
    })
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First name: </label>
        <input type='text' id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
        <br/>
        <label htmlFor='lastName'>Last name: </label>
        <input type='text' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
        <br/>
        <button type='submit'>Find Riziv</button>
      </form>
      {results.length ? (
        <div>
          {results.map((item) => (
            <p>{`${item[0]}: ${item[1]} (${item[2]})`}</p>
          ))}
        </div>
  ) : (
    <p></p>
  )}
    </>
  )
}

export default App
