import { useState } from 'react';
import { Button } from '../Button/Button';
import buttonStyles from '../Button/Button.module.css';
import styles from './AddTodoForm.module.css';

export const AddTodoForm = ({ requestAddTodo }) => {
	const [newTodo, setNewTodo] = useState(''); // текст нового дела

	const handleSubmit = (e) => {
		e.preventDefault();
		requestAddTodo(newTodo);
		setNewTodo('');
	};

	return (
		/* форма */
		<form onSubmit={handleSubmit} className={styles.form} id="addTodoForm">
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
