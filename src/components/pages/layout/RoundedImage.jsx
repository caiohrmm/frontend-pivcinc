import styles from "./RoundedImage.module.css";

const RoundedImage = ({ src, alt, width, className }) => {
  return <img className={`${styles.rounded_image} ${styles[width]} ${styles[className]}`} src={src} alt={alt}/>;
};

export default RoundedImage;