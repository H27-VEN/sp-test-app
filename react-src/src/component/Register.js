import React, { Component } from 'react';
/* import { connect } from "react-redux";
import { REGISTER_USER } from '../actiontypes'; */
import './Register.css';


class Register extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.register = {name: '', email: '', password: '', repassword: '', hobbies: [], gender: ''};
        this.state = {
            name: '',
            email: '',
            password: '',
            repassword: '',
            hobbies: {reading: false, movies: false, sports: false},
            gender: 'male',
            email_error: '',
            password_error: '',
            repassword_error: '',
            warning_email: 'hide',
            warning_password: 'hide',
            warning_repassword: 'hide',
            disable: true,
            registerationComplete: 'hide',
            registerationCompleteText: '',
            invalidid: false,
            editid: '',
            btntext: 'Register',
            formmethod: this.registerUser.bind(this),
            
            
        };
        
        this.change = this.change.bind(this);
        //this.registerUser = this.registerUser.bind(this);
        //this.update = this.update.bind(this);
    }

    change(event) {

        switch (event.target.name) {
            case 'email':
               if(this.validate(event.target.name, event.target.value)) {
                   this.register[event.target.name] = event.target.value;
               }
            break;

            case 'password':
                if (this.validate(event.target.name, event.target.value)) {
                    this.register[event.target.name] = event.target.value;
                }
            break;

            case 'repassword':
                if (this.validate(event.target.name, event.target.value)) {
                    this.register[event.target.name] = event.target.value;
                }
            break;
            
            default:
                this.register[event.target.name] = event.target.value;
            break;
        }
            
        if (event.target.name === 'hobbies') {
            let hobby = event.target.value;
            this.state.hobbies[hobby] = !this.state.hobbies[hobby];
            this.setState(this.state.hobbies);
            this.register.hobbies = [];
            for (const key in this.state.hobbies) {
                if (this.state.hobbies.hasOwnProperty(key) && this.state.hobbies[key] === true) {
                    this.register.hobbies.push(key);
                }
            }
        }
        else {
            console.log(event);
            console.log('target name: ' + event.target.name);
            console.log('target value: ' + event.target.value);

            this.setState({
                [event.target.name]: event.target.value
            });
        } 
        
        if(this.state.email !== '' && this.state.email_error === '' &&
           this.state.password !== '' && this.state.password_error === '' && 
           this.state.repassword !== '' && this.state.repassword_error === '' && 
           this.state.gender !== '') {
                
            this.state.disable = false;
        }
        else{
            this.state.disable = true;
        }
           
        console.log(this.state);
        console.log('register: '+this.register);
    }

    validate(name, value) {

        switch(name) {

            case 'email':
                
                let email = value.trim();
                let emfilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                 if (!emfilter.test(email)) {
                    this.setState({
                        email_error: 'Invalid email address',
                        warning_email: 'alert alert-warning'
                    });
                    
                    return false;
                }
                else {
                    this.setState({
                        email_error: '',
                        warning_email: 'hide'
                     });

                     return true;
                }

            break;

            case 'password':
                
                let password = value.trim();
                let psfilter = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&^~]{8,16}$/;

                if (!psfilter.test(password)) {
                    
                    this.setState({
                        password_error: 'password must be between 8-16 characters and include uppercase, lowercase and special symbols',
                        warning_password: 'alert alert-warning'
                    });
                    
                    return false;
                }
                else {
                    
                    this.setState({
                        password_error: '',
                        warning_password: 'hide'
                    });

                    return true;
                }
            break;

            case 'repassword' :

                if(this.state.password !== value) {
                    this.setState({
                        repassword_error: 'password do not match',
                        warning_repassword: 'alert alert-warning'
                    });

                    return false;
                }

                else {
                    this.setState({
                        repassword_error: '',
                        warning: 'hide'
                    });

                    return true;
                }
                
            break;
        
        }
    }


    render() {
            if(this.state.invalidid === true){
                return(<div className="text-center">Invalid ID</div>);               
            }

        else {

            return(
                <div className="container">
                    <div className={this.state.registerationComplete}>
                        <a href="#" className="close" data-dismiss="alert">&times;</a>
                        <strong>{this.state.registerationCompleteText}</strong>
                    </div>
                    <form ref="user_form" onSubmit={this.state.formmethod}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="name" value={this.state.name} minLength="3"  onChange={this.change} required />
                        </div>
                        
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.change} required />   
                            <div className={this.state.warning_email} role="alert">{this.state.email_error}</div>
                                
                        </div>
                            
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" minLength="8" maxLength="16" value={this.state.password} onChange={this.change} required  />
                            <div className={this.state.warning_password} role="alert">{this.state.password_error}</div>
                        </div>

                        <div className="form-group">
                            <label>Retype Password:</label>
                            <input type="password" className="form-control" id="repassword" name="repassword" placeholder="Password" minLength="8" maxLength="16"  value={this.state.repassword} onChange={this.change} required />
                            <div className={this.state.warning_repassword} role="alert">{this.state.repassword_error}</div>
                        </div>
                            
                        <div className="form-group">
                            <label>Hobbies:</label>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" id="reading" name="hobbies" value="reading" onChange={this.change} defaultChecked={this.state.hobbies.reading}  />
                                <label className="form-check-label" >Reading</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" id="sports" name="hobbies" value="sports" onChange={this.change} defaultChecked={this.state.hobbies.sports} />
                                <label className="form-check-label" >Sports</label>
                            </div>
                                
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" id="movies" name="hobbies" value="movies" onChange={this.change} defaultChecked={this.state.hobbies.movies} />
                                <label className="form-check-label">Watching Movies</label>
                            </div>  
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="Male" value="male" onChange={this.change} defaultChecked={true} required/>
                                <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="Female" value="female" onChange={this.change} defaultChecked={false} required/>
                                <label className="form-check-label">Female</label>
                            </div>
                        </div>
                            
                        <button type="submit" className="btn btn-primary" disabled={this.state.disable}>{this.state.btntext}</button>  
                    </form>
                </div>
                );
            }
    }

    update(event) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/data/update/user');
        let self = this;
        xhr.onload = () => {
            console.log(xhr.responseText);
            let res = JSON.parse(xhr.responseText);
            if (res.result === 'done') {
                self.setState({
                    updationComplete: 'alert alert-success fade in',
                    updationCompleteText: 'Data updated successfully!'
                });
            }
        }
        xhr.onerror = () => {

            self.setState({
                registerationComplete: 'alert alert-danger fade in',
                registerationCompleteText: 'Error during Updation'
            });
        }
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('userdetails=' + JSON.stringify(this.register) + '&id='+this.state.editid);
    }


    

    componentDidMount() {
        if(this.props.match.params.userId >= 0) {
            this.fetchDataID(this.props.match.params.userId);
        }
    }

    fetchDataID(id) {
        console.log('--- this is fetchDataID --- ');
        console.log('id: ' + id);
        let xhr = new XMLHttpRequest();
        
        xhr.open('POST', 'http://localhost:5000/data/fetch/specific');
        let self = this;
        xhr.onload = () => {
            console.log(' --- in onload function ---');
            console.log(xhr.responseText);
            let response = JSON.parse(xhr.responseText);
            if(response.result === 'done') {
                let hobbies = {reading: false, sports: false, movies: false};
                response.response.hobbies.forEach((currentValue, index) => {
                    console.log('hobbies current value: ' + currentValue);
                    hobbies[currentValue] = true;
                });
                self.setState({
                    status: 'success',
                    name: response.response.name,
                    email: response.response.email,
                    password: response.response.password,
                    repassword: response.response.password,
                    hobbies: hobbies,
                    gender: response.response.gender || 'male',
                    editid: id,
                    btntext: 'Update',
                    formmethod: self.update.bind(this),
                });

                this.register = response.response;

            }
            else{
                this.setState({
                    invalidid: true
                });
            }
        }
        xhr.onerror = () => {
            self.setState({
                status: 'fail',
                error: xhr.statusText,
                response: null
            });
        }
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('id='+id);
    }

    registerUser(event) {
        event.preventDefault();
        this.setState({
            registerationComplete: 'hide'
        })
        this.refs.user_form.reset();
        let xhr = new XMLHttpRequest();
        let form = document.getElementById("registeration_form");
        xhr.open('POST', 'http://localhost:5000/data/register/user');
        let self = this;
        xhr.onload = () => {
            console.log(xhr.responseText);
            let res = JSON.parse(xhr.responseText);
            if(res.result === 'done') {
                self.setState({
                    registerationComplete: 'alert alert-success fade in',
                    registerationCompleteText: 'User Registered Successfully!'
                });
            }
        }
        xhr.onerror = () => {

            self.setState({
                registerationComplete: 'alert alert-danger fade in',
                registerationCompleteText: 'Error during Registeration'
            });
        }        
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('userdetails='+JSON.stringify(this.register));
    }



}

/* const mapStateToProps = (state) => {
    return {
        user_registed: state.list_reducer,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (userDetails) => {
            console.log('--- In registerUser ');
            console.log(userDetails);
            dispatch({
                type: REGISTER_USER,
                payload: new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://localhost:5000/data/register/user');
                    xhr.onload = () => {
                        resolve(xhr.responseText);
                    }
                    xhr.onerror = () => {
                        reject(xhr.statusText);
                    }
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.send('userdetails='+JSON.stringify(userDetails));
                }) 
            });
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Register); */
export default Register;