import { GetServerSideProps } from "next";
import Image from "next/image";
import { BeeHiveType, NextPageLayout } from "./_app";
import styles from "@/styles/pages/Home.module.css";
import BeeHive from "@/components/home/bee_hive";

import hive_dimension from "@/data/hive_dimension.json";
import bees_list from "@/data/bees_list.json";
import bees_rarity from "@/data/bees_rarity.json";

const Home: NextPageLayout = () => {

	const hive_height       = hive_dimension.hive_width * (Math.sqrt(3) / 2);
	const hive_width_total  = (hive_dimension.hive_columns - 1) * (hive_dimension.hive_width * (3/4) + hive_dimension.hive_gap * (Math.sqrt(3) / 2)) + hive_dimension.hive_width;
	const hive_height_total = (hive_dimension.hive_rows + 0.5) * (hive_height + hive_dimension.hive_gap) - hive_dimension.hive_gap;

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
			<div className={styles.body}>
				<div className={styles.body_grid}>
					<div className={styles.hive}>
						<h3>Bee Swarm Hive Build</h3>
						<svg viewBox={`0 0 ${hive_width_total} ${hive_height_total}`}>
							{new Array(hive_dimension.hive_columns * hive_dimension.hive_rows).fill(0).map((hive_value, hive_index) => {
								const hive_column = hive_index % hive_dimension.hive_columns;
								const hive_row    = Math.floor(hive_index / hive_dimension.hive_columns);
								const hive_x      = hive_column * (hive_dimension.hive_width * (3/4) + hive_dimension.hive_gap * (Math.sqrt(3) / 2));
								const hive_y      = (hive_dimension.hive_rows - hive_row - 1) * (hive_height + hive_dimension.hive_gap) + (hive_column % 2 === 0 ? (hive_dimension.hive_gap + hive_height) / 2 : 0);
								return (<BeeHive hive_type={BeeHiveType.HIVE_CLASSIC} hive_width={100} coordinate_x={hive_x} coordinate_y={hive_y} key={hive_index} />);
							})}
						</svg>
					</div>
					<div className={styles.hive_stats}>
						Stats
					</div>
					<div className={styles.hive_credits}>
						Credits
					</div>
				</div>
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