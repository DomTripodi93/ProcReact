import helpers from '../shared/helpers';
import axios from 'axios';


class rootHttp{
    rootUrl = 'http://localhost:5000/api/' + localStorage.getItem('id');
    headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    helper = new helpers;
    
    constructor(){}

    fetchByValue(model, value) {
      value = this.helper.slashToDash(value);
      return axios.get(
          this.rootUrl + '/' + model + '/' + value, {headers: this.headers}
      );
    }
    //Gets specific model by defining value(s)
  
    fetchById(model, id) {
      return axios.get(
          this.rootUrl + '/' + model + '/' + id, {headers: this.headers}
      )
    }
    //Gets specific model by id
  
    fetchAll(model) {
      return axios.get(
          this.rootUrl + '/' + model, {headers: this.headers}
      );
    }
    //Gets all of an item for user
  
    addItem(model, data){
      return axios.post(
          this.rootUrl + '/' + model, data, {headers: this.headers}
      );
    }
    //Posts new item to API
  
    updateItem(model, data, value){
      value = this.helper.slashToDash(value);
      return axios.put(
          this.rootUrl  + '/' + model + '/' + value, data, {headers: this.headers}
      );
    }
    //Updates selected item
  
    updateItemById(model, data, id){
      return axios.put(
          this.rootUrl  + '/' + model + '/' + id, data, {headers: this.headers}
      );
    }
    //Updates selected item
  
    deleteItem(model, value){
      value = this.helper.slashToDash(value);
      return axios.delete(
          this.rootUrl  + '/' + model + '/' + value,
          {responseType: 'text'}, {headers: this.headers}
      );
    }
    //Deletes selected item
  
    deleteItemById(model, id){
      return axios.delete(
          this.rootUrl  + '/' + model + '/' + id,
          {responseType: 'text'}, {headers: this.headers}
      );
    }
    //Deletes selected item by id
}

export default rootHttp;



// `${this.rootUrl}/${model}`