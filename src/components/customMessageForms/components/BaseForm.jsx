import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setThemeColor,
  resetThemeColor
} from '../../../slices/themeColor/themeColorSlice'
import {
  activateMobileNavLeft,
  activateMobileNavRight
} from '../../../slices/mobileNav/mobileNavSlice'
import Dropzone from 'react-dropzone'
import {
  Squares2X2Icon,
  AtSymbolIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
  HeartIcon,
  ArrowDownLeftIcon,
  ArrowDownRightIcon
} from '@heroicons/react/20/solid'

import Spinner from '../../spinner'

const BaseForm = ({
  state,
  setState,
  onChangeHandler,
  onSubmitHandler,
  isLoading
}) => {
  const { text, attached, preview } = state

  const themeColor = useSelector(state => state.themeColor.theme)
  const colors = useSelector(state => state.themeColor.colors)
  const mobileNavState = useSelector(state => state.mobileNav)

  const [isChatRoomColorOn, setIsChatRoomColorOn] = useState(false)

  const dispatch = useDispatch()

  const changeChatRoomColor = idx => {
    dispatch(resetThemeColor())
    dispatch(setThemeColor(idx))

    setIsChatRoomColorOn(false)
  }

  return (
    <div className={`form-container ${themeColor}`}>
      {mobileNavState.left ? (
        <ArrowDownLeftIcon
          onClick={() => dispatch(activateMobileNavLeft())}
          className="mobile-nav-btn left"
        />
      ) : (
        <Squares2X2Icon
          onClick={() => dispatch(activateMobileNavLeft())}
          className="mobile-nav-btn left"
        />
      )}
      {mobileNavState.right ? (
        <ArrowDownRightIcon
          className="mobile-nav-btn right"
          onClick={() => dispatch(activateMobileNavRight())}
        />
      ) : (
        <AtSymbolIcon
          onClick={() => dispatch(activateMobileNavRight())}
          className="mobile-nav-btn right"
        />
      )}
      {isLoading && <Spinner />}
      {preview && (
        <div className={`p-3 position-relative attachment-box ${themeColor}`}>
          <img
            src={preview}
            alt={attached.name}
            onLoad={() => URL.revokeObjectURL(preview)}
            onClick={() =>
              setState(state => ({
                ...state,
                attached: '',
                preview: ''
              }))
            }
          />
        </div>
      )}
      <div className="px-4 py-3 d-flex align-items-center input-box">
        <input
          type="text"
          name="text"
          value={text}
          onChange={onChangeHandler}
          onKeyUp={e => e.key === 'Enter' && onSubmitHandler()}
          className={themeColor}
        />
        <div
          className={`position-relative d-flex justify-content-around form-btn-box texting-${(text ||
            attached) &&
            true}`}
        >
          <PaperAirplaneIcon onClick={() => onSubmitHandler()} />
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.gif,.mp3,.mp4,.dock,.pdf"
            multiple={false}
            noClick={true}
            onDrop={acceptedFiles =>
              setState(state => ({
                ...state,
                attached: acceptedFiles[0],
                preview: URL.createObjectURL(acceptedFiles[0])
              }))
            }
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon onClick={open} />
              </div>
            )}
          </Dropzone>

          <div
            className="spinner-grow spinner-grow-sm text-light m-2"
            role="status"
            onClick={() => console.log()}
          ></div>

          <HeartIcon onClick={() => setIsChatRoomColorOn(!isChatRoomColorOn)} />
          {isChatRoomColorOn && (
            <div className="position-absolute chat-room-color-box">
              {colors.map((color, idx) => (
                <div
                  className={`chat-room-color-btn ${color}`}
                  key={color + idx}
                  onClick={() => changeChatRoomColor(idx)}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BaseForm
