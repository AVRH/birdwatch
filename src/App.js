import React from 'react';
import './App.css';
import BirdList from './components/birdList';
import AddForm from './components/addForm'

class  App extends React.Component {
constructor(props){
  super(props)
  this.state = {
      birdList: [],
      addView: false,
      newSpecies: '',
      newRarity: '',
      newNote: ''
  }
}
  componentDidMount(){
    this._updateStateFromStore()
  }

  changeView = () => {
    this.setState({addView: !this.state.addView})
  }
  handleSpeciesChange = (event) => {
    this.setState({newSpecies: event.target.value})
  }
  handleNoteChange = (event) => {
    this.setState({newNote: event.target.value})
  }
  handleRarityChange = (event) => {
    this.setState({newRarity: event.target.value})
  }
  addObservation = (event) => {
    event.preventDefault()
    const newBird = {
      species: this.state.newSpecies,
      rarity: this.state.newRarity || "common",
      notes: this.state.newNote,
      time: new Date().toISOString()
    }
    this.setState({
    birdList: (this.state.birdList.concat(newBird)),
    newSpecies: '',
    newNote: '',
    newRarity: null,
    addView: false,
  }, () => {
    this._updateStateAndStore()
  })
}
render() {
    const birdsInShowOrder = this.state.birdList.sort(function(x,y){
      return Date.parse(x.time) - Date.parse(y.time)
  }).reverse()
    return (
      <div className="App">
        <h1>Bird Watchers!</h1>
        <button onClick={this.changeView}>{this.state.addView ? "Cancel" : "Add"}</button>
        {this.state.addView ? <AddForm 
          handleClick={this.changeView}
          speciesValue={this.state.newSpecies}
          speciesChange={this.handleSpeciesChange}
          rarityChange={this.handleRarityChange}
          noteValue={this.state.newNote}
          noteChange={this.handleNoteChange}
          submit = {this.addObservation}
        /> 
        :  <BirdList birds={birdsInShowOrder}/>}
      </div>
    );
  }

  _updateStateFromStore(){
    const birdList = this.props.store.get()
    this.setState({birdList: birdList.birdList})
  }
  _updateStore(){
    const birdList = this.state.birdList
    this.props.store.set({birdList})
  }
  _updateStateAndStore(){
    this._updateStore()
    this._updateStateFromStore()
  }

}

export default App;

