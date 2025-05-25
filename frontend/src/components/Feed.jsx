import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0)
    return (
      <div className="flex flex-col items-center justify-center h-50 w-2/4 mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white border border-gray-700 rounded-lg shadow-md p-6 my-10">
        <div className="text-4xl mb-4">Oops!😕</div>
        <h1 className="text-xl font-semibold mb-2">No New Users Found!</h1>
        <p className="text-sm text-gray-300 text-center m-5">
          Looks like you’ve reached the end of the list. Check back later for more profiles!
        </p>
      </div>
    );

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
