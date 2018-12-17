import { createMuiTheme, indigo, red } from '@material-ui/core/styles';

export default () => {
    const theme = createMuiTheme({
        palette: {
            primary: indigo,
            secondary: red
        },
        typography: {
            useNextVariants: true,
        },
    });
    return theme;
}