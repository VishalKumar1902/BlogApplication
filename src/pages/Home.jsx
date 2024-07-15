import React, { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db, auth } from "../Firebase-config";

const Home = ({ isAuth }) => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
    getPosts();
  }, []); // Dependency array to run the effect only once

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    // Update the state to remove the deleted post from the list
    setPostLists(postLists.filter((post) => post.id !== id));
  };
  return (
    <div className="homePage">
      {postLists.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="deletePost">
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button onClick={() => deletePost(post.id)}>
                  {"\u{1F5D1}"}
                </button>
              )}
            </div>
          </div>
          <div className="postTextContainer">{post.postText}</div>
          <h3>@{post.author.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Home;
