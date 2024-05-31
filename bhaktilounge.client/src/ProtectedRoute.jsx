import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import {clearToken} from "@/services/tokenSlice.js";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
const ProtectedRoute = ({ children }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token.value);
	useEffect(() => {
		if (token) {
			const decoded = jwtDecode(token);
			if (decoded.exp * 1000 < Date.now()) {
				console.log("Token expired");
				dispatch(clearToken());
			}
		}
	}, []);

	console.log("token: ", token)
	return token==null ? <Navigate to="/" />:children ;
};

export default ProtectedRoute;