import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface CommentProps {
	id: string;
	content: string;
	OnDeleteComment: (comment: string) => void;
}

export const Comment = ({ id, content, OnDeleteComment }: CommentProps) => {
	const [likes, setLikes] = useState(0);

	const date = new Date();

	const publishedDateRelativeToNow = formatDistanceToNow(date, {
		locale: ptBR,
		addSuffix: true,
	});

	return (
		<div className={styles.comment}>
			<Avatar hasBorder={false} imageUrl="https://github.com/yan-arcanjo.png" />

			<div className={styles.commentBox}>
				<div className={styles.commentContent}>
					<header>
						<div className={styles.authorAndTime}>
							<strong>Yan Arcanjo</strong>
							<time title="11 de maio às 08:13" dateTime="2022-05-11 08:13:30">
								{publishedDateRelativeToNow}
							</time>
						</div>

						<button
							onClick={() => {
								OnDeleteComment(id);
							}}
							title="Deletar comentário">
							<Trash size={24} />
						</button>
					</header>
					<p>{content}</p>
				</div>

				<footer>
					<button
						onClick={() => {
							setLikes(likes + 1);
						}}>
						<ThumbsUp />
						Aplaudir <span>{likes}</span>
					</button>
				</footer>
			</div>
		</div>
	);
};
