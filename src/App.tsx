
import './i18n/i18n' // Ensure i18n is initialized before rendering
import '@ant-design/v5-patch-for-react-19';
import { createBrowserRouter, RouterProvider } from 'react-router'
import { MethodLayout } from './MethodLayout.tsx'
import { ConfigProvider } from 'antd';
import { Home } from './Pages/Home.tsx';
import { Tasks } from './Pages/Tasks.tsx';
import { Methods } from './Pages/Methods.tsx';
import { Settings } from './Pages/Settings.tsx';
import { MethodAll } from './Method/All.tsx';
import { MethodDetails } from './Method/Details.tsx';
import { MethodNew } from './Method/New.tsx';
import { LanguagePath } from './i18n/LanguagePath.tsx';
import { AutoLanguage } from './i18n/AutoLanguage.tsx';


const router = createBrowserRouter([
  {
    element: <MethodLayout />,
    children: [
      {
        index: true, // This will render when the path is exactly '/'
        element: <AutoLanguage />,
      },
      {
        path: '/:language',
        element: <LanguagePath />,
        children: [
          {
            index: true, // This will render when the path is exactly '/'
            element: <Home />,
          },
          {
            path: '/:language/tasks',
            element: <Tasks />,
          },
          {
            path: '/:language/methods',
            element: <Methods />,
            children: [
              {
                index: true, // This will render when the path is exactly '/methods'
                element: <MethodAll />,
              },
              {
                path: '/:language/methods/new',
                element: <MethodNew />,
              },
              {
                path: '/:language/methods/:methodId',
                element: <MethodDetails />,
              },

            ]
          },
          {
            path: '/:language/settings',
            element: <Settings />,
          }
        ]
      },

    ]
  },
])

export default function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ddbc1b', // primary color
          colorText: '#000000', // text color
          colorBgContainer: '#FFFFFF', // background color for containers
          colorBgElevated: '#FFFFFF', // elevated background color
          colorBgLayout: '#FFFFFF', // layout background color
          borderRadius: 20, // border radius
        },
        components: {
          Layout: {
            headerBg: '#FFFFFF',
          },
          Avatar: {
            colorTextPlaceholder: '#d3b628', // avatar bg color
          },
        },
        cssVar: true,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
