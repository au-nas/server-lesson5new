import { useEffect, useState } from 'react';
import { Button } from './components/Button';
import buttonStyles from './components/Button.module.css';
import appStyles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]); // все дела
	const [isLoading, setIsLoading] = useState(false); // лоадер
	const [newTodo, setNewTodo] = useState(''); // текст нового дела

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
			});
	};

//PUT


//DELETE

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
						<ul>
							{todos.map((todo) => (
								<li key={todo.id}>{todo.title}</li>
							))}
						</ul>
					)}
					{/* форма */}
					<form onSubmit={requestAddTodo} className={appStyles.form}>
						<input
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							placeholder="Введите задачу"
						></input>
						<Button type="submit" text="Добавить" className={buttonStyles.add} />
					</form>
				</>
			)}
		</div>
	);
};
