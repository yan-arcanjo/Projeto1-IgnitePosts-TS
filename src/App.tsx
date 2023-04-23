// JSX = Javascript + XML
import { Header } from "./components/Header";
import styles from "./App.module.css";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import { Modal } from "./components/Modal";
import { useState } from "react";

// author: {avatar_url: "", name: "", role: ""}
// publishedAt: Date
// Content: String

const posts = [
	{
		id: 1,
		author: {
			avatarUrl: "https://github.com/yan-arcanjo.png",
			name: "Yan Arcanjo",
			role: "Web Developer",
		},
		content: [
			{
				type: "paragraph",
				content: "Fala galeraa 👋",
			},
			{
				type: "paragraph",
				content:
					"Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
			},
			{
				type: "link",
				content: "jane.design/doctorcare",
			},
		],
		publishedAt: new Date("2023-04-20 20:00:00"),
	},
	{
		id: 2,
		author: {
			avatarUrl: "https://github.com/yanarcanjo.png",
			name: "Lucas Franca",
			role: "UX Developer",
		},
		content: [
			{
				type: "paragraph",
				content: "Iae Pessoal",
			},
			{
				type: "paragraph",
				content: "Mais um projeto finalizado e publicado no GitHub 🚀",
			},
			{
				type: "link",
				content: "jane.design/doctorcare",
			},
		],
		publishedAt: new Date("2023-04-21 10:00:00"),
	},
];

interface Comment {
	id: string;
	content: string;
}

interface DeleteComment {
	comments: Comment[] | null;
	setComments: ((comments: Comment[]) => void) | null;
	comment: string | null;
}

const body = document.querySelector("body");

function App() {
	const [modalOn, setModalOn] = useState(false);
	const [modalDeleteComment, setModalDeleteComment] = useState<DeleteComment>({
		comments: null,
		comment: null,
		setComments: null,
	});

	function deleteComment(
		comments: Comment[],
		setComments: (comments: Comment[]) => void,
		comment: string
	) {
		setModalDeleteComment({
			comments: comments,
			setComments: setComments,
			comment: comment,
		});
	}

	if (modalOn && body != null) {
		body.style.overflow = "hidden";
	} else if (modalOn == false && body != null) {
		body.style.overflow = "auto";
	}

	return (
		<div>
			{modalOn ? (
				<Modal setModal={setModalOn} deleteComment={modalDeleteComment} />
			) : null}
			<Header />
			<div className={styles.wrapper}>
				<Sidebar />
				<main>
					{posts.map((post) => {
						return (
							<Post
								key={post.id}
								author={post.author}
								content={post.content}
								publishedAt={post.publishedAt}
								turnOnModal={setModalOn}
								deleteComment={deleteComment}
							/>
						);
					})}
				</main>
			</div>
		</div>
	);
}

export default App;
