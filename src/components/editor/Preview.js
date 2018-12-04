import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.iframe = React.createRef();
    }

    handleViewMobile = () => {
        this.iframe.current.width = 340;
    }

    handleViewTablet = () => {
        this.iframe.current.width = 768;
    }

    handleViewEscritorio = () => {
        this.iframe.current.width = 990;
    }

    handleViewMax = () => {
        this.iframe.current.width = 1366;
    }

    dibujaContenido = () => {
        var doc = this.iframe.current.contentDocument;
        doc.querySelector('div.row.no-gutters').innerHTML = this.props.html;
    }

    render() {
        return (
            <Grid container>
                <Grid item lg={12}>
                    <iframe ref={this.iframe} src="/dist/preview.html" height={631} width={350}></iframe>
                </Grid>
                <Grid item lg={12}>
                    <Button color="primary" onClick={this.handleViewMobile}>Mobile</Button>
                    <Button color="primary" onClick={this.handleViewTablet}>Tablet</Button>
                    <Button color="primary" onClick={this.handleViewEscritorio}>Escritorio</Button>
                    <Button color="primary" onClick={this.handleViewMax}>Maximo</Button>
                    <Button color="primary" onClick={this.dibujaContenido}>Dibuja Contenido</Button>
                </Grid>
            </Grid>
        );
    }
}

export default Preview;