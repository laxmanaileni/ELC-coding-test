import React from 'react';
import SearchResults from './Items/SearchResults';
import Navigation from './navigation';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchTerm: '',
            searchResults: {items: [], total: 0}
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
            searchTerm: '',
            searchResults: {items: [], total: 0}
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        e.preventDefault();
        this.setState({ searchTerm: e.target.value });
        if (e.target.value && e.target.value.length > 2) {
            fetch(`http://localhost:3035/products?q=${e.target.value}`)
                .then(res => res.json())
                .then(searchResults => {
                    this.setState({ searchResults })
                });
        } else {
            this.setState({ searchResults: {items: [], total: 0} });
        }
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <Navigation showSearchContainer={(e)=>this.showSearchContainer(e)}/>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} value={this.state.searchTerm}/>
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>

                    {
                    this.state.searchResults.items.length > 0 && <SearchResults searchResults={this.state.searchResults}/>
                    }
                </div>
            </header>
        );
    }
}

 export default Menu;