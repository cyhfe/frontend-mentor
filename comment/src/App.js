import CommentList from "./components/CommentList"
import AddComment from "./components/AddComment"
import { Provider } from "./context/index"
function App() {
  return (
    <Provider>
      <div className="app">
        <CommentList />
        <AddComment />
      </div>
    </Provider>
  )
}

export default App
