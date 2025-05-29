
import './i18n/i18n' // Ensure i18n is initialized before rendering
import '@ant-design/v5-patch-for-react-19';
import { createBrowserRouter, RouterProvider } from 'react-router'
import { MethodLayout } from './MethodLayout.tsx'
import { ConfigProvider } from 'antd';
import { Home } from './Pages/Home.tsx';
import { Tasks } from './Pages/Tasks.tsx';
import { Methods } from './Pages/Methods.tsx';
import { Settings } from './Pages/Settings.tsx';


const router = createBrowserRouter([
  {
    element: <MethodLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },
      {
        path: '/methods',
        element: <Methods />,
      },
      {
        path: '/settings',
        element: <Settings />,
      }
    ]
  },
])

export default function App() {

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#FFFFFF',
            headerColor: '#000000',
            siderBg: '#FFFFFF',
            bodyBg: '#FFFFFF',
          },
          Avatar: {
            colorTextPlaceholder: '#e3c55f', // avatar bg color
          },
        },
        cssVar: true,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
