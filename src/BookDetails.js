import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import noimage from './noimage.png'
import axios from 'axios'


const BookDetails = (props) => {

    const [book,setBook] = useState({})
    const [bookShelf,setShelf] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const bookId = props.match.params.bookId
    

    const shelves = [
      { label: "Want to Read", value: "wantToRead"},
      { label: "Currently Reading", value: "currentlyReading" },
      { label: "Read", value: "read" },
      { label: "None", value: "none" },
    ]

    const img = {
        height : "175px",
        width : "175px"
    }

    const changeShelf = async (shelf) => {
      
      await axios.get(`http://localhost:7000/bookshelf/update/${bookId}/${shelf}`)
      .then(resp => {
          setShelf(shelf)
      })
      .catch(error => {
          console.log(error)
          setHasError(true)
      })
    }

    const getData = async () => {
        setIsLoading(true)
        await axios.get(`http://localhost:7000/book/${bookId}`)
            .then(resp => {
                setBook(resp.data.book)
            })
            .catch(error => {
                console.log(error)
                setHasError(true)
                setIsLoading(false)
            })
        setIsLoading(false)      
    }

    useEffect(() =>{
          setTimeout(() => getData(),1500)
      },[bookShelf])

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
      ( <>
        <div className="App ">
        {
              <div key={`${0}`}>
                <div className="image ">
                  {
                    (book === undefined || book.imageLinks === undefined || book.imageLinks.thumbnail ===  undefined) ?
                      <img src={noimage} alt ="Missing" style={img}></img>
                  :
                      <img src={book.imageLinks.thumbnail} alt={book.title}></img>
                  }
                  <p><em>Rating: {book === undefined ? 'Not available' : book.averageRating}</em></p>
                </div>
                <div className="info bg">
                  <h3>{book === undefined ? 'Not available' : book.title}</h3>
                  <p><em>{book === undefined ? 'Not available' :book.subtitle}</em></p>                  
                  <p>Author(s): {book === undefined ? 'Not available' :book.authors}</p>
                  <p>Publisher: {book === undefined ? 'Not available' :book.publisher}</p>
                  <p>Bookshelf: {book === undefined ? 'Not available' :book.shelf}</p>
                  <Select className="sel"
                          placeholder="Choose a bookshelf..."
                          value={bookShelf}
                          options={shelves}
                          onChange={opt => changeShelf(opt.value)}
                  />
                </div>
              </div>
        }
        </div>
        <div className="App desc">
          <em><h4>Description: </h4></em>
          <p>{book === undefined ? 'Not available' :book.description}</p>
        </div>  
        </>
      )
}

export default BookDetails