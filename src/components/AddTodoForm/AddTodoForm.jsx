import { Button } from '../Button/Button';
import buttonStyles from '../Button/Button.module.css';
import styles from './AddTodoForm.module.css';

export const AddTodoForm = ({ requestAddTodo, newTodo, setNewTodo }) => {
	return (
		/* форма */
		<form onSubmit={requestAddTodo} className={styles.form} id="addTodoForm">
			<input
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				placeholder="Введите задачу"
				className={styles.input}
			/>
			<Button type="submit" text="Добавить" className={buttonStyles.add} />
		</form>
	);
};
