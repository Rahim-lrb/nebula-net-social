const PostSkeleton = () => {
	return (
		<div className='flex flex-col gap-4 w-full p-4 bg-gray-800 border border-gray-700 rounded-lg'>
			<div className='flex gap-4 items-center'>
				<div className='skeleton w-10 h-10 rounded-full bg-gray-600'></div>
				<div className='flex flex-col gap-2'>
					<div className='skeleton h-2 w-24 rounded-full bg-gray-600'></div>
					<div className='skeleton h-2 w-32 rounded-full bg-gray-600'></div>
				</div>
			</div>
			<div className='skeleton h-40 w-full bg-gray-600'></div>
		</div>
	);
};
export default PostSkeleton;