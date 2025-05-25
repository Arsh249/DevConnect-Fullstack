import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-48 w-2/4 mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white border border-gray-700 rounded-lg shadow-md p-6 my-8">
        <div className="text-3xl mb-2">No Connections Found!🔗</div>
        <h1 className="text-lg font-semibold mb-1">You haven’t connected with anyone yet.</h1>
        <p className="text-sm text-gray-300 text-center m-5">
          Start exploring profiles and make your first connection!
        </p>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl m-10">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto items-center"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="ml-auto"> 
              <Link to={"/chat/" + _id}>
                <button className="btn btn-primary">Chat</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
