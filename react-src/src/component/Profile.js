import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { connect } from "react-redux";
//import { FETCH_USER_LIST, DELETE_USER, UPDATE_USER_DETAILS } from '../actiontypes';
import './Profile.css';
import nophoto from '../nophoto.jpg';


class Profile extends Component {
     
    constructor(props) {
        super(props);
        this.state = {status: '', error: '', response: []};
        this.deleteUser = this.deleteUser.bind(this);
    }

    render() {
            if(this.state.response.length === 0 && this.state.status === ''){
                return(<div>...loading</div>);
            }

            else if(this.state.response.length === 0 && this.state.status === 'success') {
                return(<div className="text-center">List is Empty</div>);
            } 

            else if(this.state.response.length > 0) {
                const listItems = [];
                for(let i = 0; i < this.state.response.length; i++) {
                    listItems[i] = <li className="list-group-item" key={this.state.response[i].email}>
                                        <div className="user-details">
                                            <img src={this.state.response[i].profile_pic_url} alt="profile photo" />
                                            <h2 className="name">{this.state.response[i].name}</h2>
                                            <h5 className="email">Email: {this.state.response[i].email}</h5>
                                            <p className="gender">Gender: {this.state.response[i].gender}</p>
                                            <p className="hobbies">Hobbies: {this.state.response[i].hobbies}</p>
                                        </div>
                                        <Link to={'profile/edit/'+i} className="btn btn-md btn-primary">Edit</Link>
                                        <button type="button" className="btn btn-md btn-primary" data-id={this.state.response[i].email} onClick={this.deleteUser}>Delete</button>
                                    </li>
                }
                return (
                    <div className="container">
                        <ul className="list-group">
                            {listItems}
                        </ul>
                    </div>
                );
            }

            else {
                return (<div class="text-center">Error Fetching Data! Try after sometime</div>)
            }

        }   
    
        componentDidMount() {
            this.fetchList();
        }

    fetchList() {
        
        let xhr = new XMLHttpRequest();
        console.log('xhr: ', xhr);
        xhr.open('GET', 'http://localhost:5000/data/fetch/users');
        let self = this;
        xhr.onload = () => {
            console.log(' --- in onload function ---');
            console.log(xhr.responseText);
             self.setState({
                status: 'success',
                response: JSON.parse(xhr.responseText) 
             }); 
        }
        xhr.onerror = () => {
            self.setState({
                status: 'fail',
                error: xhr.statusText,
                response: null
            });            
        }
        
        xhr.send();
    }

    updateUserDetails(userDetails) {

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/data/update/user');
        let self = this;
        xhr.onload = () => {
            console.log(xhr.responseText);
            self.setState({
                status: 'success',
                response: JSON.parse(xhr.responseText)
            }); 
        }
        xhr.onerror = () => {
            
            self.setState({
                status: 'fail',
                error: xhr.statusText,
                response: null
            });            
        }
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('userdetails=' + userDetails);
    
    }

    deleteUser(event) {
        console.log('--- deleteUser ---');
        console.log(event.target);
        let email = event.target.getAttribute('data-id');
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/data/delete/user');
        let self = this;
        xhr.onload = () => {
            
            console.log(xhr.responseText);
            
            self.setState({
                status: 'success',
                response: JSON.parse(xhr.responseText)
            }); 
        }
        xhr.onerror = () => {
            
            self.setState({
                status: 'fail',
                error: xhr.statusText,
                response: null
            });     
        }
        
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('email=' + email);
    }




}

/* const mapStateToProps = (state) => {

    return {
        userlist: state.list_reducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserList: () => {
            console.log('---In fetchUserList---');
             return dispatch({
                type: FETCH_USER_LIST,
                payload: new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    console.log('xhr: ',xhr);
                    xhr.open('GET', 'http://localhost:5000/data/fetch/users');

                    xhr.onload =  () => {
                        console.log(' --- in onload function ---');
                        console.log(xhr.responseText);
                        resolve(JSON.parse(xhr.responseText));
                    }
                    xhr.onerror =  () => {
                        console.log(' --- in onerror function ---');
                        reject(xhr.statusText);
                    }
                    xhr.send();
                })
            });
        },

        deleteUser: (email) => {
            dispatch({
                type:  DELETE_USER,
                payload: new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://localhost:5000/data/delete/user');
                    xhr.onload = () => {
                        resolve(xhr.responseText);
                    }
                    xhr.onerror = () => {
                        reject(xhr.statusText);
                    }
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.send('email='+email);
                })   
            });
        },

        updateUserDetails: (userDetails) => {
            dispatch({
                type: UPDATE_USER_DETAILS,
                payload: new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://localhost:5000/data/update/user');
                    xhr.onload = () => {
                        resolve(xhr.responseText);
                    }
                    xhr.onerror = () => {
                        reject(xhr.statusText);
                    }
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.send('userdetails='+userDetails);
                })
            });    
        }
    
    }
}
 */
//export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export default Profile;
