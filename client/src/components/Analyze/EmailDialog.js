import React , { Component } from 'react';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './EmailDialog.css';

import Email from '../../assets/images/email.png';
import EmailTitle from '../../assets/images/email_title.png';


class EmailDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            open: false
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const variable = { email: this.state.Email }
        Axios.post('http://localhost:1818/mailer', variable)
            .then(response => { 
                this.setState({
                    Email: '',
                    open: false
                })
            });
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            Email: '',
            open: false
        })
    }

    render() {

        return (
            <div>
                <button className='email-button'><img src={Email} alt="Email" onClick={this.handleClickOpen} value="Email" /></button>
                
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle><img className='email-title' src={EmailTitle} alt="PressCheck" /></DialogTitle>

                    <DialogContent>
                        <TextField variant="outlined" fullWidth margin="dense"
                            label="Email" type="Email" name="Email" value={this.state.Email} onChange={this.handleValueChange} />
                        <br/>
                    </DialogContent>

                    <DialogActions>
                        <Button className='submit-button' variant="contained" color="primary" href="#contained-buttons" onClick={this.handleFormSubmit}>전송하기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default EmailDialog;