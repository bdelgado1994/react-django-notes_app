
import Layout from './components/Layout';
import Tasks from './components/Tasks';
import Add from './components/Add';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import TaskId from './components/TaskId';
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/",
          element: <Tasks />
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: ":taskId",
          element: <TaskId />
        },
        {
          path: "/edit/:taskId",
          element: <Add />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
/*
  <BrowserRouter >
  <Routes>
    <Route path='/' element={<Layout />} />
    <Route element={<Tasks />} />
  </Routes>
    </BrowserRouter >
*/