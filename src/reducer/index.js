import { combineReducers } from 'redux';
import { todo } from './todo';
import { columns } from './columns';

export default combineReducers({ todo, columns });