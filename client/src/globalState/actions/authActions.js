import { setLawyer, LOGIN, LOGOUT } from "./actionTypes";
import axios from "axios";

import setAuthToken from "../../helpers/setAuthToken";

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};

export const login = async userData => {
    const res = await axios.post(
        `http://localhost:5000/api/${userData.type}/login`,
        userData
    );
    
    const token = res.data.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
};