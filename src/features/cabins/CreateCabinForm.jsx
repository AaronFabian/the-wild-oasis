/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();

	const { id: editId, ...editValue } = cabinToEdit;
	const isEditSession = Boolean(editId);
	const { register, handleSubmit, getValues, formState, reset } = useForm({
		defaultValues: isEditSession ? editValue : {},
	});
	const { errors } = formState;

	const isWorking = isCreating || isEditing;

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: (data) => {
						console.log(data);
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			createCabin(
				{ ...data, image },
				{
					onSuccess: (data) => {
						console.log(data);
						reset();
					},
				}
			);
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity shoul be at least one",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity shoul be at least one",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							Number(value) <= Number(getValues().regularPrice) ||
							"Discount should be less then regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					disabled={isWorking}
					accept="image/*"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
					type="file"
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit cabin" : "Add cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
