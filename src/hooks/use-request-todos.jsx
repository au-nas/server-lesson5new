import { useState, useEffect } from 'react';

export const useRequestTodos = ({ cancelEdit }) => {
	const [todos, setTodos] = useState([]); // все дела
	const [isLoading, setIsLoading] = useState(false); // лоадер

	// GET загружаем тудус с json-server при загрузке страницы
	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3003/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				console.log('Дела загружены, ответ сервера:', loadedTodos);
				setTodos(loadedTodos);
			})
			.catch((error) => console.log('Ошибка загрузки:', error))
			.finally(() => setIsLoading(false));
	}, []);

	// POST создаем тудус
	const requestAddTodo = (newTodo) => {
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
				console.log('Дело изменено, ответ сервера:', editedTodo);
				setTodos((prevTodos) =>
					prevTodos.map((todo) => (todo.id === id ? editedTodo : todo)),
				);
				cancelEdit(); // очищает инпут и выходит из редактирования
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

	return {
		todos,
		isLoading,
		requestAddTodo,
		requestEditTodo,
		requestDeleteTodo,
	};
};
