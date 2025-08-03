import React from 'react';
import Comment from './Comment';

const CommentsSection = () => {
  const comments = [
    {
      id: 1,
      author: "Olivia Rhye",
      avatar: "/lovable-uploads/c62b8eb8-848d-4a3e-b8b1-24a5548db402.png",
      date: "le 29 Oct 2022 8:59",
      content: "Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at."
    },
    {
      id: 2,
      author: "Olivia Rhye",
      avatar: "/lovable-uploads/c62b8eb8-848d-4a3e-b8b1-24a5548db402.png",
      date: "le 29 Oct 2022 8:59",
      content: "Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at."
    }
  ];

  return (
    <div className="mt-8 sm:mt-12">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-6 sm:mb-8">
        {comments.length} Commentaires
      </h2>
      
      <div className="space-y-4 sm:space-y-6">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            author={comment.author}
            avatar={comment.avatar}
            date={comment.date}
            content={comment.content}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;