import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './App.css';

const BookShelf = (props) => {

  const [books, setBooks] = useState({})
  const [shelf, setShelf] = useState('')
  const [shelves, setShelves] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState

  const shelvesN = [
    { label: "Want to Read", value: "wantToRead"},
    { label: "Currently Reading", value: "currentlyReading" },
    { label: "Read", value: "read" },
    { label: "None", value: "none" },
  ]

  const getData = async () =>{
      setIsLoading(true)
    await axios.get("http://localhost:7000/bookshelf/")
          .then(resp => {
            console.log(resp.data.books)
            setIsLoading(false)
            setBooks({...resp.data.books})
            setShelves([...Object.keys(resp.data.books)])
            // this.setState({isLoading : false,
            //                books : {...resp.data.books},
            //                shelves : [...Object.keys(resp.data.books)]
            //               })
          })
          .catch(error => {
            console.log(error)
            setHasError(true)
            setIsLoading(false)
            // this.setState({hasError : true, isLoading : false})
          })
  }

  const changeShelf = async (shelf, bookId) => {
      
    await axios.get(`http://localhost:7000/bookshelf/update/${bookId}/${shelf}`)
    .then(resp => {
        setShelf(shelf)
    })
    .catch(error => {
        console.log(error)
        setHasError(true)
    })
  }
  useEffect(() =>{
    setTimeout(() => getData(),1500)
},[shelf])

    return isLoading ? (
      <div className="App">
        <div className="spinner"></div>
        <div className="App loading">
          <p><i>loading...</i></p>
        </div>
      </div>
    )
    : hasError ? (
      <div className="App loading-error">
        &#x26A0; There is a network issue: Please try again later
      </div>
    )
    :
    (
      <div className="App" key={`op - ${Math.floor(Math.random() * 110)}`}>
      
        <>
        {shelves.map(s => {
          return (
           books[s].map((b,i) => {
            return (
                <>
                <h2>{((this.shelvesN.filter(o => o.value === s)))[0].label}</h2>
                <div key={`${s}-${i}`}>
                    <Link to={`/book/${b.id}`}>
                    <img src={b.imageLinks.thumbnail} alt={b.title}></img>
                    </Link>
                    <Select className="sel-x"
                            placeholder="Choose a bookshelf..."
                            value={""}
                            options={shelvesN}
                            onChange={opt => changeShelf(opt.value,b.id)}
                    />
                </div>
                </>
            )
          })
          )
        })}
        </>
      </div>
    )
  
}

export default BookShelf;