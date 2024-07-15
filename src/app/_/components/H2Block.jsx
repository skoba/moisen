import styles from './H2Block.module.scss';

export default function H2Block(props) {
  const {
    children,
    heading,
    className, // Added
  } = props;

  return (<>
    <div className={`${styles.h2_block} ${className}`}> {/* Added className */}
      <h2>{heading}</h2>
      <div>{children}</div>
    </div>
  </>);
};