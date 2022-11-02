###### Connect To Front-end

# Icon, UploadButton Component

# App, Button, Icon Component

---

## index.html

---

```html
<script type="module" src="main.js"></script>
```

index.html에서 Entry 파일인 `main.js`를 불러온다.

## main.js

---

```jsx
import App from './components/App.js'

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

App 컴포넌트를 import해와서 `document.getElementById('root')`에 render를 해준다.

## components/App.js

---

```jsx
import Button from "./Button.js";

const App = () => {
  return (
    <>
      <Button isActive={true}/>
      <Button isActive={false}/>
    </>
  )
}

export default App;
```

Button 컴포넌트를 import해와서 render.

그때, Button 컴포넌트에 버튼 활성화 유무를 결정 지어 줄  props인 isActive를 넘겨준다.

## components/Button.js

---

```jsx
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
```

1. state
    
    ```jsx
      const [button, setButton] = React.useState('');
      const buttonInfo = {
        idle: ['업로드', '../assets/upload-Icons.svg'],
        pending: ['업로드 중', '../assets/loading-spinner.svg'],
        resolved: ['완료', '../assets/complete-icons.svg'],
        rejected: ['실패', '../assets/fail-icons.svg'],
        disabled: ['업로드', '../assets/not-allow-icons.svg'],
      }
    	// ...
    
      return (
        <button onClick={uploadFile} disabled={!isActive} >
          <span>{button && buttonInfo[button][0]}</span>
          <Icon path={button && buttonInfo[button][1]} iconState={button && buttonInfo[button][0]}/>
        </button>
      )
    ```
    
    - button state와 버튼의 정보를 모아둔 buttonInfo 객체를 통해서 버튼의 view를 결정한다.
2. 버튼 활성화
    
    ```
    React.useEffect(() => {
        setButton(isActive ? 'idle' : 'disabled');
      }, [])
    ```
    
    - 첫 렌더 시, props로 받아온 isActive를 통해서 button 상태를 결정한다.
3. Icon 컴포넌트 사용
    
    ```jsx
    import Icon from './Icon.js'
    
    <button onClick={uploadFile} disabled={!isActive} >
      <span>{button && buttonInfo[button][0]}</span>
      <Icon path={button && buttonInfo[button][1]} iconState={button && buttonInfo[button][0]}/>
    </button>
    ```
    
    - Icon 컴포넌트를 import해와서 사용
    - Icon 컴포넌트의 props로 경로와 대체 텍스트로 사용할 정보를 넘겨준다.
4. 버튼 기능
    
    ```jsx
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
    
    <button onClick={uploadFile} disabled={!isActive} >
    	/// ...
    </button>
    ```
    
    - button 클릭시 uploadFile 함수 호출
    - uploadFile 함수 호출되면, 곧바로 button state를 ‘pending’으로 업데이트시킴으로써 버튼의 view를 ‘업로드 중’으로 바꾸고, api를 대체한 `setTimeout(() ⇒ {}, 2000)`으로 2초 뒤에 다시 button state를 ‘resolved’ 또는 ‘rejected’으로 업데이트 시켜서 버튼의 view를 다시 변경시킨다.
    - 이때 완료, 실패의 확률은 각각 50%.

## components/Icon.js

---

```jsx
const Icon = ({path, iconState}) => {
  return (
    <img src={path} alt={iconState} />
  )
}

export default Icon
```

- props로 받아온 path와 iconState를 통해 svg와 대체 텍스트를 결정한다.
