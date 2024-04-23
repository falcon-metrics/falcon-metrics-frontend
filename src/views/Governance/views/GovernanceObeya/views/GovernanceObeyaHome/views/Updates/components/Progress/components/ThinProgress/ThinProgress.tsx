import Grid from '@material-ui/core/Grid';
import HorizontalBar from "views/Strategies/components/HorizontalBar";
import { Box } from "@material-ui/core";

type ThinProgress = {
	completed?: number;
	inProgress?: number;
	proposed?: number;
	isLoading?: boolean;
	percentSymbol?: string;
	customStyles?: any;
};

const ThinProgress = ({
	completed,
	inProgress,
	proposed,
	percentSymbol,
	customStyles,
}: ThinProgress) => {
	return (
		<Grid item xs={2}>
			{
				completed !== undefined &&
				inProgress !== undefined &&
				proposed !== undefined ? (
					<Box style={{ paddingLeft: 10, paddingRight: 10, height: '100%' }}>
						<HorizontalBar
							percentSymbol={percentSymbol}
							customStyles={customStyles || { width: 260, }}
							donePerc={completed}
							inProgressPerc={inProgress}
							toDoPerc={proposed}
						/>
					</Box>
				) : null
			}
		</Grid>
	);
};

export default ThinProgress;
