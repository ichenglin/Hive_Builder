import type { BeeHiveType, NextPageLayout } from "../../pages/_app";

const BeeHive: NextPageLayout<{hive_type: BeeHiveType, hive_width: number, coordinate_x: number, coordinate_y: number}> = ({hive_type, hive_width, coordinate_x, coordinate_y}) => {
    const hive_height = hive_width * (Math.sqrt(3) / 2);
    const hive_anchors: {offset_x: number, offset_y: number}[] = [
        {offset_x: hive_width * (1/4), offset_y: 0},
        {offset_x: hive_width * (3/4), offset_y: 0},
        {offset_x: hive_width,         offset_y: (hive_height / 2)},
        {offset_x: hive_width * (3/4), offset_y: hive_height},
        {offset_x: hive_width * (1/4), offset_y: hive_height},
        {offset_x: 0,                  offset_y: (hive_height / 2)}
    ];
	return (
		<path d={`M${hive_anchors.map((anchor_coordinate) => `${coordinate_x + anchor_coordinate.offset_x},${coordinate_y + anchor_coordinate.offset_y}`).join(" ")}z`} />
	);
};

export default BeeHive;