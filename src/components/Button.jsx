import styles from './Button.module.css';

export const Button = ({ text, onClick, className }) => {
	return (
		<button onClick={onClick} className={`${styles.button} ${className}`}>
			{text}
		</button>
	);
};
// export const Button = (props) => {
// 	return (
// 		<button onClick={props.onClick} className={props.className}>{props.text}</button>
// 	);
// };
