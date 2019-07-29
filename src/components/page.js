import React from 'react';
import PropTypes from 'prop-types'


export default class Page extends React.Component {
    static defaultProps = {
        isCurrent: false,
        isDots: false,
        className: ''
    };

    render() {
        const item = this.props.onClick ?
            <a className="page-link" href="#" onClick={this.props.onClick}>{this.props.children}</a>
            :
            <span className="page-link">{this.props.children}</span>;

        let className = "page-item " + this.props.className;
        if ( this.props.isCurrent && this.props.className !== "prev" &&  this.props.className !== "next" ) {
            className += ' active';
        }
        if ( this.props.isDots ) {
            className += ' dots';
        }
        return <li className={className}>
            {item}
        </li>;
    }
}

Page.propTypes = {
    isCurrent: PropTypes.bool,
    className: PropTypes.string,
    isDots: PropTypes.bool,
    onClick: PropTypes.func
};