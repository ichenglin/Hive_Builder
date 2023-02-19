import { HiveSlot } from "@/pages";
import type { NextPageLayout } from "../../pages/_app";

import bees_list from "@/data/bees_list.json";
import bees_rarity from "@/data/bees_rarity.json";

const BeeHive: NextPageLayout<{hive_data: HiveSlot, hive_width: number, coordinate_x: number, coordinate_y: number}> = ({hive_data, hive_width, coordinate_x, coordinate_y}) => {
    const hive_height = hive_width * (Math.sqrt(3) / 2);
    const hive_anchors: {offset_x: number, offset_y: number}[] = [
        {offset_x: hive_width * (1/4), offset_y: 0},
        {offset_x: hive_width * (3/4), offset_y: 0},
        {offset_x: hive_width,         offset_y: (hive_height / 2)},
        {offset_x: hive_width * (3/4), offset_y: hive_height},
        {offset_x: hive_width * (1/4), offset_y: hive_height},
        {offset_x: 0,                  offset_y: (hive_height / 2)}
    ];
    const hive_bee = bees_list.filter(bee_data => bee_data.id === hive_data.hive_bee)[0];
    const hive_background = hive_bee !== undefined ? bees_rarity[hive_bee.rarity as keyof typeof bees_rarity].color.hive : undefined;
	return (
		<path style={{fill: hive_background}} d={`M${hive_anchors.map((anchor_coordinate) => `${coordinate_x + anchor_coordinate.offset_x},${coordinate_y + anchor_coordinate.offset_y}`).join(" ")}z`} data-hive={hive_data.hive_id}/>
	)
};

export default BeeHive;