import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { NextPageLayout } from "./_app";
import styles from "@/styles/pages/Home.module.css";
import BeeHive from "@/components/home/bee_hive";

import { Sono } from "@next/font/google";

import hive_dimension from "@/data/hive_dimension.json";
import bees_list from "@/data/bees_list.json";
import bees_rarity from "@/data/bees_rarity.json";

const font_sono = Sono({subsets: ["latin"], variable: "--font-sono"});

const Home: NextPageLayout = () => {

	const [hive_slots, set_hive_slots] = useState({data: new Array(hive_dimension.hive_columns * hive_dimension.hive_rows).fill(undefined).map((none, hive_index) => ({hive_id: hive_index} as HiveSlot)), updated: Date.now()});
	const [bee_drag,  set_bee_drag]    = useState({bee_dragged: undefined} as {bee_dragged: string | undefined});

	useEffect(() => {
		const hive_bees_saved = localStorage.getItem("hive_bees");
		if (hive_bees_saved === null) return;
		set_hive_slots({data: JSON.parse(hive_bees_saved), updated: Date.now()});
	}, []);

	const hive_height       = hive_dimension.hive_width * (Math.sqrt(3) / 2);
	const hive_width_total  = (hive_dimension.hive_columns - 1) * (hive_dimension.hive_width * (3/4) + hive_dimension.hive_gap * (Math.sqrt(3) / 2)) + hive_dimension.hive_width;
	const hive_height_total = (hive_dimension.hive_rows + 0.5) * (hive_height + hive_dimension.hive_gap) - hive_dimension.hive_gap;

	function bee_card_drag(event: DragEvent) {
		//event.dataTransfer?.setDragImage((event.target as Element), 0, 0);
		event.dataTransfer?.setDragImage(document.getElementById("drag_icon") as HTMLElement, 15, 15);
		const bee_drag_new = bee_drag;
		bee_drag_new.bee_dragged = (event.target as any).dataset.bee;
		set_bee_drag(bee_drag_new);
	}

	function bee_card_release(event: DragEvent) {
		const dragged_bee = bee_drag.bee_dragged as string;
		// unregister the drag event
		const bee_drag_new = bee_drag;
		bee_drag_new.bee_dragged = undefined;
		set_bee_drag(bee_drag_new);
		// check for selected hive
		const hover_element = document.elementFromPoint(event.pageX, event.pageY);
		if (!hover_element || !(hover_element as any).dataset || !(hover_element as any).dataset.hive) return;
		const dragged_slot = parseInt((hover_element as any).dataset.hive) as number;
		// update bee in hive
		const hive_slots_new = hive_slots.data;
		hive_slots_new[dragged_slot] = {hive_id: dragged_slot, hive_bee: dragged_bee, hive_level: 25, hive_gifted: false};
		set_hive_slots({data: hive_slots_new, updated: Date.now()});
		localStorage.setItem("hive_bees", JSON.stringify(hive_slots.data));
	}

	return (
		<section className={styles.builder}>
			<div className={styles.sidebar}>

			</div>
			<div className={`${styles.toolkit} ${styles.scrollable}`}>
				{bees_list.map((bee_data, bee_index) => (
					<div className={styles.bee_card} style={{backgroundColor: (bees_rarity as any)[bee_data.rarity].color.hive}} data-bee={bee_data.id} key={bee_index} onDragStart={(event) => bee_card_drag(event as unknown as DragEvent)} onDragEnd={(event) => bee_card_release(event as unknown as DragEvent)} draggable="true">
						<Image src={bee_data.images.skin.path} alt={bee_data.name} width={bee_data.images.skin.width} height={bee_data.images.skin.height} draggable="false"/>
						<h5>{bee_data.name}</h5>
						<p>{bee_data.description}</p>
					</div>
				))}
			</div>
			<div className={`${styles.body} ${font_sono.className} ${font_sono.variable}`}>
				<div className={styles.body_grid}>
					<div className={`${styles.hive} ${styles.container}`}>
						<h3>Bee Swarm Hive Builder</h3>
						<svg viewBox={`0 0 ${hive_width_total} ${hive_height_total}`}>
							{hive_slots.data.map((hive_data, hive_index) => {
								const hive_column = hive_index % hive_dimension.hive_columns;
								const hive_row    = Math.floor(hive_index / hive_dimension.hive_columns);
								const hive_x      = hive_column * (hive_dimension.hive_width * (3/4) + hive_dimension.hive_gap * (Math.sqrt(3) / 2));
								const hive_y      = (hive_dimension.hive_rows - hive_row - 1) * (hive_height + hive_dimension.hive_gap) + (hive_column % 2 === 0 ? (hive_dimension.hive_gap + hive_height) / 2 : 0);
								return (<BeeHive hive_data={hive_data} hive_width={hive_dimension.hive_width} coordinate_x={hive_x} coordinate_y={hive_y} key={hive_index} />);
							})}
						</svg>
					</div>
					<div className={`${styles.hive_stats} ${styles.container}`}>
						<h3>Stats</h3>
					</div>
					<div className={`${styles.hive_credits} ${styles.container}`}>
						<h3>Credits and Instructions</h3>
					</div>
				</div>
			</div>
			<div className={`${styles.terminal} ${styles.scrollable}`}>

			</div>
			<div className={styles.hidden}>
				<Image id="drag_icon" src="/eggs/basic_egg.webp" alt="Bee Egg" width="30" height="30" />
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

export interface HiveSlot {
	hive_id:     number,
	hive_bee:    string  | undefined,
	hive_level:  number  | undefined,
	hive_gifted: boolean | undefined
};

export default Home;