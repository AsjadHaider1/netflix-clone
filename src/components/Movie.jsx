import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
const Movie = ({ item }) => {
  const [like, SetLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);
  const saveShow = async () => {
    if (user?.email) {
      SetLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please Login to save a movie");
    }
  };
  return (
    <div className="w-[160px] sm:w-[240px] lg:w-[280-px] inline-block cursor-pointer relative p-2 ">
      <img
        className="w-full h-auto block "
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 text-white hover:opacity-100 ">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center ">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-grey-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-grey-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;