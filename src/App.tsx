import { useTranslation } from "react-i18next"

function App() {
  const { t, i18n } = useTranslation('test');

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('zh_CN')}>切换到中文</button>
      <button onClick={() => i18n.changeLanguage('en_US')}>Switch to English</button>
    </div>
  );
}

export default App
