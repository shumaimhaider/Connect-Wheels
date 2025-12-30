import { Formik, Form } from "formik";
import { carSchema } from "../../validations/car-validations";
import { CarFormFields } from "./car-fields";
import { useCreateCarMutation, useUpdateCarMutation } from "../../redux/slices/carSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CarForm = ({ car = null, isEdit = false }) => {
    const navigate = useNavigate();
    const [createCar, { isLoading: isCreating }] = useCreateCarMutation();
    const [updateCar, { isLoading: isUpdating }] = useUpdateCarMutation();

    const initialValues = car || {
        make: "",
        model: "",
        year: new Date().getFullYear(),
        garageId: "",
        description: "",
        images: [],
        videos: [],
        specifications: {
            engine: "",
            horsepower: "",
            torque: "",
            transmission: "",
            drivetrain: "",
            topSpeed: "",
            acceleration: "",
        },
        features: [],
        pricing: "",
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (isEdit) {
                await updateCar({ id: car.id, ...values }).unwrap();
                toast.success("Car updated successfully!");
                navigate(`/cars/${car.id}`);
            } else {
                const result = await createCar(values).unwrap();
                toast.success("Car added successfully!");
                resetForm();
                navigate(`/cars/${result.id}`);
            }
        } catch (error) {
            toast.error(isEdit ? "Failed to update car" : "Failed to add car");
            console.error("Car form error:", error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={carSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            <Form>
                <CarFormFields loading={isCreating || isUpdating} isEdit={isEdit} />
            </Form>
        </Formik>
    );
};
