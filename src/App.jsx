import { useState } from 'react';
import { useRequestTodos } from './hooks/use-request-todos';
import appStyles from './App.module.css';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';

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
					<AddTodoForm
						requestAddTodo={requestAddTodo}
						newTodo={newTodo}
						setNewTodo={setNewTodo}
					/>
				</>
			)}
		</div>
	);
};
