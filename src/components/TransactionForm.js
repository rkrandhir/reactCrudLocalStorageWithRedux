import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { bindActionCreators } from 'redux';

class TransactionForm extends Component {
    
    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
        if(this.props.currentIndex === -1){
            return {
                bAccountNumber : '',
                ifsc:'',
                bName:'',
                amount: ''
            }
        } else {
            return this.props.list[this.props.currentIndex]
        }
    }

    componentDidUpdate(prevProps) {
    if(prevProps.currentIndex !== this.props.currentIndex || prevProps.list.length !== this.props.list.length)
        this.setState({...this.returnStateObject()})
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        if(this.props.currentIndex === -1) {
            this.props.insertTransaction(this.state) 
        } else {
            this.props.updateTransaction(this.state)
        }
    }

    render() {
        return (
            <form autoComplete='off' onSubmit={this.onHandleSubmit}>
                <input name='bAccountNumber' placeholder={this.state.bAccountNumber} Value={this.state.bAccountNumber} onChange={this.handleInputChange} /><br/>
                <input name='ifsc' placeholder={this.state.ifsc} Value={this.state.ifsc} onChange={this.handleInputChange}  /><br/>
                <input name='bName' placeholder={this.state.bName} Value={this.state.bName} onChange={this.handleInputChange}  /><br/>
                <input name='amount' placeholder={this.state.amount} Value={this.state.amount} onChange={this.handleInputChange}  /><br/>
                <button type='submit'>Submit</button>
            </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        list: state.list,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        insertTransaction : actions.insert,
        updateTransaction : actions.update
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);