import helpers from '../shared/helpers';
import axios from 'axios';


const helper = new helpers;

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}

const rootUrl = 'http://localhost:5000/api/' + localStorage.getItem('id');

class rootHttp{

    fetchByValue(model, value) {
      value = helper.slashToDash(value);
      return axios.get(
          rootUrl + '/' + model + '/' + value, {headers}
      );
    }
    //Gets specific model by defining value(s)
  
    fetchById(model, id) {
      return axios.get(
          rootUrl + '/' + model + '/' + id, {headers}
      )
    }
    //Gets specific model by id
  
    fetchAll(model) {
      return axios.get(
          rootUrl + '/' + model, {headers}
      );
    }
    //Gets all of an item for user
  
    addItem(model, data){
      return axios.post(
          rootUrl + '/' + model, data, {headers}
      );
    }
    //Posts new item to API
  
    updateItem(model, data, value){
      value = helper.slashToDash(value);
      return axios.put(
          rootUrl  + '/' + model + '/' + value, data, {headers}
      );
    }
    //Updates selected item
  
    updateItemById(model, data, id){
      return axios.put(
          rootUrl  + '/' + model + '/' + id, data, {headers}
      );
    }
    //Updates selected item
  
    deleteItem(model, value){
      value = helper.slashToDash(value);
      return axios.delete(
          rootUrl  + '/' + model + '/' + value,
          {responseType: 'text'}, {headers}
      );
    }
    //Deletes selected item
  
    deleteItemById(model, id){
      return axios.delete(
          rootUrl  + '/' + model + '/' + id,
          {responseType: 'text'}, {headers}
      );
    }
    //Deletes selected item by id
}

export default rootHttp;



// `${rootUrl}/${model}`