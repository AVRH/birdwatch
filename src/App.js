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
      newNote: '',
      location: {
        lat: '',
        long: ''
      },
      sortBy: 'time',
  }
}
  componentDidMount(){
    const geolocation = window.navigator.geolocation
    if(geolocation){
      this.startWatch()
    }
    this._updateStateFromStore()
  }
  startWatch() {
    this.watchID = window.navigator.geolocation.watchPosition((pos) => {
      this.updateLocation({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      })
    },
    (error)=>{
      console.log(error)
      this.updateLocation({ lat: '', long: ''})
    },
    {enableHighAccuracy: false, timeout: 5000, maximumAge: 0 })
    
  }
  updateLocation = (location) => {
    this.setState({location})
  } 

  changeView = () => {
    
    this.setState({ 
      addView: !this.state.addView
    })
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
    const time = new Date()
    event.preventDefault()
    const newBird = {
      species: this.state.newSpecies,
      rarity: this.state.newRarity || "common",
      notes: this.state.newNote,
      time: {
        whole: time.toISOString(),
        hour: time.toTimeString(),
        date: time.toDateString()
      },
      location: this.state.location
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

handleSortByChange = (event) => {
  this.setState({
    sortBy: event.target.value,
    birdList: this.sortList(event.target.value)
  })
}
sortList = (term) => {
  //copy list of birds from the state
    const listToSort = [...this.state.birdList]
  //sort the copy
   if(term === "time"){
      listToSort.sort(function(x,y){
          return Date.parse(x.time.whole) - Date.parse(y.time.whole)
      }).reverse()
  }
  if(term === "rarity"){
    listToSort.sort(function(x,y) {
      return x.rarity < y.rarity
    })
  }
  if(term === "species"){
    listToSort.sort(function(x,y){
      return x.species > y.species
    })
  }
    return listToSort
}

render() {
    return (
      <div className="App">
        <h1>Bird Watchers</h1>
        <button onClick={this.changeView}>{this.state.addView ? "Cancel" : "Add new"}</button>
        {this.state.addView ? <AddForm 
          handleClick={this.changeView}
          speciesValue={this.state.newSpecies}
          speciesChange={this.handleSpeciesChange}
          rarityChange={this.handleRarityChange}
          noteValue={this.state.newNote}
          noteChange={this.handleNoteChange}
          submit = {this.addObservation}
          /> 
        :  <BirdList birds={this.state.birdList} sortbyChange={this.handleSortByChange} />}
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

