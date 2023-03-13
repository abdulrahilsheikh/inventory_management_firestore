import React, { useState } from "react";
import styles from "./AddNewProduct.module.scss";
import { setDoc, addDoc, doc } from "firebase/firestore";
import { ItemsCollection } from "../../../utils/Collections";
import { db } from "../../../utils/firebase";
type formType = {
	itemName: string;
	image: any;
	quantity: number;
	property: string[];
};
type AddNewProductType = {
	defaultValues?: { id: string; data: formType };
	closeModal?: () => void;
};
function AddNewProduct({ defaultValues, closeModal }: AddNewProductType) {
	const [formState, setFormState] = useState<formType>(
		defaultValues?.data ?? {
			image: "",
			itemName: "",
			property: [],
			quantity: 0,
		}
	);
	const [property, setProperty] = useState("");
	const handleFormInput = (name: string, e: any) => {
		setFormState({ ...formState, [name]: e });
	};

	const removeProperty = (iodx: number) => {
		const temp = [...formState.property];
		temp.splice(iodx, 1);
		setFormState({ ...formState, property: temp });
	};
	const addProperty = () => {
		if (!property) return;
		const temp = [...formState.property];
		temp.push(property);
		setFormState({ ...formState, property: temp });
		setProperty("");
	};

	const submitData = async () => {
		if (defaultValues) {
			const res: any = await setDoc(
				ItemsCollection(defaultValues.id),
				formState
			);
			console.log(res);
			setFormState({
				image: "",
				itemName: "",
				property: [],
				quantity: 0,
			});
			setProperty("");
			closeModal && closeModal();
		} else {
			const res: any = await addDoc(ItemsCollection(), formState);
			console.log(res);
			setFormState({
				image: "",
				itemName: "",
				property: [],
				quantity: 0,
			});
			setProperty("");
		}
	};
	return (
		<div className={styles.page}>
			<div className={styles.addNewItemContainer}>
				<input
					value={formState.itemName}
					placeholder="Item name"
					onChange={(e) =>
						handleFormInput("itemName", e.target.value)
					}
				/>
				<input
					value={formState.quantity}
					placeholder="Qunatity"
					type={"number"}
					min={0}
					onChange={(e) =>
						handleFormInput("quantity", +e.target.value)
					}
				/>
				<div className={styles.chipContainer}>
					{formState.property.map((a, idx) => (
						<div className={styles.chip}>
							{a}{" "}
							<button onClick={() => removeProperty(idx)}>
								X
							</button>
						</div>
					))}
				</div>
				<input
					value={property}
					placeholder="Property"
					onChange={(e) => setProperty(e.target.value)}
				/>
				<button
					className={styles.addNewBtn}
					onClick={(e) => addProperty()}>
					Add new Property
				</button>
				<button className={styles.addNewBtn} onClick={submitData}>
					Submitt Item
				</button>
			</div>
		</div>
	);
}

export default AddNewProduct;
