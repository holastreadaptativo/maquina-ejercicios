import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Editor, EditorState } from 'draft-js';

class AgregarTexto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    onChange = (editorState) => this.setState({editorState});

    render() {
        const { editorState } = this.state;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Editor editorState={editorState} onChange={this.onChange} />
                </Grid>
                <Grid item xs={12}>
                    <textarea></textarea>
                </Grid>
            </Grid>
        );
    }
}

export default AgregarTexto;
