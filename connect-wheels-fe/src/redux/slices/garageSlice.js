import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockGarages } from "../../data/mock-data";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API for garages
export const garageApi = createApi({
    reducerPath: "garageApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    tagTypes: ["Garage"],
    endpoints: (builder) => ({
        // Get all garages with optional filters
        getGarages: builder.query({
            queryFn: async ({ search = "", location = "", type = "", sortBy = "date", sortOrder = "desc" } = {}) => {
                await delay(500); // Simulate network delay

                let filtered = [...mockGarages];

                // Apply search filter
                if (search) {
                    const searchLower = search.toLowerCase();
                    filtered = filtered.filter(
                        (g) =>
                            g.name.toLowerCase().includes(searchLower) ||
                            g.description.toLowerCase().includes(searchLower) ||
                            g.tags.some((tag) => tag.toLowerCase().includes(searchLower))
                    );
                }

                // Apply location filter
                if (location) {
                    filtered = filtered.filter((g) =>
                        g.location.toLowerCase().includes(location.toLowerCase())
                    );
                }

                // Apply type filter
                if (type) {
                    filtered = filtered.filter((g) => g.type === type);
                }

                // Apply sorting
                filtered.sort((a, b) => {
                    let comparison = 0;
                    switch (sortBy) {
                        case "name":
                            comparison = a.name.localeCompare(b.name);
                            break;
                        case "followers":
                            comparison = a.followersCount - b.followersCount;
                            break;
                        case "cars":
                            comparison = a.carsCount - b.carsCount;
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
            providesTags: ["Garage"],
        }),

        // Get single garage by ID
        getGarageById: builder.query({
            queryFn: async (id) => {
                await delay(300);
                const garage = mockGarages.find((g) => g.id === parseInt(id));
                if (!garage) {
                    return { error: { status: 404, data: "Garage not found" } };
                }
                return { data: garage };
            },
            providesTags: (result, error, id) => [{ type: "Garage", id }],
        }),

        // Create new garage
        createGarage: builder.mutation({
            queryFn: async (garageData) => {
                await delay(800);
                const newGarage = {
                    id: mockGarages.length + 1,
                    ...garageData,
                    ownerId: 1, // Current user
                    ownerName: "John Doe",
                    followersCount: 0,
                    carsCount: 0,
                    isFollowing: false,
                    createdAt: new Date().toISOString(),
                };
                mockGarages.push(newGarage);
                return { data: newGarage };
            },
            invalidatesTags: ["Garage"],
        }),

        // Update garage
        updateGarage: builder.mutation({
            queryFn: async ({ id, ...updates }) => {
                await delay(800);
                const index = mockGarages.findIndex((g) => g.id === parseInt(id));
                if (index === -1) {
                    return { error: { status: 404, data: "Garage not found" } };
                }
                mockGarages[index] = { ...mockGarages[index], ...updates };
                return { data: mockGarages[index] };
            },
            invalidatesTags: (result, error, { id }) => [{ type: "Garage", id }],
        }),

        // Follow/Unfollow garage
        followGarage: builder.mutation({
            queryFn: async (id) => {
                await delay(300);
                const garage = mockGarages.find((g) => g.id === parseInt(id));
                if (!garage) {
                    return { error: { status: 404, data: "Garage not found" } };
                }
                garage.isFollowing = !garage.isFollowing;
                garage.followersCount += garage.isFollowing ? 1 : -1;
                return { data: garage };
            },
            invalidatesTags: (result, error, id) => [{ type: "Garage", id }],
        }),

        // Get cars in a garage
        getGarageCars: builder.query({
            queryFn: async (garageId) => {
                await delay(400);
                const { mockCars } = await import("../../data/mock-data");
                const cars = mockCars.filter((c) => c.garageId === parseInt(garageId));
                return { data: cars };
            },
        }),
    }),
});

export const {
    useGetGaragesQuery,
    useGetGarageByIdQuery,
    useCreateGarageMutation,
    useUpdateGarageMutation,
    useFollowGarageMutation,
    useGetGarageCarsQuery,
} = garageApi;
