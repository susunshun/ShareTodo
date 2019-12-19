import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from "../lib/db";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_str: '',
      msg_str: '',
      last_id: -1,
      data: []
    };
    this.getLatestId().then();
    this.doChangeMsg = this.doChangeMsg.bind(this);
    this.doChangeName = this.doChangeName.bind(this);
    this.doAction = this.doAction.bind(this);
  }

  doChangeName(e) {
    this.setState({
      name_str: e.target.value
    })
  }

  doChangeMsg(e) {
    this.setState({
      msg_str: e.target.value
    })
  }

  doAction() {
    this.addData().then();
  }

  async getLatestId() {
    await new Promise((resolve, reject) => {
      db.collection('users').orderBy("id", "desc").limit(1)
        .get()
        .then(snapshot => {
          let data = [];
          snapshot.forEach((doc) => {
            data.push(
              Object.assign({
                id: doc.id
              }, doc.data())
            )
          });
          if (data.length !== 0) {
            this.setState({ last_id: result[0].id });
          } else {
            this.setState({ last_id: 0 });
          }
          resolve(data)
        }).catch(error => {
        reject([])
      })
    });
  }

  async addData() {
    await new Promise((resolve, reject) => {
      db.collection('users').add({
        id: this.state.last_id + 1,
        name: this.state.name_str,
        message: this.state.msg_str
      })
        .then(() => {
          this.setState({ last_id: this.state.last_id + 1, msg_str: '', name_str: '' });
          resolve()
        }).catch(error => {
        reject([])
      })
    });
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
          <tr>
            <td><input type="text" placeholder="name" onChange={this.doChangeName}
                       value={this.state.name_str} /></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="massage" onChange={this.doChangeMsg}
                       value={this.state.msg_str} /></td>
          </tr>
          </tbody>
        </table>
        <button onClick={this.doAction}>Add</button>
      </div>
    )
  }
}

export default AddForm;