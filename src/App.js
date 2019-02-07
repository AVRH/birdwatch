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
//When component mounts
  componentDidMount(){
    //check if geolocation is available on the browser
    const geolocation = window.navigator.geolocation
    if(geolocation){
      //if it is, start tracking location 
      this.startWatch()
    }
    //get saved data from local storage
    //and set it to component state
    this._updateStateFromStore()
  }

  //method to track geolocation of the application
  startWatch() {
    //start geolocation, and every 5 seconds check device position,
    //and save position to the state 
    this.watchID = window.navigator.geolocation.watchPosition((pos) => {
      this.updateLocation({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      })
    },
    //if error is encountered, save empty position and console log error
    (error)=>{
      console.log(error)
      this.updateLocation({ lat: '', long: ''})
    },
    {enableHighAccuracy: false, timeout: 5000, maximumAge: 0 })
    
  }
  //method to save location to state
  updateLocation = (location) => {
    this.setState({location})
  } 


  changeView = () => {
    
    this.setState({ 
      addView: !this.state.addView
    })
  }
  //methods to handle changes in inputs 
  //and save input data to state
  handleSpeciesChange = (event) => {
    this.setState({newSpecies: event.target.value})
  }
  handleNoteChange = (event) => {
    this.setState({newNote: event.target.value})
  }
  handleRarityChange = (event) => {
    this.setState({newRarity: event.target.value})
  }
  

  //add new observation
  addObservation = (event) => {
    //save the time
    const time = new Date()
    event.preventDefault()
    //form a object using data saved from inputs to state
    const newBird = {
      species: this.state.newSpecies,
      rarity: this.state.newRarity || "common",
      notes: this.state.newNote,
      time: {
        //split time into complete time string
        //date, and hour to make it more readable for humans
        whole: time.toISOString(),
        hour: time.toTimeString(),
        date: time.toDateString()
      },
      location: this.state.location
    }
    //add new object to birdlist, and empty data saved to state
    this.setState({
    birdList: (this.state.birdList.concat(newBird)),
    newSpecies: '',
    newNote: '',
    newRarity: null,
    addView: false,
  }, () => {
    //save data to local storage
    this._updateStateAndStore()
  })
}

handleSortByChange = (event) => {
  this.setState({
    sortBy: event.target.value,
    birdList: this.sortList(event.target.value)
  })
}
//method to sort the displayed list of birds
//according to the selected sorting criteria
sortList = (term) => {
  //copy list of birds from the state
    const listToSort = [...this.state.birdList]
  //sort the copy
  //according to time, species or rarity field of the object
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
        <button id="add" onClick={this.changeView}>{this.state.addView ? "Cancel" : "Add new"}</button>
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

  //methods to take data from local storage to state, 
  //push data to localstorage
  //and update both local storage and state
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

