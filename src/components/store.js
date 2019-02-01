const storage = window.localStorage

class Store {
    /**
   * Creates instance of store on the top of localStorage
   * @param storeId  id to store items inside localStorage
   *  
   */

   constructor(storeId){
       this.storeId = storeId
       const initialState = this.get()
       if (!initialState){
           this.set({
               birdList: []
           })
       }
    }

   set(data) {
        data = {
            ...this.get(),
            ...data,
        }
        storage.setItem(this.storeId, JSON.stringify(data))
    }

    get(){
        const rawData = storage.getItem(this.storeId)
        const data = JSON.parse(rawData)
        return data
    }
}


export default Store