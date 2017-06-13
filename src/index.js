import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var Names = require('./names.js');

class UserInput extends React.Component {
	handleChange(e){
		const inputText = e.target.value;
		this.props.updateInputText(inputText);
	}

	render(){
		return <input type="text" name="namesearch" 
		placeholder="Search the list with React"
		onChange={(e) => this.handleChange(e)} />
	}

}

class SearchResult extends React.Component {
	getSearchResult(){
        const inputText = this.props.inputText.toLowerCase();
        const searchResult = Names.filter((name) => {
               return name.toLowerCase().includes(inputText);
            })
        return searchResult;
	}

    render(){
    	const searchResult = (this.props.inputText) ? this.getSearchResult() : Names;
        const nameList = searchResult.map((name, index) => {return <li className="listItem" key={index}>{name}</li>});
    	return <ul className="list">{nameList}</ul>;
    }

}

SearchResult.propTypes = {
  inputText: React.PropTypes.string.isRequired
}

class ReactSearch extends React.Component {
	constructor(){
		super();
		this.state={
			inputText: "",
		};

		this.updateInputText = this.updateInputText.bind(this);
	}

    updateInputText(inputText){
        this.setState({
        	inputText: inputText
        })
    }

	render(){
		return (
			<div>
			    <h1>React Name Search</h1>			        
			    <UserInput updateInputText={this.updateInputText}/>
			    <SearchResult inputText={this.state.inputText}/>
			</div>
		);
	}

}

ReactDOM.render(<ReactSearch />, document.getElementById('app'));
