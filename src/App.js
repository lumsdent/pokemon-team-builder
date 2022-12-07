import React from "react";
import "./App.css";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Layout from "./components/Layout";
import Evaluation from "./components/Evaluation";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout></Layout>}>
						<Route index element={<Home />}></Route>
						<Route
							path={"/detail/:id"}
							element={<Detail></Detail>}
						></Route>
						<Route
							path="evaluate"
							element={<Evaluation></Evaluation>}
						></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
