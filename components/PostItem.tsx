import Image from 'next/image';

interface PostItemProps {
  imageSrc: string;
}

const PostItem: React.FC<PostItemProps> = ({ imageSrc }) => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div>
        <p className="text-xs text-gray-500 mb-1 mt-4">19 Jan 2022</p>
        <h3 className="text-lg font-semibold text-[#0B0063] leading-6">
          Case study: The search for work happiness web experience
        </h3>
      </div>
      
      <div className="flex-shrink-0 w-30 h-30 relative">
        <Image
          src={imageSrc}
          alt="Post image"
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>

    </div>
  );
};

export default PostItem;
