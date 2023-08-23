import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
        mutationFn: deleteBookingApi,

        // the data is the return data from the function apiBooking
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully deleted`);
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },

        onError: () => toast.error("There was an error while checkin in"),
    });

    return { deleteBooking, isDeletingBooking };
}