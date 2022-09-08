import "./App.css";
import Edit from "./Edit";

const App = () => {
  return (
    <div
      onInput={(e) => {
        console.log("HTML IS", e.currentTarget.innerHTML);
      }}
    >
      <Edit />
    </div>
  );
};

export default App;
