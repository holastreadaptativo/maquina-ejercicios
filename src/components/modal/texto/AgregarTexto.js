import React from 'react';
import Grid from '@material-ui/core/Grid';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import Button from '@material-ui/core/Button';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from  'html-to-draftjs';
import { pick } from 'lodash';

import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { startAddEnunciado } from '../../../actions/enunciados';

const styles = {
    editor: {
        border: '1px solid indigo',
        height: '450px',
        padding: '0 10px'
    }
}

class AgregarTexto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: this.props.html ? this.getEditorState() : EditorState.createEmpty(),
            html: this.props.html ? this.props.html : '',
            col: this.props.col ? this.props.col : '12',
            colsm: this.props.colsm ? this.props.colsm : '12',
            colmd: this.props.colmd ? this.props.colmd : '12'
        }
    }

    getEditorState = () => {
        const blocksFromHtml = htmlToDraft(this.props.html);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
    }

    onChange = (editorState) => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        this.setState({editorState, html:markup});
    }

    handleGuardar = (e) => {
        const params = pick(this.state, ['html', 'col', 'colsm', 'colmd']);
        const { eje } = this.props;
        this.props.startAddEnunciado(eje, 'Agregar Texto', params);
    } 

    render() {
        console.log(this.props);
        const { editorState } = this.state;
        const { classes } = this.props;
        const options = ['inline','blockType','fontSize','fontFamily','list','textAlign',
        'colorPicker','link','embedded','image','remove','history']
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Editor 
                        editorState={editorState} 
                        onEditorStateChange={this.onChange}
                        editorClassName={classes.editor}
                        toolbar={{ 
                            options
                        }}
                    />
                    <Button color="primary" onClick={this.handleGuardar}>Guardar</Button>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddEnunciado: (idEjercicio,name,params) => dispatch(startAddEnunciado(idEjercicio,name,params))
});

export default compose(
    connect(undefined, mapDispatchToProps),
    withStyles(styles, { withTheme: true })
)(AgregarTexto);
