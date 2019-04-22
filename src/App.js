import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import debounce from 'lodash'
import noimage from './noimage.png'
import axios from 'axios'
import './App.css';

class App extends Component{

  state = {
    books: [],
    hasError: false,
    searchTerm: '',
    isLoading: false
  }
  // const [books,setBooks] = useState([])
  // const [isLoading,setIsLoading] = useState(false)
  // const [hasError,setHasError] = useState(false)
  // const [searchTerm,setSearchTerm] = useState('')
  // console.log("props",(props.history.location.pathname))
  input = str => {
    console.log(str)
    this.setState({searchTerm:str})
    this.getData(str)
  }
  
  getData = async () => {
    const {searchTerm} = this.state
    if(searchTerm && searchTerm.length >= 2){
      this.setState({isLoading:true})
      await axios.get(`http://localhost:7000/books/search/${searchTerm}`)
      .then(resp => {
        console.log(resp.data.books)
        this.setState({books:[...resp.data.books]})
        //props.history.push(searchTerm)
      })
      .catch(error => {
        console.log(error)
        this.setState({hasError:true,isLoading:false})
      })
    }
    this.setState({isLoading:false})
  }
  
  img = {
    height : "175px",
    width : "175px"
  }

  // useEffect(() =>{
  //     setTimeout(() => getData(),2250)
  // },[])

  componentDidMount = () =>{
    setTimeout(() => this.getData(),2250)
  }
  render(){
    const {isLoading, hasError, books, searchTerm} = this.state
    console.log(this.props)
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
      <div className="search">
        <div className="container">
          <div className="content">
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search"
                className="search-form"
                value={searchTerm}
                onChange={e => this.input(e.target.value)}
              />
          </div>
        </div>
      </div>

    {
      (books && books.length >= 1) && 
        books.map((b,i) => {
        console.log(typeof b.imageLinks)
        return (
          <div key={`${b.title}-${i}`} className="search-book">
            <Link to={`/book/${b.id}`}>
              {
                (b.imageLinks === undefined || b === undefined || b.imageLinks.thumbnail ===  undefined) ?
                  <img src={noimage} alt ="Missing" style={this.img}></img>
              :
                  <img src={b.imageLinks.thumbnail} alt={b.title}></img>
              }
            </Link>
            <p>{b.title}</p>
            <hr/>
          </div>
        )}
      )
    }         
    </div>
  ) 
  } 
}

export default App;
