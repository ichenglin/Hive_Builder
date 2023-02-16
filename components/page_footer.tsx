import type { NextPageLayout } from "../pages/_app";
import styles from "@/styles/components/Footer.module.css";

const PageFooter: NextPageLayout = () => {
	return (
		<footer className={styles.footer}></footer>
	);
};

export default PageFooter;