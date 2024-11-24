// import React from "react";
// import ErrorMessages from "../../constans/ErrorMessaage";

// const PostDelete = ({ postId, setMessage }) => {
//   const handleDeleteClick = async () => {
//     try {
//       const response = await fetch(
//         `https://jsonplaceholder.typicode.com/posts/${postId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         setMessage(ErrorMessages.Success_Deleting);
//       } else {
//         setMessage(ErrorMessages.Failed_Deleting);
//       }
//     } catch (error) {
//       setMessage(ErrorMessages.Error_Deleting);
//     }
//   };

//   return <button onClick={handleDeleteClick}>Delete</button>;
// };

// export default PostDelete;
