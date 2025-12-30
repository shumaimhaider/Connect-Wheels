import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockCars, mockComments } from "../../data/mock-data";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API for cars
export const carApi = createApi({
    reducerPath: "carApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    tagTypes: ["Car", "Comment"],
    endpoints: (builder) => ({
        // Get all cars with optional filters
        getCars: builder.query({
            queryFn: async ({ search = "", make = "", year = null, garageId = null, sortBy = "date", sortOrder = "desc" } = {}) => {
                await delay(500);

                let filtered = [...mockCars];

                // Apply search filter
                if (search) {
                    const searchLower = search.toLowerCase();
                    filtered = filtered.filter(
                        (c) =>
                            c.make.toLowerCase().includes(searchLower) ||
                            c.model.toLowerCase().includes(searchLower) ||
                            c.description.toLowerCase().includes(searchLower)
                    );
                }

                // Apply make filter
                if (make) {
                    filtered = filtered.filter((c) =>
                        c.make.toLowerCase().includes(make.toLowerCase())
                    );
                }

                // Apply year filter
                if (year) {
                    filtered = filtered.filter((c) => c.year === parseInt(year));
                }

                // Apply garage filter
                if (garageId) {
                    filtered = filtered.filter((c) => c.garageId === parseInt(garageId));
                }

                // Apply sorting
                filtered.sort((a, b) => {
                    let comparison = 0;
                    switch (sortBy) {
                        case "make":
                            comparison = a.make.localeCompare(b.make);
                            break;
                        case "year":
                            comparison = a.year - b.year;
                            break;
                        case "likes":
                            comparison = a.likesCount - b.likesCount;
                            break;
                        case "date":
                            comparison = new Date(a.createdAt) - new Date(b.createdAt);
                            break;
                        default:
                            comparison = 0;
                    }
                    return sortOrder === "asc" ? comparison : -comparison;
                });

                return { data: filtered };
            },
            providesTags: ["Car"],
        }),

        // Get single car by ID
        getCarById: builder.query({
            queryFn: async (id) => {
                await delay(300);
                const car = mockCars.find((c) => c.id === parseInt(id));
                if (!car) {
                    return { error: { status: 404, data: "Car not found" } };
                }
                return { data: car };
            },
            providesTags: (result, error, id) => [{ type: "Car", id }],
        }),

        // Create new car
        createCar: builder.mutation({
            queryFn: async (carData) => {
                await delay(800);
                const newCar = {
                    id: mockCars.length + 1,
                    ...carData,
                    likesCount: 0,
                    commentsCount: 0,
                    isLiked: false,
                    ownerId: 1, // Current user
                    ownerName: "John Doe",
                    createdAt: new Date().toISOString(),
                };
                mockCars.push(newCar);
                return { data: newCar };
            },
            invalidatesTags: ["Car"],
        }),

        // Update car
        updateCar: builder.mutation({
            queryFn: async ({ id, ...updates }) => {
                await delay(800);
                const index = mockCars.findIndex((c) => c.id === parseInt(id));
                if (index === -1) {
                    return { error: { status: 404, data: "Car not found" } };
                }
                mockCars[index] = { ...mockCars[index], ...updates };
                return { data: mockCars[index] };
            },
            invalidatesTags: (result, error, { id }) => [{ type: "Car", id }],
        }),

        // Like/Unlike car
        likeCar: builder.mutation({
            queryFn: async (id) => {
                await delay(300);
                const car = mockCars.find((c) => c.id === parseInt(id));
                if (!car) {
                    return { error: { status: 404, data: "Car not found" } };
                }
                car.isLiked = !car.isLiked;
                car.likesCount += car.isLiked ? 1 : -1;
                return { data: car };
            },
            invalidatesTags: (result, error, id) => [{ type: "Car", id }],
        }),

        // Get comments for a car
        getCarComments: builder.query({
            queryFn: async (carId) => {
                await delay(300);
                const comments = mockComments.filter((c) => c.carId === parseInt(carId));
                return { data: comments };
            },
            providesTags: (result, error, carId) => [{ type: "Comment", carId }],
        }),

        // Add comment to car
        addComment: builder.mutation({
            queryFn: async ({ carId, comment }) => {
                await delay(500);
                const newComment = {
                    id: mockComments.length + 1,
                    carId: parseInt(carId),
                    userId: 1, // Current user
                    userName: "John Doe",
                    userAvatar: "https://i.pravatar.cc/150?img=1",
                    comment,
                    createdAt: new Date().toISOString(),
                };
                mockComments.push(newComment);

                // Update comment count on car
                const car = mockCars.find((c) => c.id === parseInt(carId));
                if (car) {
                    car.commentsCount += 1;
                }

                return { data: newComment };
            },
            invalidatesTags: (result, error, { carId }) => [
                { type: "Comment", carId },
                { type: "Car", id: carId },
            ],
        }),
    }),
});

export const {
    useGetCarsQuery,
    useGetCarByIdQuery,
    useCreateCarMutation,
    useUpdateCarMutation,
    useLikeCarMutation,
    useGetCarCommentsQuery,
    useAddCommentMutation,
} = carApi;
