// Components
import Grid from '@mui/material/Unstable_Grid2';
// import div from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';

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
      <Container maxWidth="sm">
        <Grid 
          container 
          rowSpacing={0} 
          columnSpacing={0}
          sx={{
            '--Grid-borderWidth': '1px',
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
              fontSize: '5vw',
              opacity: button.disabled ? 0.5 : 1,
              height: '7em',
              width: '100%',
            };
            
            return (
              <Grid xs={6} key={index}>
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
      </Container>
    );
}

export default GameBoard;

export type { GameButtonProps, GameBoardProps };