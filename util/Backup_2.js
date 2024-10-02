
// import express from "express";
// import cors from "cors";
// import { configDotenv } from "dotenv";

// import { Post } from "./model/post.model.js";
// import { responseHelper } from "./util/helper.js";
// import "express-async-errors"; // Automatically handles async errors
// import { connectToDatabase } from "./model/db.js";

// const app = express();
// configDotenv();

// // CORS Configuration
// const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173"; // Use environment variables for flexibility
// app.use(cors({ origin: allowedOrigin }));

// // Middleware
// app.use(express.json());

// connectToDatabase(); // Initiate database connection

// // Routes
// app.get("/", (req, res) => {
//   responseHelper(res, 200, true, "Welcome to HotPic.com", {});
// });

// // Create new Post
// app.post("/createPost", async (req, res) => {
//   const { title, content, author, category } = req.body;

//   // Validation
//   if (!title || !content) {
//     return responseHelper(
//       res,
//       400,
//       false,
//       "Title and content are required",
//       {}
//     );
//   }

//   try {
//     // Check if a post with the same title already exists
//     const existingPost = await Post.findOne({ title });
//     if (existingPost) {
//       return responseHelper(
//         res,
//         409,
//         false,
//         "A post with this title already exists",
//         {}
//       );
//     }

//     // Create and save new Post
//     const newPost = new Post({ title, content, author, category });
//     await newPost.save();
//     responseHelper(res, 201, true, "Post created successfully", {
//       post: newPost,
//     });
//   } catch (error) {
//     console.error("Error saving post:", error);
//     responseHelper(res, 500, false, "Internal Server Error", {
//       error: error.message,
//     });
//   }
// });

// // fetch category api

// app.get("/fetchCategory", async (req, res) => {
//   try {
//     // Assuming 'Post' has a 'category' field
//     const categories = await Post.distinct("category");

//     responseHelper(res, 202, true, "Categories fetched successfully", { data: categories });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     responseHelper(res, 500, false, "Internal Server Error", {
//       error: error.message,
//     });
//   }
// });


// app.get("/HindiVartraKatha", async (req, res) => {
//   try {
//     const data = [
//       {
//         title: "श्री सत्यनारायण व्रत कथा",
//         description:
//           "सत्यनारायण व्रत में सत्य और धर्म का पालन कर भगवान विष्णु की पूजा की जाती है। इससे जीवन में सुख-समृद्धि और शांति प्राप्त होती है।",
//       },
//       {
//         title: "करवा चौथ व्रत कथा",
//         description:
//           "यह व्रत विशेष रूप से सुहागिन महिलाएं अपने पति की लंबी उम्र और सुखमय जीवन के लिए करती हैं। करवा चौथ की कथा सुनने का विशेष महत्त्व है।",
//       },
//       {
//         title: "छठ पूजा व्रत कथा",
//         description:
//           "यह व्रत सूर्य भगवान को समर्पित होता है। इसमें विशेष प्रकार के प्रसाद और जल से सूर्य देवता की पूजा की जाती है।",
//       },
//       {
//         title: "सोमवार व्रत कथा",
//         description:
//           "सोमवार व्रत भगवान शिव को समर्पित होता है। इस व्रत को करने से इच्छाओं की पूर्ति होती है और जीवन में शांति आती है।",
//       },
//       {
//         title: "एकादशी व्रत कथा",
//         description:
//           "भगवान विष्णु को समर्पित एकादशी व्रत को धर्म और भक्ति का प्रतीक माना जाता है। इस व्रत से मोक्ष की प्राप्ति होती है।",
//       },
//       {
//         title: "महाशिवरात्रि व्रत कथा",
//         description:
//           "महाशिवरात्रि भगवान शिव की पूजा का प्रमुख त्योहार है। यह व्रत भगवान शिव की कृपा प्राप्त करने और जीवन में शक्ति पाने के लिए किया जाता है।",
//       },
//       {
//         title: "गणगौर व्रत कथा",
//         description:
//           "यह व्रत मुख्य रूप से राजस्थान में मनाया जाता है। इसमें महिलाएं अपने पति की लंबी आयु और सुखमय जीवन के लिए पूजा करती हैं।",
//       },
//       {
//         title: "सावित्री व्रत कथा",
//         description:
//           "सावित्री व्रत में स्त्रियां अपने पति की लंबी उम्र और उनकी सुरक्षा के लिए व्रत रखती हैं। सावित्री और सत्यवान की कथा इस व्रत से जुड़ी हुई है।",
//       },
//       {
//         title: "हरतालिका तीज व्रत कथा",
//         description:
//           "यह व्रत भगवान शिव और माता पार्वती की पूजा के लिए किया जाता है। इसमें विवाहित स्त्रियां अपने सुखद वैवाहिक जीवन की कामना करती हैं।",
//       },
//       {
//         title: "नवरात्रि व्रत कथा",
//         description:
//           "नवरात्रि देवी दुर्गा की उपासना के लिए किया जाने वाला व्रत है। इसमें नौ दिनों तक देवी के नौ रूपों की पूजा की जाती है।",
//       },
//     ];

//     responseHelper(res, 201, true, "Fetch data successfully", {
//       data: data,
//     });
//   } catch (error) {
//     console.log(error);
//     responseHelper(res, 500, false, "Error in the API", {
//       error: error.message,
//     });
//   }
// });

// app.get("/allPost", async (req, res) => {
//   try {
//     const data = await Post.find();

//     responseHelper(res, 200, true, "All data fetched successfully", {
//       data: data,
//     });
//   } catch (error) {
//     console.log(error);
//     responseHelper(res, 500, false, "Error in the API", {
//       error: error.message,
//     });
//   }
// });

// // Fetching the post from the id
// app.get("/SinglePost/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find the post by ID
//     let post = await Post.findById(id);

//     // Check if the post exists
//     if (!post) {
//       return responseHelper(res, 404, false, "Post not found", {});
//     }

//     // Increment the views by 3
//     post.views = (post.views || 0) + 1; // Ensure views is at least 0 before incrementing

//     // Save the updated post with the incremented views
//     await post.save();

//     responseHelper(
//       res,
//       200,
//       true,
//       "Post fetched and views incremented successfully",
//       { post }
//     );
//   } catch (error) {
//     console.log(error);
//     responseHelper(res, 500, false, "Error in fetching the post", {
//       error: error.message,
//     });
//   }
// });

// // Global error handler for async errors
// app.use((error, req, res, next) => {
//   console.error(error); // Log the error for debugging
//   responseHelper(res, 500, false, "Internal Server Error", {
//     error: error.message,
//   });
// });



// // Like a post
// app.post('/posts/:id/like', async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     // Increment the 'likes' count by 1
//     const post = await Post.findByIdAndUpdate(
//       id,
//       { $inc: { likes: 1 } },
//       { new: true } // Return the updated document
//     );

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     return res.json({ message: 'Post liked successfully', post });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal Server Error', error });
//   }
// });

// // Dislike a post
// app.post('/posts/:id/dislike', async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     // Increment the 'dislikes' count by 1
//     const post = await Post.findByIdAndUpdate(
//       id,
//       { $inc: { dislikes: 1 } },
//       { new: true } // Return the updated document
//     );

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     return res.json({ message: 'Post disliked successfully', post });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal Server Error', error });
//   }
// });



// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`API is running on port ${PORT}`);
// });