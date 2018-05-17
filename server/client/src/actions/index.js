import axios from 'axios';
import {FETCH_USER} from './types';

export const fetchUser = () => async dispatch => {
     const res = await axios.get('/api/current_user');

     dispatch({type: FETCH_USER, payload: res.data});
};

export const handleToken = (token, amount, credits) => async dispatch => {
        const res = await axios.post('/api/stripe', {token: token, amount: amount, credits: credits});
        console.log(res);
        dispatch({type: FETCH_USER, payload: res.data});
};