import React, {useState, useEffect} from 'react'
import noimage from './noimage.png'
import axios from 'axios'


const BookDetails = (props) => {

    const [book,setBook] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const bookId = props.match.params.bookId

    const img = {
        height : "175px",
        width : "175px"
    }

    const getData = async () => {
        setIsLoading(true)
        await axios.get(`http://localhost:7000/book/${bookId}`)
            .then(resp => {
                console.log(resp)
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
          setTimeout((bookId) => getData(bookId),2250)
      },[])
    console.log("book",book)

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
        <div className="App">
        
        {
              <div key={`${book.title}`}>

                  {
                    (book.imageLinks === undefined || book === undefined || book.imageLinks.thumbnail ===  undefined) ?
                      <img src={noimage} alt ="Missing" style={img}></img>
                  :
                      <img src={book.imageLinks.thumbnail} alt={book.title}></img>
                  }
                <p>{book.title}</p>
              </div>
            
          
        }         
        </div>
      )
}

export default BookDetails