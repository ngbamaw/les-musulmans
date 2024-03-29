import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

interface AvatarProps {
  name: string;
  picture: any;
}

const Avatar: React.FC<AvatarProps> = ({ name, picture }) => {
  return (
    <div className="flex items-center">
      <GatsbyImage
        image={picture.gatsbyImageData}
        className="w-12 h-12 rounded-full mr-4"
        alt={`Photo of ${name}`}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}

export default Avatar;