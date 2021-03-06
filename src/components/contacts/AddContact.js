import React, { Component } from 'react'
import { Consumer } from '../context';
import TextInputGroup from '../helpers/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    onChangeInput = (e) => this.setState({[e.target.name]: e.target.value})

    submit = async (dispatch, e) => {
        e.preventDefault();

        const {name, email, phone} = this.state;
        
        if(name === "") {
            this.setState({errors: {name: "the name is Required!"}})
            return;
        }

        if(email === "") {
            this.setState({errors: {email: "the email is Required!"}})
            return;
        }

        if(phone === "") {
            this.setState({errors: {phone: "the phone is Required!"}})
            return;
        }

        const newContact = {
            name,
            email,
            phone
        }

        try{
              const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact)
        
            dispatch({
                type: "ADD_CONTACT",
                payload: res.data
            })
        }
        catch(e) {
            console.log(e);
        }
      

        

        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        })

        this.props.history.push('/');

    }
  render() {
      const { name, email, phone, errors } = this.state;
    
      return (
          <Consumer>
              {value => {
                  const { dispatch } = value;
                  return (
                    <div>
                      <form onSubmit={this.submit.bind(this, dispatch)}>    
                      <div className="card">
                          <div className="card-body">
                              <h4 className="card-title">Add contact</h4>
                              <div className="card-text">
                                  <TextInputGroup 
                                        label="Name" 
                                        type="text"
                                        name="name" 
                                        value={name}
                                        onChange={this.onChangeInput}
                                        error={errors.name}
                                  />
                                   <TextInputGroup 
                                        label="Email" 
                                        type="email"
                                        name="email" 
                                        value={email}
                                        onChange={this.onChangeInput}
                                        error={errors.email}
                                  />
                                   <TextInputGroup 
                                        label="Phone"
                                        type="text" 
                                        name="phone" 
                                        value={phone}
                                        onChange={this.onChangeInput}
                                        error={errors.phone}
                                  />
                                  <button className="btn btn-success btn-block">Add new Contact</button>
                              </div>
                          </div>
                      </div>
                      </form>
                    </div>
                  )
              }}
          </Consumer>
      )

    
  }
}

export default AddContact;
