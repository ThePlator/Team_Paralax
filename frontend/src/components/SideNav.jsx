import React from 'react'

function SideNav() {
  return (
    <div className="navcontainer">
      <nav className="nav">
        <div className="nav-upper-options">
          <div className="nav-option option1">
            <a href="/dashboard"><h3> Dashboard</h3></a>
          </div>

          <div className="option2 nav-option">
            <a href="/teacher"><h3> Teacher</h3></a>
          </div>

          <div className="nav-option option3">
            <a href="/class"><h3> Class</h3></a>
          </div>

          <div className="nav-option option4">
            <a href="/subjects"><h3> Subject</h3></a>
          </div>

          <div className="nav-option option5">
            <a href="/routines"><h3> Routines</h3></a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default SideNav