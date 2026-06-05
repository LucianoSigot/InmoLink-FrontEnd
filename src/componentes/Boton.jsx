import React from 'react'

const Boton = ({children, type="button", ...rest}) => {
  return (
    <button
      type={type}
      className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      {...rest}
    >
        {children}
    </button>
  )
}

export default Boton