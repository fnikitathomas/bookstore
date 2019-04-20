import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import debounce from 'lodash'
import noimage from './noimage.png'
import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
      books: [],
      isLoading : false,
      hasError : false,
      userInput :''
  }

  filter = userInput => {
    console.log(userInput)
    this.setState({userInput:userInput})
    this.getData(userInput)
  }
  
  getData = async userInput => {
    this.setState({isLoading:true})
    if(userInput.length >= 2){
      await axios.get(`http://localhost:7000/books/search/${userInput}`)
      .then(resp => {
        console.log(resp.data.books)
        this.setState({
          books:[...resp.data.books]
        })
        
      })
      .catch(error => {
        console.log(error)
        this.setState({hasError:true, isLoading:false})
      })
    }
    this.setState({isLoading:false})
  }
  img = {
    height : "175px",
    width : "175px"
  }

  // componentDidMount = () => {
  //   this.getData(this.state.userInput)
  // }

 render(){
  const {isLoading, hasError, books, userInput} = this.state
  if(books.length >= 1) console.log("live books",books)
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
    <div className="Search">
      <input
        type="search"
        placeholder="Search..."
        aria-label="Search"
        className="search"
        value={userInput}
        onChange={e => this.filter(e.target.value)}
      />
    </div>
    
    {(books && books.length >= 1) && 
        books.map((b,i) => {
        console.log(typeof b.imageLinks)
        return (
          <div key={`${b.title}-${i}`}>
            <Link to={`/book/${b.id}`}>
              {(b.imageLinks === undefined || b === undefined || b.imageLinks.thumbnail ===  undefined) ?
                <img src={noimage} alt ="Missing" style={this.img}></img>
              :

              <img src={b.imageLinks.thumbnail} alt={b.title}></img>}
            </Link>
            <p>{b.title}</p>
          </div>
        )}
      )}         
    </div>
  );
  }
}

export default App;
