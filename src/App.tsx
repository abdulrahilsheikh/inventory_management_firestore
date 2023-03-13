import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import InventoryMain from "./components/inventory/InventoryMain";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<InventoryMain />
		</div>
	);
}

export default App;
