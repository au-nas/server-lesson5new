import { useState } from 'react';
import { useRequestTodos } from './hooks/use-request-todos';
import appStyles from './App.module.css';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { SearchBar } from './components/SearchBar/SearchBar';

export const App = () => {
	const [editingIdTodo, setEditingIdTodo] = useState(null); //id дела которое редактируем
	const [editingInputTextTodo, setEditingInputTextTodo] = useState(''); // текст который редактируем

	const [search, setSearch] = useState(''); //текст который вводим для поиска
	const [isSorted, setIsSorted] = useState(false);

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

		//фильтрация
	let filteredTodos = todos.filter((todo) =>
		todo.text.toLowerCase().includes(search.toLowerCase()),
	); // оставляем только задачи где todo.text содержит введённый текст search

	//сортировка если включена true
	if (isSorted) {
		filteredTodos = [...filteredTodos].sort((a, b) => a.text.localeCompare(b.text));
	}

	return (
		<div className={appStyles.container}>
			<h1>Список дел</h1>
			<AddTodoForm requestAddTodo={requestAddTodo} />
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<>
				<SearchBar search={search} setSearch={setSearch} isSorted={isSorted} setIsSorted={setIsSorted}/>
					<TodoList
						todos={filteredTodos}
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
