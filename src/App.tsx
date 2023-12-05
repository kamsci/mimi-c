// Lib Components
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
// Components
import Header from './Header/Header';
import Game, {GameButtonProps} from './Game';
import CustomSnackbar from './Global/CustomSnackbar';
// Styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

function App() {
  const buttons:GameButtonProps[] = [
    {
      colorHex: '#cc79a7',
      colorName: 'pink',
      disabled: false,
    },
    {
      colorHex: '#f7b538',
      colorName: 'yellow',
      disabled: false,
    },
    {
      colorHex: '#d55e00',
      colorName: 'orange',
      disabled: false,
    },
    {
      colorHex: '#0072b2',
      colorName: 'blue',
      disabled: false,
    }
  ];

  return (
    <Container maxWidth="lg">
      <CustomSnackbar />
      <Header sections={[{title: 'Game', url: '', selected: true}, {title: 'Stats', url: ''}]} title={'MimiC.'} />
        <Stack>
          <Game buttons={buttons}/>
        </Stack>
    </Container>
  )
}

export default App
