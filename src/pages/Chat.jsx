import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  activateMobileNavLeft,
  resetMobileNavState
} from '../slices/mobileNav/mobileNavSlice'
import {
  MultiChatWindow,
  MultiChatSocket,
  useMultiChatLogic
} from 'react-chat-engine-advanced'

import ChatForm from '../components/customChatForm'
import Header from '../components/customHeader'
import AiChatForm from '../components/customMessageForms/AiChatForm'

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
    user,
    secret
  )

  const themeColor = useSelector(state => state.themeColor.theme)
  const mobileNav = useSelector(state => state.mobileNav)

  const dispatch = useDispatch()

  const ref = useRef(null)

  useEffect(() => {
    const chatRoom = ref.current.children[0]

    const mobileBtnLeft = chatRoom.children[3]
    const mobileBtnRight = chatRoom.children[4]

    chatRoom.removeChild(mobileBtnLeft)
    chatRoom.removeChild(mobileBtnRight)

    dispatch(activateMobileNavLeft())
  }, [])

  useEffect(() => {
    const chatRoom = ref.current.children[0]

    const chatRoomList = chatRoom.children[0].children[0].childNodes

    for (let i = 1; i < chatRoomList.length; i++) {
      chatRoomList[i].addEventListener('click', () =>
        dispatch(resetMobileNavState())
      )
    }

    return () => {
      for (let i = 1; i < chatRoomList.length; i++) {
        chatRoomList[i].removeEventListener('click', () =>
          dispatch(resetMobileNavState())
        )
      }
    }
  }, [dispatch, mobileNav.left])

  return (
    <main
      ref={ref}
      className={`${themeColor} ${mobileNav.left &&
        'mobile-nav-left-active'} ${mobileNav.right &&
        'mobile-nav-right-active'}`}
    >
      <MultiChatWindow
        {...chatProps}
        renderChatForm={props => <ChatForm props={props} />}
        renderChatHeader={chat => <Header chat={chat} />}
        renderMessageForm={props => {
          return <AiChatForm props={props} activeChat={chatProps.chat} />
        }}
      />
      <MultiChatSocket {...chatProps} />
    </main>
  )
}

export default Chat
