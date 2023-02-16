import type { NextPageLayout } from "../pages/_app";
import styles from "@/styles/components/Header.module.css";

import { Audiowide, Inter } from "@next/font/google";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const font_audiowide = Audiowide({weight: "400"});
const font_inter     = Inter({subsets: ["latin"]});

const PageHeader: NextPageLayout = () => {
	return (
		<header className={`${styles.header} ${font_audiowide.className}`}>
			<div className={styles.icon}>
				<h1>Hive Builder</h1>
			</div>
			<div className={styles.credit}>
				<p>made with </p>
				<FontAwesomeIcon icon={faHeart} width="10" height="10"/>
				<p> by RuntimeCloud.com</p>
			</div>
			<a className={`${styles.contact} ${font_inter.className}`} href="https://github.com/ichenglin">
				<FontAwesomeIcon icon={faGithub} width="12" height="12"/>
				<span>Icheng Lin's Github</span>
			</a>
		</header>
	);
};

export default PageHeader;