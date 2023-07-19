import { Helmet } from 'react-helmet-async';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import { GlobalStyle } from 'styles/global-styles';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Login } from '../Login';
//import { selectPopupMessage } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/slice';
import { Info } from '../Info';
//import { useMessage } from '../../../services/MessageService/MessageService';

export const AppLayout = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { t } = useTranslation();
  const appName = translations.name;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   showMessage({
  //     message: popupMessage.message,
  //     severity: popupMessage.severity,
  //     onClose: (event, reason) => {
  //       dispatch(actions.clearPopupMessage())
  //     }
  //   })
  // }, [popupMessage])

  return (
    <div>
      <Helmet>
        <title>login page</title>
      </Helmet>
      <PageWrapper>
        <BrowserRouter>
          <Routes>
            <Route path={`/login`} element={<Login setIsLogin={(isLogin) => setIsLogin(isLogin)} />} />
            <Route path={`/info`} element={isLogin ? <Info></Info> : <Navigate to={'/login'}></Navigate>} />
            <Route path={`/`} element={<Navigate to={!isLogin ? '/login' : `/info`}></Navigate>} />
            {/* <Route path={`/`} element={!isLogin ? <Navigate to={`/login`}></Navigate> : <Layout setIsLogin={(isLogin) => setIsLogin(isLogin)} />} /> */}
          </Routes>
        </BrowserRouter>
        <GlobalStyle />
      </PageWrapper>
    </div>
  );
};

const PageWrapper = styled.div`
  margin: 0 auto;
  box-sizing: content-box;
`;