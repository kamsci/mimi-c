import {Fragment, useContext} from 'react';
// Lib Components
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
// Custom Context
import { SnackbarContext } from '../Context/SnackbarContext';

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
    selected?: boolean;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;

  // Snackbar Context
  const { openSnackbar } = useContext<any>(SnackbarContext);

  return (
    <Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button 
          size="small"
          onClick={() => openSnackbar({ message: 'Subscribe coming soon!' })}
        >Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
        </IconButton>
        <Button 
          variant="outlined" 
          size="small"             
          onClick={() => openSnackbar({ message: 'User functionality coming soon!' })}
        >Sign up</Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'center', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            onClick={() => openSnackbar({ message: 'Functionality coming soon!' })}
            sx={{ 
                p: 1, 
                flexShrink: 0, 
                cursor: 'pointer',
                fontWeight: section.selected ? 'bold' : 'normal', 
                textDecorationThickness: section.selected ? '2px' : '1px',
                '&:hover': {
                    color: section.selected ? 'primary.dark' : 'primary.light',
                },
            }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </Fragment>
  );
}