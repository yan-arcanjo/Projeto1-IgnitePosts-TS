import styles from "./Modal.module.css";

interface Comment {
	id: string;
	content: string;
}

interface DeleteComments {
	comments: Comment[] | null;
	comment: string | null;
	setComments: ((comments: Comment[]) => void) | null;
}

interface ModalProps {
	setModal: (state: boolean) => void;
	deleteComment: DeleteComments;
}

export const Modal = ({ setModal, deleteComment }: ModalProps) => {
	return (
		<div className={styles.modalReset}>
			<div className={styles.modalContent}>
				<h3>Excluir comentário</h3>
				<h4>Você tem certeza que gostaria de excluir este comentário?</h4>
				<div className={styles.modalBtn}>
					<button
						onClick={() => {
							setModal(false);
						}}
						className={styles.btnCancel}>
						Cancelar
					</button>
					<button
						onClick={() => {
							if (
								deleteComment.comments != null &&
								deleteComment.setComments != null
							) {
								deleteComment.setComments(
									deleteComment.comments.filter(
										(c) => c.id != deleteComment.comment
									)
								);
							}
							setModal(false);
						}}
						className={styles.btnConfirm}>
						Sim, excluir
					</button>
				</div>
			</div>
		</div>
	);
};
