// React imports
import * as React from 'react'

// CSS imports
import './cardBoardBox.css'

export default function CardBoardBox ({ id, disable, days, getCard, open }) {
  function ani (id) {
    if (disable) { document.getElementById(id).className += ' classname' }
    getCard(id)
  }

  React.useEffect(() => {
    if (!open) document.getElementById(id).className = 'face-89 top-89'
  }, [open])

  return (
    <article className='boxArticle'>
      <h3>{days}</h3>
      <div className='box-89' onClick={() => ani(id)}>
        <div className='face-89 botton-89' />
        <div className='face-89 back-89' />
        <div className='face-89 right-89' />
        <div className='face-89 left-89'>
          <div className='icons-89'>
            <div className='umbrella-89' />
            <div className='orientation-89'>
              <div className='base-89' />
            </div>
            <div className='glass-89' />
          </div>
        </div>
        <div className='face-89 front-89'>
          <div className='recycled-89'>
            <div className='arrow-89' />
            <div className='arrow-89' />
            <div className='arrow-89' />
          </div>
          <div className='label-89' id='label' />
        </div>
        <div className='face-89 top-89' id={id}>
          <div className='cover_back-89' />
          <div className='cover_right-89' />
          <div className='cover_left-89' />
          <div className='cover_front-89' />
        </div>
      </div>
    </article>

  )
}
