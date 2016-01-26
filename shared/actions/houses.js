//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';

export const HOUSES_GET = 'HOUSES_GET';
export const HOUSES_GET_REQUEST = 'HOUSES_GET_REQUEST';
export const HOUSES_GET_SUCCESS = 'HOUSES_GET_SUCCESS';
export const HOUSES_GET_FAILURE = 'HOUSES_GET_FAILURE';


/*Action Creator functions*/
export function housesGet(saleRent,city,zipType) {
    return {
        type: HOUSES_GET,
        promise: request.get(`https://real-estate-react.firebaseio.com/${saleRent}/${city}.json`),
        obj:true,
        filter:zipType
    };
}



export function getHousesIfNeeded(saleRent, city, zipType) {
    return (dispatch, getState) => {
            return dispatch(housesGet(saleRent,city,zipType));
    };
}


