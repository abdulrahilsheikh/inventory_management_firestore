import { useState } from "react";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import Sidebar from "../Sidebar/Sidebar";
import ViewInventory from "../ViewInventory/ViewInventory";
import styles from "./InventoryMain.module.scss";

const JSX: any = {
	"Add New Item": <AddNewProduct />,
	"View Inventory": <ViewInventory />,
};
function InventoryMain() {
	const [active, setActive] = useState("home");
	return (
		<div className={styles.mainPageContainer}>
			<Sidebar list={Object.keys(JSX)} changeTab={setActive} />
			{JSX[active]}
		</div>
	);
}

export default InventoryMain;
