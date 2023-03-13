import { deleteDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ItemsCollection } from "../../../utils/Collections";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import styles from "./ViewInventory.module.scss";

function ViewInventory() {
	const [items, setItems] = useState([]);
	const [editIndex, setEditIndex] = useState(-1);
	const getInventoryData = async () => {
		const res: any = await getDocs(ItemsCollection());
		const temp: any = res.docs.map((a: any) => ({
			id: a.id,
			data: a?.data(),
		}));
		console.log(
			"🚀 ~ file: ViewInventory.tsx:18 ~ getInventoryData ~ temp:",
			temp
		);
		setItems(temp);
	};
	const handleDelete = async (id: any) => {
		const res: any = await deleteDoc(ItemsCollection(id));
		console.log(
			"🚀 ~ file: ViewInventory.tsx:24 ~ handleDelete ~ res:",
			res
		);

		getInventoryData();
	};
	useEffect(() => {
		getInventoryData();
	}, []);
	return (
		<div className={styles.pageContainer}>
			<div className={styles.listContainer}>
				{items.map((a: any, index: number) => (
					<div onClick={() => {}} className={styles.listItem}>
						<div>Item Name : {a?.data?.itemName}</div>
						<div>Quantity : {a?.data?.quantity}</div>
						<div className={styles.chipContainer}>
							Item Property :
							{a?.data?.property.map((a: any) => (
								<div className={styles.chip}>{a}</div>
							))}
						</div>
						<div
							className={styles.btns}
							onClick={() => setEditIndex(index)}>
							Edit
						</div>
						<div
							className={styles.btns}
							onClick={() => handleDelete(a?.id)}>
							Delete
						</div>
					</div>
				))}
			</div>
			{!!(editIndex >= 0) && (
				<div key={editIndex}>
					<AddNewProduct
						closeModal={() => {
							setEditIndex(-1);
							getInventoryData();
						}}
						defaultValues={items[editIndex]}
					/>
				</div>
			)}
		</div>
	);
}

export default ViewInventory;
