import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const CreatePost = () => {
	const [text, setText] = useState("");
	const [img, setImg] = useState(null);
	const imgRef = useRef(null);

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const { mutate: createPost, isPending, isError, error } = useMutation({
		mutationFn: async ({ text, img }) => {
			try {
				const res = await fetch("/api/posts/create", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ text, img }),
				});
				const data = await res.json();
				console.log(data)
				console.log("hey")
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			setText("");
			setImg(null);
			toast.success("Post created successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		createPost({ text, img });
	};

	const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='bg-gray-800 border-b border-gray-700 mx-4 sm:mx-8 md:mx-12 p-4 rounded-lg'>
			<div className='flex items-start gap-4'>
				<div className='w-10 h-10 rounded-full overflow-hidden'>
					<img
						src={authUser.profileImg || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"}
						alt="Profile"
						className='w-full h-full object-cover'
					/>
				</div>
				<form className='flex flex-col gap-3 w-full' onSubmit={handleSubmit}>
					<textarea
						className='w-full p-3 text-lg bg-gray-900 text-white border border-gray-700 rounded-lg resize-none focus:outline-none'
						placeholder='What’s on your mind?'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					{img && (
						<div className='relative w-full max-w-lg mx-auto'>
							<IoCloseSharp
								className='absolute top-2 right-2 text-white bg-gray-900 rounded-full w-6 h-6 cursor-pointer'
								onClick={() => {
									setImg(null);
									imgRef.current.value = null;
								}}
							/>
							<img src={img} className='w-full h-60 object-cover rounded-lg border border-gray-700' />
						</div>
					)}
					<div className='flex justify-between items-center border-t border-gray-700 pt-2'>
						<div className='flex gap-3 items-center'>
							<CiImageOn
								className='text-gray-400 hover:text-sky-400 w-6 h-6 cursor-pointer'
								onClick={() => imgRef.current.click()}
							/>
							<BsEmojiSmileFill className='text-gray-400 hover:text-sky-400 w-6 h-6 cursor-pointer' />
						</div>
						<input type='file' accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />
						<button className='btn btn-primary rounded-full text-white px-4 py-2'>
							{isPending ? "Posting..." : "Post"}
						</button>
					</div>
					{isError && <div className='text-red-500 text-sm mt-2'>{error.message}</div>}
				</form>
			</div>
		</div>
	);
};

export default CreatePost;
