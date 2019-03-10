import React from 'react'
import classNames from 'classnames'
import './Spinner.css'

function Spinner(props) {
  const spinnerClass = classNames({
    'spinner-border': true,
    ['text-' + props.color]: !!props.color,
    ['m-' + props.margin]: !!props.margin,
    ['spinner-border-' + props.size]: !!props.size
  })

  const renderSpinner = () => {
    return (
      <div className={spinnerClass} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  const renderCenteredSpinner = () => {
    return (
      <div className="d-flex justify-content-center">
        { renderSpinner() }
      </div>
    )
  }

  return (
    <div>
      { props.centered ? renderCenteredSpinner() : renderSpinner() }
    </div>
  )
}

export default Spinner
