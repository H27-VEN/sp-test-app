import React, { Component } from 'react';
/* import { connect } from "react-redux";
import { REGISTER_USER } from '../actiontypes'; */
import './Register.css';
import nophoto from '../nophoto.jpg';
import $ from 'jquery'; 
 

class Register extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.register = {name: '', email: '', password: '', repassword: '', hobbies: [], gender: '', profile_pic: ''};
        this.state = {
            name: '',
            email: '',
            password: '',
            repassword: '',
            hobbies: {reading: false, movies: false, sports: false},
            gender: '',
            email_error: '',
            password_error: '',
            repassword_error: '',
            male: false,
            female: false,
            warning_email: 'hide',
            warning_password: 'hide',
            warning_repassword: 'hide',
            disable: true,
            formsubmitalert: 'hide',
            formsubmittext: '',
            invalidid: false,
            editid: '',
            btntext: 'Register',
            profile_pic_url: nophoto,
            profile_pic_file: '',
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

            case 'profile_pic':
                console.log(this.register[event.target.name]);
                
                let reader = new FileReader();
                let file = event.target.files[0];
                this.register[event.target.name] = file;
                reader.readAsDataURL(file);
                let self = this;
                reader.onload = function (e) {
                    self.setState({
                        profile_pic_url: e.target.result
                    });  
                };
       
            break;
            
            default:
                console.log('in default case');
                console.log(this.register[event.target.name]);
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
        else if(event.target.name === 'gender') {
            console.log('target name: ' + event.target.name);
            console.log('target value: ' + event.target.value);
            this.setState({
                [event.target.name]: event.target.value 
            })
            this.register.gender = event.target.value;

        }
        else {
            //console.log(event);
            

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
        console.log('register: ',this.register);
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
                    <div className={this.state.formsubmitalert}>
                        <a href="#" className="close" data-dismiss="alert">&times;</a>
                        <strong>{this.state.formsubmittext}</strong>
                    </div>
                    <form id="userform" onSubmit={this.state.formmethod}>

                        <div className="form-group">
                            <img src={this.state.profile_pic_url}  alt="profile_photo" width="160" height="160" />
                        </div>

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
                            <input type="password" className="form-control" id="repassword" name="repassword" placeholder="Retype Password" minLength="8" maxLength="16"  value={this.state.repassword} onChange={this.change} required />
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
                                <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={this.change} defaultChecked={this.state.male} required/>
                                <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={this.change} defaultChecked={this.state.female} required/>
                                <label className="form-check-label">Female</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="custom-file" id="customFile" lang="es">
                                <input type="file" class="custom-file-input" id="profile_pic" name="profile_pic" accept=".jpg, .jpeg, .png" onChange={this.change} />
                                    <label className="custom-file-label" for="exampleInputFile">
                                        Select file...
                                    </label>
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
       
        let self = this;
        let formData = new FormData();
        for (const key in this.register) {
            if (this.register.hasOwnProperty(key)) {
                if (key === 'profile_pic')
                    formData.append(key, this.register[key], this.register[key].name);
                else
                    formData.append(key, this.register[key]);
            }
        }

        formData.append('id', this.state.editid);
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/data/update/user',
            data: formData,
            contentType: false,
            processData: false
        }).done(function (data) {

            console.log(data);
            let response = JSON.parse(data);
            if (response.result === 'done') {
                self.setState({
                    formsubmitalert: 'alert alert-success',
                    formsubmittext: 'User Registered Successfully!',
                    name: '',
                    email: '',
                    password: '',
                    repassword: '',
                    hobbies: { reading: false, movies: false, sports: false },
                    gender: '',
                    profile_pic_url: nophoto
                });

                document.getElementById('reading').checked = false;
                document.getElementById('movies').checked = false;
                document.getElementById('sports').checked = false;
                document.getElementById('male').checked = false;
                document.getElementById('female').checked = false;
            }

        }).fail(function (data) {
            console.log('Error');
            self.setState({
                formsubmitalert: 'alert alert-danger',
                formsubmittext: 'Error during Registeration'
            });
        });
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
                let myhobbies = response.response.hobbies.split(',');
                let hobbies = {reading: false, sports: false, movies: false};
                myhobbies.forEach((currentValue, index) => {
                    console.log('hobbies current value: ' + currentValue);
                    document.getElementById(currentValue).checked = true;

                    hobbies[currentValue] = true;

                });
                console.log('hobbies: ',hobbies);
                console.log('gender: '  ,response.response.gender);
                document.getElementById(response.response.gender).checked = true;
                self.setState({
                    status: 'success',
                    name: response.response.name,
                    email: response.response.email,
                    password: response.response.password,
                    repassword: response.response.password,
                    hobbies:  hobbies,
                    gender: response.response.gender,
                    [response.response.gender]: true,
                    editid: id,
                    btntext: 'Update',
                    profile_pic_url: response.response.profile_pic_url,
                    formmethod: self.update.bind(this),
                });
                console.log('state',this.state);
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
        let self = this;
        let formData = new FormData();
        for (const key in this.register) {
            if (this.register.hasOwnProperty(key)) {
                if(key === 'profile_pic')
                    formData.append(key, this.register[key], this.register[key].name);
                else
                    formData.append(key, this.register[key]);
            }
        }
       

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/data/register/user',
            data: formData,
            contentType: false,
            processData: false
        }).done(function (data) {
            
            console.log(data);
            let response = JSON.parse(data);
            if (response.result === 'done') {
                self.setState({
                    formsubmitalert: 'alert alert-success',
                    formsubmittext: 'User Registered Successfully!',
                    name: '',
                    email: '',
                    password: '',
                    repassword: '',
                    hobbies: { reading: false, movies: false, sports: false },
                    gender: '',
                    profile_pic_url: nophoto
                });
                
                document.getElementById('reading').checked = false;
                document.getElementById('movies').checked = false;
                document.getElementById('sports').checked = false;
                document.getElementById('male').checked = false;
                document.getElementById('female').checked = false;
            }

        }).fail(function (data) {
            console.log('Error');
            self.setState({
                formsubmitalert: 'alert alert-danger',
                formsubmittext: 'Error during Registeration'
            });
        });
       
    }

}




export default Register;