import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import dotenv from 'dotenv';
// dotenv.config();
const useFollow = () => {
	const queryClient = useQueryClient();

	const { mutate: follow, isPending } = useMutation({
		mutationFn: async (userId) => {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/follow/${userId}`, {
					method: "POST",
					credentials: "include", // agar auth/session cookies use ho rahi hain
				});

				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				return;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
			]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { follow, isPending };
};

export default useFollow;