import Icon from './Icon.js'

const Button = ({isActive}) => {
  const [button, setButton] = React.useState('');
  const buttonInfo = {
    idle: ['업로드', '../assets/upload-Icons.svg'],
    pending: ['업로드 중', '../assets/loading-spinner.svg'],
    resolved: ['완료', '../assets/complete-icons.svg'],
    rejected: ['실패', '../assets/fail-icons.svg'],
    disabled: ['업로드', '../assets/not-allow-icons.svg'],
  }

  const uploadFile = () => {
    setButton('pending');
    
    if (button === 'pending') return;

    // api 요청 대체로 setTimeout 사용
    // 성공 실패 유무는 반반 확률로으로
    const timerId = setTimeout(() => {
      setButton(Math.floor(Math.random() * 10) % 2 === 0 ? 'resolved' : 'rejected');
      clearTimeout(timerId)
    }, 2000)
  }

  React.useEffect(() => {
    setButton(isActive ? 'idle' : 'disabled');
  }, [])



  return (
    <button onClick={uploadFile} disabled={!isActive} >
      <span>{button && buttonInfo[button][0]}</span>
      <Icon path={button && buttonInfo[button][1]} iconState={button && buttonInfo[button][0]}/>
    </button>
  )
}

export default Button;