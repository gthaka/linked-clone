import React from 'react'
import MainBody from '../MainBody'
import Titlebar from '../Titlebar'

export default function Dashboard() {
  return (
    <React.Fragment>
        <Titlebar />
        <MainBody>
        <p>Dashing around</p>
        </MainBody>
    </React.Fragment>
  )
}
