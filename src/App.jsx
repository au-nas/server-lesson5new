import { useState } from 'react';
import { useRequestTodos } from './hooks/use-request-todos';
import appStyles from './App.module.css';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';

export const App = () => {
	const [editingIdTodo, setEditingIdTodo] = useState(null); //id дела которое редактируем
	const [editingInputTextTodo, setEditingInputTextTodo] = useState(''); // текст который редактируем

	// const [search, setSearch] = useState('');
	// const [isSorted, setIsSorted] = useState(false);

	const startEdit = (todo) => {
		setEditingIdTodo(todo.id);
		setEditingInputTextTodo(todo.text);
	};
	const cancelEdit = () => {
		setEditingIdTodo(null);
		setEditingInputTextTodo('');
	};

	const { todos, isLoading, requestAddTodo, requestEditTodo, requestDeleteTodo } =
		useRequestTodos({ cancelEdit });

	// let filteredTodos = todos.filter((todo) =>
	// 	todo.title.toLowerCase().includes(search.toLowerCase()),
	// );

	// if (isSorted) {
	// 	filteredTodos = [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title));
	// }

	return (
		<div className={appStyles.container}>
			<h1>Список дел</h1>
			<AddTodoForm requestAddTodo={requestAddTodo} />
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<>
					<TodoList
						// filteredTodos={filteredTodos}
						todos={todos}
						editingIdTodo={editingIdTodo}
						editingInputTextTodo={editingInputTextTodo}
						setEditingInputTextTodo={setEditingInputTextTodo}
						requestEditTodo={requestEditTodo}
						cancelEdit={cancelEdit}
						startEdit={startEdit}
						requestDeleteTodo={requestDeleteTodo}
					/>
				</>
			)}
		</div>
	);
};
