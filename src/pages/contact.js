import React, { Component } from 'react';
import iconSubmit from './../images/icon-submit.svg';
import contactHeader from './../images/contact-beetle.png';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/actions';

class Contact extends Component {

  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {sendContact} = this.props.actions
    const data = new FormData(event.target);

    sendContact( data );
  }

  render() {

    const {reducerForm} = this.props;
    const {sending, submitted, message} = reducerForm;

    if(submitted) {
      return (
        <div className="contact">
          <header className="bg-secondary">
            <div className="container">
              <img src={contactHeader} className="contact-image img-fluid" alt="Contact us" />
            </div>
          </header>
          <div className="container pb-5">
            <h1>Contact us</h1>
            <p>{message.message}</p>
          </div>
        </div>
      );
    } else {
      return(
        <div className="contact">
          <header className="bg-secondary">
            <div className="container">
              <img src={contactHeader} className="contact-image img-fluid" alt="Contact us" />
            </div>
          </header>
          <div className="container pb-5">
            <form onSubmit={this.handleSubmit}>
              <h1>Contact us</h1>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                      <label htmlFor="firstname">Your name (required)</label>
                      <input type="text" name="firstname" className="form-control" id="firstname" placeholder="Enter your name" />
                    </div>
                  <div className="form-group">
                      <label htmlFor="email">Your e-mailadress (required)</label>
                      <input type="email" name="emailaddress" className="form-control" id="email" placeholder="Enter your e-mailaddress" />
                    </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                      <label htmlFor="question">Your question or comment</label>
                      <textarea className="form-control" name="question" id="question" rows="5"></textarea>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p><small>By sending this form you agree to the <Link to="/privacy">privacy policy</Link>.</small></p>
                </div>
                <div className="col-6 text-right">
                  <button type="submit" className="btn btn-primary">
                    <img src={iconSubmit} width="20" alt="Submit" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const {reducerForm} = state;
  return {
    reducerForm
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);