import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CommentProps {
  author: string;
  avatar: string;
  date: string;
  content: string;
}

const Comment = ({ author, avatar, date, content }: CommentProps) => {
  return (
    <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
      <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
        <AvatarImage src={avatar} alt={author} />
        <AvatarFallback className="bg-yellow-400 text-black font-semibold text-sm sm:text-base">
          {author.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{author}</h4>
          <span className="text-xs sm:text-sm text-gray-500">{date}</span>
        </div>
        
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Comment;