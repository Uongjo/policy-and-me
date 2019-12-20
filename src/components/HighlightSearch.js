import React from 'react';
import Highlighter from 'react-highlight-words'

const highlightSearch = (instance, searchValue) => {
    searchValue = searchValue.replace(/[+]/g,' ')
    var terms = new Array()
    terms = searchValue.split(" ")
    for (let key in instance){
      if (instance[key]==null) {
      	continue
      }

      let value = typeof(instance[key]) != "string" ? instance[key].toString() : instance[key]
      let formattedKey = key.replace(/[_]/g, " ")
      if (value.toLowerCase().includes(searchValue.toLowerCase())){
        return (
          <div className="highlight-search">
            <b>{formattedKey}: </b>
            <Highlighter searchWords = {[searchValue]} autoEscape = {true} textToHighlight = {value}/>
          </div>
        )
      }
    }
    for (let i in terms) {
      for (let key in instance){
        if (instance[key]==null) {
          continue
        }

        let value = typeof(instance[key]) != "string" ? instance[key].toString() : instance[key]
        let formattedKey = key.replace(/[_]/g, " ")
        if (value.toLowerCase().includes(terms[i].toLowerCase())){
          return (
            <div className="highlight-search">
              <b>{formattedKey}: </b>
              <Highlighter searchWords = {terms} autoEscape = {true} textToHighlight = {value}/>
            </div>
          )
        }
      }
    }
}

export default highlightSearch;