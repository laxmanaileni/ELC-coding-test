import React from 'react';
import ItemsResult from './ItemsResult';

function SearchResults(props) {
  return (
    <div>
    <p className="results-info">{`Showing ${props.searchResults.items.length} of ${props.searchResults.total} products` }</p>
        <div className="search-results">
            <ItemsResult items={props.searchResults.items}/>
         </div>
    </div>
  )
}

export default SearchResults