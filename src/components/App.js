import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Auction from '../abis/Auction.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected.')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Auction.networks[networkId]
    if(networkData) {
      const auction = web3.eth.Contract(Auction.abi, networkData.address)
      this.setState({ auction })
      const postCount = await auction.methods.postCount().call()
      this.setState({ postCount })
      for (var i = 1; i <= postCount; i++) {
        const post = await auction.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }
      this.setState({
        posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      this.setState({ loading: false})
    } else {
      window.alert('Auction contract not deployed to detected network.')
    }
  }

  createPost(content) {
    this.setState({ loading: true })
    this.state.auction.methods.createPost(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  bidItem(id, bidAmount) {
    this.setState({ loading: true })
    this.state.auction.methods.bidItem(id).send({ from: this.state.account, value: bidAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      auction: null,
      posts: [],
      loading: true
    }

    this.createPost = this.createPost.bind(this)
    this.bidPost = this.bidPost.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              posts={this.state.posts}
              createPost={this.createPost}
              bidItem={this.bidItem}
            />
        }
      </div>
    );
  }
}

export default App;
