import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'
function RenderItem({ task, onEdit, onRemove }) {
  return (
    <div
      id='itemContainer'
      className='justify-between w-full flex'
    >
      <span className='max-w-[330px] break-words'>{task}</span>

      <div className='flex gap-3 items-center'>
        <span
          id='edit'
          onClick={onEdit}
          className='cursor-pointer'
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          <Tooltip
            offset={5}
            positionStrategy='fixed'
            place='top'
            anchorSelect='#edit'
            content='Edit'
            id='toolTip'
          />
        </span>

        <span
          id='remove'
          onClick={onRemove}
          className='cursor-pointer'
        >
          <FontAwesomeIcon icon={faTrash} />
          <Tooltip
            offset={5}
            positionStrategy='fixed'
            place='top'
            anchorSelect='#remove'
            content='Remove'
            id='toolTip'
          />
        </span>
      </div>
    </div>
  )
}

export default RenderItem
