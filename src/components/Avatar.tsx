import styles from "./Avatar.module.css";
import { ImgHTMLAttributes } from "react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
	hasBorder?: boolean;
	imageUrl: string;
	alt?: string;
}

export const Avatar = ({ imageUrl, hasBorder = true }: AvatarProps) => {
	return (
		<img
			className={hasBorder ? styles.avatar : styles.avatarWithoutBorder}
			src={imageUrl}
			alt="profile picture"
		/>
	);
};
