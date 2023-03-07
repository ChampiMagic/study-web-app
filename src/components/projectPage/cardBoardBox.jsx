// React imports
import * as React from 'react'

// CSS imports
import './cardBoardBox.css'

// Mui import
import QuizIcon from '@mui/icons-material/Quiz'

export default function CardBoardBox ({ id, isEmpty, days, getCard, open, haveCards }) {
  function ani (id) {
    if (!isEmpty) {
      document.getElementById(id).className += ' classname'
      getCard(id)
    }
  }

  React.useEffect(() => {
    if (!open) document.getElementById(id).className = 'face-89 top-89'
  }, [open])

  return (
    <article className={isEmpty ? 'boxArticleEmpty' : 'boxArticle'}>
      <h3>{days}</h3>
      <p className='info'>{(isEmpty)}</p>
      <div className='box-89' onClick={() => ani(id)}>
        <div className='face-89 botton-89' />
        <div className='face-89 back-89'>
          <QuizIcon sx={{
            transform: 'scale(4)',
            marginLeft: '3rem',
            marginTop: '3rem'
          }}
          />
        </div>
        <div className='face-89 right-89' />
        <div className='face-89 left-89' />
        <div className='face-89 front-89'>
          <div className='recycled-89'>
            <QuizIcon sx={{
              transform: 'scale(4)'
            }}
            />
          </div>
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
