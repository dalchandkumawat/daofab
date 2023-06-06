import { useEffect, useState } from "react";
import "./App.css";
import Parent from "./components/Parent";
import Child from "./components/Child";

export const AVAILABLE_COMPONENTS = {
  PARENT: "PARENT",
  CHILD: "CHILD",
};

function App() {
  const [component, setComponent] = useState(AVAILABLE_COMPONENTS.PARENT);

  useEffect(() => {
    // Used Javascript native method to read URL paths for routing as we only have 2 routes
    if (window.location.pathname.includes("children")) {
      setComponent(AVAILABLE_COMPONENTS.CHILD);
    } else {
      setComponent(AVAILABLE_COMPONENTS.PARENT);
    }
  }, [window.location.pathname]);

  return (
    <div className="App">
      {component === AVAILABLE_COMPONENTS.PARENT && <Parent />}
      {component === AVAILABLE_COMPONENTS.CHILD && <Child />}
    </div>
  );
}

export default App;
