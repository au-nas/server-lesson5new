import { useState } from 'react';
import { Button } from './components/Button';
import { useRequestTodos } from './hooks/use-request-todos';
import buttonStyles from './components/Button.module.css';
import appStyles from './App.module.css';

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
