import { Formik, Form } from "formik";
import { garageSchema } from "../../validations/garage-validations";
import { GarageFormFields } from "./garage-fields";
import { useCreateGarageMutation, useUpdateGarageMutation } from "../../redux/slices/garageSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const GarageForm = ({ garage = null, isEdit = false }) => {
    const navigate = useNavigate();
    const [createGarage, { isLoading: isCreating }] = useCreateGarageMutation();
    const [updateGarage, { isLoading: isUpdating }] = useUpdateGarageMutation();

    const initialValues = garage || {
        name: "",
        description: "",
        location: "",
        type: "Classic",
        tags: [],
        images: [],
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (isEdit) {
                await updateGarage({ id: garage.id, ...values }).unwrap();
                toast.success("Garage updated successfully!");
                navigate(`/garages/${garage.id}`);
            } else {
                const result = await createGarage(values).unwrap();
                toast.success("Garage created successfully!");
                resetForm();
                navigate(`/garages/${result.id}`);
            }
        } catch (error) {
            toast.error(isEdit ? "Failed to update garage" : "Failed to create garage");
            console.error("Garage form error:", error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={garageSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            <Form>
                <GarageFormFields loading={isCreating || isUpdating} isEdit={isEdit} />
            </Form>
        </Formik>
    );
};
