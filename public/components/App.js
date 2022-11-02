import Button from "./Button.js";

var App = function App() {
  return React.createElement(React.Fragment, null, React.createElement(Button, {
    isActive: true
  }), React.createElement(Button, {
    isActive: false
  }));
};

export default App;
//# sourceMappingURL=App.js.map