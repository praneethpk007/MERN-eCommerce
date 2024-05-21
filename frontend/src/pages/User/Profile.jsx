import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { set } from "mongoose";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {userInfo} = useSelector(state => state.auth)

  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()
    
  useEffect(() => {
    setUserName(userInfo.username)
    setEmail(userInfo.email)
  }, [userInfo.username, userInfo.email])

  const dispatch = useDispatch();

  const submitHandler = async(e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else{
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password
        }).unwrap();
        dispatch(setCredentials({...res}));
        toast.success("Profile updated successfully")
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input 
                type="text" 
                className="form-input p-4 rounded-sm w-full" 
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <input 
                type="text" 
                className="form-input p-4 rounded-sm w-full" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input 
                type="password" 
                className="form-input p-4 rounded-sm w-full" 
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input 
                type="password" 
                className="form-input p-4 rounded-sm w-full" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
                Update
              </button>

              <Link 
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>

        {loadingUpdateProfile && <Loader/>}
      </div>
    </div>
  )
}

export default Profile;