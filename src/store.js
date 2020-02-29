import React from 'react';

export const initialState = { access_token: null };

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { access_token: action.data };
        case "REMOVE_TOKEN":
            return { access_token: null };
        default:
            return initialState;
    }
};

export const Context = React.createContext();