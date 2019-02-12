import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from '../UI/Button/Button';


class AddItem extends Component {
    state = {
        proposal :[],
        submitted: false
    }
    postDataHandler = ()=>{
        this.setState({submitted: true})

        // const data = {
        //     title: this.state.title,
        //     body: this.state.content,
        //     author: this.state.author,
        // }
        // axios.post('https://jsonplaceholder.typicode.com/posts',data)
        // .then(res=>{
        //     console.log(res);
        //     this.setState({submitted: true})
        //     //this.props.history.push('/Posts');
        // })
    }

    render() {
        let redirect = null;
        if (this.state.submitted){
            redirect = <Redirect to='/closet'/>
        }
        return (
            <div>
                {redirect}
                <h3 className="title">Add Item</h3>
                
                <Button clicked={this.postDataHandler}> SUBMIT </Button>
            </div>
        );
    }
}

export default AddItem;