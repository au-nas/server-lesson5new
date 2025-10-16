import styles from './TodoItem.module.css';
import buttonStyles from '../Button/Button.module.css';
import { Button } from '../Button/Button';

export const TodoItem = ({
	todo,
	editingIdTodo,
	editingInputTextTodo,
	setEditingInputTextTodo,
	requestEditTodo,
	cancelEdit,
	startEdit,
	requestDeleteTodo,
}) => {
	const isEditing = editingIdTodo === todo.id;

	return (
		<li key={todo.id} className={styles.item}>
			{/* {editingIdTodo === todo.id && console.log('Editing id:', todo.id)} */}
			{isEditing ? (
				<>
					<input
						id={`edit-todo-${todo.id}`} // уникальный айди
						name={`edit-todo-${todo.id}`}
						value={editingInputTextTodo}
						onChange={(e) => setEditingInputTextTodo(e.target.value)}
					></input>
					<Button
						onClick={() => requestEditTodo(todo.id, editingInputTextTodo)}
						className={buttonStyles.save}
						text="Сохранить"
					/>
					<Button
						onClick={() => cancelEdit()}
						className={buttonStyles.cancel}
						text="Отмена"
					/>
				</>
			) : (
				<>
					{todo.text}
					<Button
						onClick={() => startEdit(todo)}
						className={buttonStyles.edit}
						text="Изменить"
					/>
					<Button
						onClick={() => requestDeleteTodo(todo.id)}
						className={buttonStyles.delete}
						text="Удалить"
					/>
				</>
			)}
		</li>
	);
};
