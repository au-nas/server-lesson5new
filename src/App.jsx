import { useEffect, useState } from 'react';
import { Button } from './components/Button';
import buttonStyles from './components/Button.module.css';
import appStyles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]); // все дела
	const [isLoading, setIsLoading] = useState(false); // лоадер
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

	// GET загружаем тудус с json-server при загрузке страницы
	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3003/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.catch((error) => console.log('Ошибка загрузки:', error))
			.finally(() => setIsLoading(false));
	}, []);

	// POST создаем тудус
	const requestAddTodo = (e) => {
		e.preventDefault();

		const title = newTodo.trim();
		if (!title) return; // прекращаем выполнение если пустая строка

		fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				text: title,
				completed: false,
			}),
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Дело добавлено, ответ сервера:', responce);
				setTodos((prevTodos) => [...prevTodos, responce]); // добавляем задачу
				setNewTodo('');
			})
			.catch((error) => console.log('Ошибка', error));
	};

	//PUT
	const requestEditTodo = (id, title) => {
		const newTitle = title.trim();

		fetch(`http://localhost:3003/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ text: newTitle }),
		})
			.then((responce) => responce.json())
			.then((editedTodo) => {
				setTodos((prevTodos) =>
					prevTodos.map((todo) => (todo.id === id ? editedTodo : todo)),
				);
				setNewTodo(''); // очищаем инпут
				cancelEdit();
			})
			.catch((err) => console.log('Ошибка', err));
	};

	//DELETE

	const requestDeleteTodo = (id) => {
		fetch(`http://localhost:3003/todos/${id}`, {
			method: 'DELETE',
		})
			// .then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Дело удалено, ответ сервера:', responce);
				setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
			})
			.catch((err) => console.log('Ошибка', err));
	};

	return (
		<div>
			<h1>Список дел</h1>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<>
					{todos.length === 0 ? (
						<p>Пока нет задач</p>
					) : (
						<ul className={appStyles.list}>
							{todos.map((todo) => (
								<li key={todo.id} className={appStyles.item}>
									{/* {editingIdTodo === todo.id && console.log('Editing id:', todo.id)} */}
									{editingIdTodo === todo.id ? (
										<>
											<input
												id={`edit-todo-${todo.id}`} // уникальный айди
												name={`edit-todo-${todo.id}`}
												value={editingInputTextTodo}
												onChange={(e) =>
													setEditingInputTextTodo(
														e.target.value,
													)
												}
											></input>
											<Button
												onClick={() =>
													requestEditTodo(
														todo.id,
														editingInputTextTodo,
													)
												}
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
							))}
						</ul>
					)}
					{/* форма */}
					<form onSubmit={requestAddTodo} className={appStyles.form} id="addTodoForm">
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
