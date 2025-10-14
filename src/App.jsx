import { useEffect, useState } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]); // все дела
	const [isLoading, setIsLoading] = useState(false); // лоадер
	const [newTodo, setNewTodo] = useState(''); // текст нового дела

	//загружаем тудус с json-server при загрузке страницы
	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3003/todos')
			.then((loadedData) => loadedData.json)
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.catch((error) => console.log('Ошибка загрузки:', error))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div>
			<h1>Список дел</h1>
			{isLoading ? <p>Загрузка...</p> : todos.map((todo, id) => (<div key={id}>{todo}</div>))}
		</div>
	);
};
