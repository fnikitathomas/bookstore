import React from 'react'
import axios from 'axios'


const Search = (props) => {
    const testTheory = async () => {
        await axios.get(`http://localhost:7000/books/search/computers`)
        .then(resp => {
          console.log(resp.data.books)
          props.books = [...resp.data.books]
          localStorage.setItem('liveBooks',JSON.stringify(resp.data.books))

        })
    }
    testTheory()
    console.log(props.books)
    return(
        <div className="App">Monkey Piss</div>
    )
}

export default Search