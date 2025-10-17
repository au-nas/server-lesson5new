import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({
	todos,
	editingIdTodo,
	editingInputTextTodo,
	setEditingInputTextTodo,
	requestEditTodo,
	cancelEdit,
	startEdit,
	requestDeleteTodo,
}) => {
	if (todos.length === 0) {
		return <p>Пока нет задач</p>;
	}

	return (
		<ul className={styles.list}>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					editingIdTodo={editingIdTodo}
					editingInputTextTodo={editingInputTextTodo}
					setEditingInputTextTodo={setEditingInputTextTodo}
					requestEditTodo={requestEditTodo}
					cancelEdit={cancelEdit}
					startEdit={startEdit}
					requestDeleteTodo={requestDeleteTodo}
				/>
			))}
		</ul>
	);
};
