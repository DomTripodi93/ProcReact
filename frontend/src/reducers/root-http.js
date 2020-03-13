import helpers from '../shared/helpers';
import axios from 'axios';
import store from './store';


const rootHttp = () => {
    const userData = store.getState()["user"];
    
    const headers = {
        'Authorization': `Bearer ${userData.token}`
    }
    
    const rootUrl = 'http://localhost:5000/api/' + userData.id;

    function fetchByValue(model, value) {
      value = helpers.slashToDash(value);
      return axios.get(
          rootUrl + '/' + model + '/' + value, {headers}
      );
    }
    //Gets specific model by defining value(s)
  
    function fetchById(model, id) {
      return axios.get(
          rootUrl + '/' + model + '/' + id, {headers}
      )
    }
    //Gets specific model by id
  
    function fetchAll(model) {
      return axios.get(
          rootUrl + '/' + model, {headers}
      );
    }
    //Gets all of an item for user
  
    function addItem(model, data){
      return axios.post(
          rootUrl + '/' + model, data, {headers}
      );
    }
    //Posts new item to API
  
    function updateItem(model, data, value){
      value = helpers.slashToDash(value);
      return axios.put(
          rootUrl  + '/' + model + '/' + value, data, {headers}
      );
    }
    //Updates selected item
  
    function updateItemById(model, data, id){
      return axios.put(
          rootUrl  + '/' + model + '/' + id, data, {headers}
      );
    }
    //Updates selected item
  
    function deleteItem(model, value){
      value = helpers.slashToDash(value);
      return axios.delete(
          rootUrl  + '/' + model + '/' + value,
          {responseType: 'text'}, {headers}
      );
    }
    //Deletes selected item
  
    function deleteItemById(model, id){
      return axios.delete(
          rootUrl  + '/' + model + '/' + id,
          {responseType: 'text'}, {headers}
      );
    }
    //Deletes selected item by id
}

export default rootHttp;