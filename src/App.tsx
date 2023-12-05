// Lib Components
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
// Components
import Header from './Header/Header';
import Game, {GameButtonProps} from './Game';
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
    <Header sections={[]} title={'Someone Says'} />
      <Stack>
        <Game buttons={buttons}/>
      </Stack>
    </Container>
  )
}

export default App
