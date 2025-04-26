import React from "react";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

const Cards = ({ blogs, loading }) => {
  return (
    <div className="grid lg:grid-cols-3  gap-x-10">
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        : blogs.map((blog) => (
            <div key={blog._id}>
              <Card
                blogId={blog._id}
                description={blog.description}
                title={blog.title}
                slug={blog.slug}
                tag={blog.tags}
                image={blog.image}
                content={blog.content}
                publishedAt={blog.publishedAt}
                thumbnail={blog.thumbnail}
              />
            </div>
          ))}
    </div>
  );
};

export default Cards;
