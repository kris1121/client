import React from 'react'

const Jumbotron = ({ title, subtitle="Welcome to React E-commerce app" }) => {
  return (
    <div className='container bg-primary'>
      <div className='row'>
        <div className='col text-center p-4 bg-light'>
          <h1>{ title }</h1>
          <p className='lead'>{ subtitle }</p>
        </div>
      </div>
    </div>
  )
}

export default Jumbotron
