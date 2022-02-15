/** @jsxImportSource @emotion/react */

import CommentList from "./components/CommentList"
import { Provider } from "./context/index"
function App() {
  return (
    <Provider>
      <div className="app">
        <CommentList />
      </div>
    </Provider>
  )
}

export default App
