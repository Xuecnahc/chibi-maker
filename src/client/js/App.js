import React from 'react' // eslint-disable-line
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {withRouter} from 'react-router'

// Routes
import Routes from '../../common/constants/Routes'

const style = {
  navbar: {
    margin: 0
  }
}

const App = ({children, location}) => {
  return (
    <div>
      <Navbar inverse collapseOnSelect style={style.navbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={Routes.CREATE}>Maker</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to={Routes.CREATE}>
              <NavItem eventKey={1}>Create</NavItem>
            </LinkContainer>
            {
              location.pathname.includes(Routes.EDIT)
                ? (
                  <LinkContainer to={location.pathname}>
                    <NavItem eventKey={1}>Edit</NavItem>
                  </LinkContainer>
                )
                : ''
            }
            <LinkContainer to={Routes.LIST}>
              <NavItem eventKey={2}>List</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        {children}
      </div>
    </div>
  )
}

App.propTypes = {}

export default withRouter(App)
