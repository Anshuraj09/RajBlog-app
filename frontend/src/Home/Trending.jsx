import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  // Define categories to filter
  const categories = ["Devotion", "Sports", "Coding", "Business", "Entertainment"];
  
  // Filter blogs by specified categories
  const filteredBlogs = blogs?.filter((blog) => categories.includes(blog.category));

  // Carousel responsiveness configuration
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>
      <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
        {filteredBlogs && filteredBlogs.length > 0 ? (
          filteredBlogs.map((element) => (
            <div
              key={element._id}
              className="p-4 bg-white border border-gray-400 rounded-lg shadow-md mx-2"
            >
              <Link to={`/blog/${element._id}`}>
                <div className="relative">
                  <img
                    src={element.blogImage.url}
                    alt={element.title || "Blog image"}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {element.category}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-b-lg h-36 flex flex-col justify-between">
                  <h1
                    className="text-lg font-bold mb-2 overflow-hidden text-ellipsis"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {element.title}
                  </h1>
                  <div className="flex items-center">
                    <img
                      src={element.adminPhoto}
                      alt={element.adminName || "Author"}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="ml-3 text-gray-400 text-sm">
                      {element.adminName}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex h-screen items-center justify-center">
            <p>No blogs available at the moment.</p>
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
