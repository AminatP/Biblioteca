/* eslint-disable */
import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '700px' }}>
            <div className="content mr-auto ml-auto">
            <div className="card text-center">
              <div className="card-header">
                Featured
              </div>
              <div className="card-body">
                <h5 className="card-title">Daemonologie — written and published in 1599 by King James VI of Scotland as a philosophical dissertation on contemporary necromancy and the historical relationships between the various methods of divination used from ancient black magic.</h5>
                <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/James_I%3B_Daemonologie%2C_in_forme_of_a_dialogue._Title_page._Wellcome_M0014280.jpg/800px-James_I%3B_Daemonologie%2C_in_forme_of_a_dialogue._Title_page._Wellcome_M0014280.jpg'}
                width="500"
                height="500"
                />
                <p className="card-text"></p>
              </div>
            </div>
              <p>&nbsp;</p>
              { this.props.posts.map((post, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                        alt="text"
                      />
                      <small className="text-muted">{post.author}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>{post.content}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                         TOTAL: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('50.0', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipPost(event.target.name, tipAmount)
                          }}>
                          BID NOW 50 ETH
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
