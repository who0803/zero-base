import Icon from './Icon.js';

var Button = function Button(_ref) {
  var isActive = _ref.isActive;

  var _React$useState = React.useState(''),
      button = _React$useState[0],
      setButton = _React$useState[1];

  var buttonInfo = {
    idle: ['업로드', '../assets/upload-Icons.svg'],
    pending: ['업로드 중', '../assets/loading-spinner.svg'],
    resolved: ['완료', '../assets/complete-icons.svg'],
    rejected: ['실패', '../assets/fail-icons.svg'],
    disabled: ['업로드', '../assets/not-allow-icons.svg']
  };

  var uploadFile = function uploadFile() {
    setButton('pending');
    if (button === 'pending') return;
    var timerId = setTimeout(function () {
      setButton(Math.floor(Math.random() * 10) % 2 === 0 ? 'resolved' : 'rejected');
      clearTimeout(timerId);
    }, 2000);
  };

  React.useEffect(function () {
    setButton(isActive ? 'idle' : 'disabled');
  }, []);
  return React.createElement("button", {
    onClick: uploadFile,
    disabled: !isActive
  }, React.createElement("span", null, button && buttonInfo[button][0]), React.createElement(Icon, {
    path: button && buttonInfo[button][1],
    iconState: button && buttonInfo[button][0]
  }));
};

export default Button;
//# sourceMappingURL=Button.js.map