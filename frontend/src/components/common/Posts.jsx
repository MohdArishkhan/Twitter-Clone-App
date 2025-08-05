import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const Posts = ({ feedType, username, userId }) => {
	const base = import.meta.env.VITE_BACKEND_URL;

	const POST_ENDPOINT = useMemo(() => {
		switch (feedType) {
			case "forYou":
				return `${base}/api/post/all`;
			case "following":
				return `${base}/api/post/following`;
			case "posts":
				return `${base}/api/post/user/${username}`;
			case "likes":
				return `${base}/api/post/likes/${userId}`;
			default:
				return `${base}/api/post/all`;
		}
	}, [feedType, username, userId]);

	const {
		data: posts,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["posts", feedType, username, userId],
		queryFn: async () => {
			const res = await fetch(POST_ENDPOINT, {
				credentials: "include", // ✅ important for auth
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			}

			return data;
		},
		enabled: !!POST_ENDPOINT, // avoids running if undefined
	});

	// Refetch when feedType/username changes
	useEffect(() => {
		refetch();
	}, [feedType, username, userId, refetch]);

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}

			{!isLoading && !isRefetching && posts?.length === 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}

			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};

export default Posts;
