import React from 'react'
import { InteractiveHoverButton } from './interactive-hover-button'

const Menu = () => {
  return (
    <div className='fixed top-0 right-0 z-40 px-4 sm:px-[2vw] py-4 sm:py-[4vh] flex gap-4 items-center'>
        <InteractiveHoverButton className="tracking-tight uppercase text-black text-xs sm:text-sm">
            GET IN TOUCH
        </InteractiveHoverButton>
    </div>
  )
}


export default Menu