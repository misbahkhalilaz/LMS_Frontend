import React from "react";
import { Route, Navigate } from "react-router-dom";

export default function PrivateRoute({ login, path, element }) {
	return (
		<Route
			path={path}
			element={login === "true" ? element : <Navigate to="/login" />}
		/>
	);
}
