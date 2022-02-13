import CommentList from "./components/CommentList"
import CommentInput from "./components/AddComment"
import { Provider } from "./context/index"
function App() {
  return (
    <Provider>
      <div className="app">
        <CommentList />
        <CommentInput />
      </div>
    </Provider>
  )
}

export default App
