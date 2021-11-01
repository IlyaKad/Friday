import React from 'react'
import { connect } from 'react-redux'
import { login, loadUser } from '../store/actions/userActions'
import { loadBoards, loadBoard, addBoard } from '../store/actions/boardActions'
import { MainHeader } from '../cmps/MainHeader'
import office from '../assets/img/office.png'


class _Home extends React.Component {

  // TODO Refactor
  setGuestUser = async () => {
    const user = await this.props.login({
      username: 'guest@welcome.com',
      password: 'guest1'
    })
    if (user) {
      const boards = await this.props.loadBoards(user._id)
      if (!boards.length) {
        this.props.addBoard('Start here', user._id)
      }
      const path = boards?.length ? `/board/${boards[0]._id}` : `/board`
      this.props.history.push(path)
    }
  }

  render() {
    const { location } = this.props
    return (
      <section className="home-page">
        <MainHeader pathname={location.pathname} />
        <div className="hero">
          <div className="hero-inner-container flex">
            <div className="hero-cta">
              <h3>Welcome To Friday</h3>
              <h4>Manage your team with ease and feel your Friday getting closer.</h4>
              <button className="guest-user-btn" onClick={this.setGuestUser}>Try As a Guest</button>
            </div>
            <img src={office} alt="office" />
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

const mapDispatchToProps = {
  login,
  loadBoards,
  loadBoard,
  loadUser,
  addBoard
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)