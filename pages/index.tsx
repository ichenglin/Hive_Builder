import { GetServerSideProps } from "next";
import Image from "next/image";
import type { NextPageLayout } from "./_app";
import styles from "@/styles/pages/Home.module.css";

import bees_list from "@/data/bees_list.json";
import bees_rarity from "@/data/bees_rarity.json";

const Home: NextPageLayout = () => {

	return (
		<section className={styles.builder}>
			<div className={styles.sidebar}>

			</div>
			<div className={`${styles.toolkit} ${styles.scrollable}`}>
				{bees_list.map((bee_data, bee_index) => (
					<div className={styles.bee_card} style={{"--rarity_color": `${(bees_rarity as any)[bee_data.rarity].color.hive}`} as any} key={bee_index}>
						<Image src={bee_data.images.skin.path} alt={bee_data.name} width={bee_data.images.skin.width} height={bee_data.images.skin.height}/>
						<h5>{bee_data.name}</h5>
						<p>{bee_data.description}</p>
					</div>
				))}
			</div>
			<div className={styles.hive}>

			</div>
			<div className={`${styles.terminal} ${styles.scrollable}`}>

			</div>
		</section>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {props: {
		page_name:        "Hive Builder",
		page_description: "The home page"
	}};
}

export default Home;