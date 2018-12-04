import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';

class DibujaIgualPerimetro extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const src = getImgSource(this.props);
        return (
            <div className="col-12 col-sm-6 col-md-4 mx-auto">
                <img src={src} alt="IMG" className="rounded img-fluid" />
            </div>
        );
    }
}

DibujaIgualPerimetro.propTypes = {
    lado: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    alto: PropTypes.string.isRequired,
    ancho: PropTypes.string.isRequired,
    version: PropTypes.object.isRequired
};

const getImgSource = (props) => {
    const { lado, color, alto, ancho, version } = props;
    const canvas = document.createElement('canvas');
    canvas.width =  lado * 10 * 10;
    canvas.height = lado * 5 * 10;

    var ctx = canvas.getContext('2d');

    for(var i = 0; i < 11; i++) { //lineas verticales
        ctx.beginPath();
        ctx.moveTo(i * lado * 10, canvas.height);
        ctx.lineTo(i * lado * 10, 0);
        ctx.strokeStyle = 'black';
        ctx.lineWidth=4;
        ctx.stroke();
        ctx.closePath();
    }
    for(var i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(canvas.width, i * lado * 10);
        ctx.lineTo(0, i * lado * 10);
        ctx.strokeStyle = 'black';
        ctx.lineWidth=4;
        ctx.stroke();
        ctx.closePath();
    }
    var varAlto = version[alto];
    var varAncho = version[ancho];
    
    dibujaRectangulo(ctx, varAncho * lado * 10, varAlto * lado * 10, lado * 10, color);

    var dataUrl = canvas.toDataURL();
    return dataUrl;
};

function dibujaRectangulo(ctx, largox, largoy, lado, color) {
    ctx.translate(0,0);
    var x,y;
    y = largoy / lado === 1 ? 2 * lado : lado;
    x = (10 * lado)/2 - (Math.trunc((largox / lado) / 2) * lado);
    ctx.beginPath();
    ctx.rect(x, y, largox, largoy);
    ctx.strokeStyle = color;
    ctx.lineWidth=8;
    ctx.stroke();
};

export const IgualPerimetroRender = (props, element) => ReactDOM.render(<DibujaIgualPerimetro {...props} />, element);

export const IgualPerimetroRenderString = (props) => ReactDOMServer.renderToStaticMarkup(<DibujaIgualPerimetro {...props} />);

export default DibujaIgualPerimetro;