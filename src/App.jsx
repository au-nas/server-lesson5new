import { useState } from 'react';
import { Button } from './components/Button/Button';
import { useRequestTodos } from './hooks/use-request-todos';
import buttonStyles from './components/Button/Button.module.css';
import appStyles from './App.module.css';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
	const [newTodo, setNewTodo] = useState(''); // текст нового дела

	const [editingIdTodo, setEditingIdTodo] = useState(null); //id дела которое редактируем
	const [editingInputTextTodo, setEditingInputTextTodo] = useState(''); // текст который редактируем

	const startEdit = (todo) => {
		setEditingIdTodo(todo.id);
		setEditingInputTextTodo(todo.text);
	};
	const cancelEdit = () => {
		setEditingIdTodo(null);
		setEditingInputTextTodo('');
	};

	const { todos, isLoading, requestAddTodo, requestEditTodo, requestDeleteTodo } =
		useRequestTodos({ newTodo, setNewTodo, cancelEdit });

	return (
		<div className={appStyles.container}>
			<h1>Список дел</h1>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<>
					<TodoList
						todos={todos}
						editingIdTodo={editingIdTodo}
						editingInputTextTodo={editingInputTextTodo}
						setEditingInputTextTodo={setEditingInputTextTodo}
						requestEditTodo={requestEditTodo}
						cancelEdit={cancelEdit}
						startEdit={startEdit}
						requestDeleteTodo={requestDeleteTodo}
					/>
					{/* форма */}
					<form
						onSubmit={requestAddTodo}
						className={appStyles.form}
						id="addTodoForm"
					>
						<input
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							placeholder="Введите задачу"
							className={appStyles.input}
						></input>
						<Button
							type="submit"
							text="Добавить"
							className={buttonStyles.add}
						/>
					</form>
				</>
			)}
		</div>
	);
};
