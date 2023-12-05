// Components
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

interface GameButtonProps {
  /** The color to display inside the button */
  colorHex: string;
  /** The name of the color */
  colorName: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

interface GameBoardProps {
  buttons: GameButtonProps[];
  handleButtonClick: (colorHex:string) => void;
}

function GameBoard({buttons, handleButtonClick}: GameBoardProps) {
    return (
      <Box>
        <Grid 
          container 
          rowSpacing={0} 
          columnSpacing={0}
          sx={{
            '--Grid-borderWidth': '1px',
            '--Grid-width': '100%',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
            },
          }}
        >
          {buttons && buttons.map((button, index) => {
            const style = {
              color: button.colorHex,
              fontSize: '2.5em',
              opacity: button.disabled ? 0.5 : 1,
              height: '100%',
              width: '100%',
            };
            
            return (
              <Grid xs={6} key={index} minHeight={150}>
                <ButtonBase 
                  onClick={() => handleButtonClick(button.colorHex)} 
                  style={style}
                >
                  {button.colorName}
                </ButtonBase>
              </Grid>
            )
          })}
        </Grid> 
      </Box>
    );
}

export default GameBoard;

export type { GameButtonProps, GameBoardProps };