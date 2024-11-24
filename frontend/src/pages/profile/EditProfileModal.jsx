import { useState, useEffect } from 'react';
import useUpdateUserProfile from '../../hooks/useUpdateUserProfile';
import toast, { Toaster } from 'react-hot-toast';

const EditProfileModal = ({ authUser }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: '',
    link: '',
    newPassword: '',
    currentPassword: '',
  });

  const [coverImg, setCoverImg] = useState('https://via.placeholder.com/600x200?text=No+Cover+Image');
  const [profileImg, setProfileImg] = useState('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser?.fullName || '',
        username: authUser?.username || '',
        bio: authUser?.bio || '',
        link: authUser?.link || '',
        newPassword: '',
        currentPassword: '',
      });
      setCoverImg(authUser?.coverImg || 'https://via.placeholder.com/600x200?text=No+Cover+Image');
      setProfileImg(authUser?.profileImg || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm');
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'profileImg') {
          setProfileImg(reader.result);
        } else if (name === 'coverImg') {
          setCoverImg(reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare form data
    const data = {
      ...formData,
      bio: formData.bio.trim() === '' ? 'No bio available' : formData.bio,
      profileImg: profileImg.startsWith('data:image') ? profileImg : undefined,
      coverImg: coverImg.startsWith('data:image') ? coverImg : undefined,
    };
  
    try {
      await updateProfile(data);
      setIsModalOpen(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile!');
    }
  };
  

  return (
    <>
      <button
        className="bg-blue-600 text-white px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-md rounded-lg hover:bg-blue-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Profile
      </button>

      {isModalOpen && (
        <dialog
          open
          className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 w-full h-full"
        >
          <div className="modal-box w-4/5 max-w-xl bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 relative">
            <div className="relative mb-8">
              <img
                src={coverImg}
                alt="Cover"
                className="w-full h-40 object-cover rounded-lg"
              />
              <label className="absolute bottom-4 right-4 bg-gray-900 p-2 rounded-full cursor-pointer">
                <input
                  type="file"
                  name="coverImg"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-white text-xs">Change Cover</span>
              </label>
              <div className="absolute -bottom-16 left-4">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-gray-800 object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full cursor-pointer">
                  <input
                    type="file"
                    name="profileImg"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <span className="text-white text-xs">Change Profile</span>
                </label>
              </div>
            </div>
            <h3 className="font-bold text-xl text-white mb-4">Update Profile</h3>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input bg-gray-700 border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 flex-1"
                />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input bg-gray-700 border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 flex-1"
                />
              </div>
              <div className="flex gap-4">
                <textarea
                  placeholder="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="textarea bg-gray-700 border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 flex-1 h-24"
                />
                <input
                  type="text"
                  placeholder="Link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="input bg-gray-700 border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 flex-1"
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="input bg-gray-700 border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 flex-1"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="input bg-gray-700 border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 flex-1"
                />
              </div>
              <button
                type="submit"
                className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ${isUpdatingProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-400 transition"
              onClick={() => setIsModalOpen(false)}
            >
              &#x2715;
            </button>
          </div>
        </dialog>
      )}

      {/* Toast container */}
      <Toaster />
    </>
  );
};

export default EditProfileModal;
