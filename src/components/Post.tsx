import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { FormEvent, useState, ChangeEvent, InvalidEvent } from "react";

// author: {avatar_url: "", name: "", role: ""}
// publishedAt: Date
// Content: String

interface Author {
	avatarUrl: string;
	name: string;
	role: string;
}

interface Content {
	type: string;
	content: string;
}

interface Comment {
	id: string;
	content: string;
}

interface PostProps {
	author: Author;
	publishedAt: Date;
	content: Content[];
	turnOnModal: (a: boolean) => void;
	deleteComment: (
		comments: Comment[],
		setComments: (comments: Comment[]) => void,
		comment: string
	) => void;
}

export const Post = ({
	author,
	publishedAt,
	content,
	turnOnModal,
	deleteComment,
}: PostProps) => {
	const [comments, setComments] = useState<Comment[]>([]);

	const [newComment, setNewComment] = useState("");

	const handleCreateNewComment = (event: FormEvent) => {
		event.preventDefault();
		const newItem = {
			id: Math.floor(Date.now() * Math.random()).toString(36),
			content: newComment,
		};
		setComments([...comments, newItem]);
		setNewComment("");
	};

	const setNewCommentText = (event: ChangeEvent<HTMLTextAreaElement>) => {
		event.target.setCustomValidity("");
		setNewComment(event.target.value);
	};

	const handleDeleteComment = (comment: string) => {
		turnOnModal(true);
		deleteComment(comments, setComments, comment);
	};

	const handleNewCommentInvalid = (
		event: InvalidEvent<HTMLTextAreaElement>
	) => {
		event.target.setCustomValidity("Esse campo é obrigatório.");
	};

	const publishedDateFormatted = format(
		publishedAt,
		"d 'de' LLLL 'às' HH:mm'h'",
		{
			locale: ptBR,
		}
	);

	const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true,
	});

	return (
		<>
			<article className={styles.post}>
				<header>
					<div className={styles.author}>
						<Avatar imageUrl={author.avatarUrl} />
						<div className={styles.authorInfo}>
							<strong>{author.name}</strong>
							<span>{author.role}</span>
						</div>
					</div>

					<time
						title={publishedDateFormatted}
						dateTime={publishedAt.toISOString()}>
						{publishedDateRelativeToNow}
					</time>
				</header>

				<div className={styles.content}>
					{content.map((line) => {
						if (line.type === "paragraph") {
							return <p key={line.content}>{line.content}</p>;
						} else if (line.type === "link") {
							return (
								<p key={line.content}>
									<a href="#">{line.content}</a>
								</p>
							);
						}
					})}
				</div>

				<form onSubmit={handleCreateNewComment} className={styles.commentForm}>
					<strong>Deixe seu feedback</strong>
					<textarea
						required
						onInvalid={handleNewCommentInvalid}
						name="comment"
						placeholder="Deixe um comentário"
						onChange={setNewCommentText}
						value={newComment}
					/>

					<footer>
						<button disabled={newComment.length === 0} type="submit">
							Publicar
						</button>
					</footer>
				</form>

				<div className={styles.commentList}>
					{comments.map((comment) => {
						return (
							<Comment
								key={Math.floor(Date.now() * Math.random()).toString(36)}
								content={comment.content}
								id={comment.id}
								OnDeleteComment={handleDeleteComment}
							/>
						);
					})}
				</div>
			</article>
		</>
	);
};
