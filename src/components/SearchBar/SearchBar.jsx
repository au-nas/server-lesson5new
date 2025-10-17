import { Button } from '../Button/Button';
import buttonStyles from '../Button/Button.module.css';
import styles from './SearchBar.module.css';

export const SearchBar = ({ search, setSearch, isSorted, setIsSorted }) => {
	return (
		<div className={styles.searchContainer}>
			<input
				type="text"
				placeholder="Поиск..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className={styles.input}
			/>
			<Button
				onClick={() => setIsSorted(!isSorted)}
				className={buttonStyles.cancel}
				text={isSorted ? 'По порядку' : 'Сортировать по алфавиту'}
			/>
		</div>
	);
};
