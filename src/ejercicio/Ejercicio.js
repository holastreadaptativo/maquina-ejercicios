import React from 'react';
import Enunciado from './Enunciado';
import Footer from './Footer';

class Ejercicio extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Enunciado {...this.props}/>
                <Footer />
            </div>
        );
    }
}

export default Ejercicio;