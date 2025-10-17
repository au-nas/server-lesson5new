import styles from './Input.module.css';

export const Input = ({ id, name, value, onChange, placeholder, type = 'text' }) => {
	return (
		<input
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			type={type}
			className={styles.input}
		/>
	);
};
