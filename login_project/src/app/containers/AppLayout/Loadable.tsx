/**
 * Asynchronously loads the component for HomePage
 */
 import styled from 'styled-components/macro';
import { lazyLoad } from 'utils/loadable';
 import { LoadingIndicator } from 'app/components/LoadingIndicator';
 
 const LoadingWrapper = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
 `;
 
 export const AppLayout = lazyLoad(
   () => import('./index'),
   module => module.AppLayout,
   {
     fallback: (
       <LoadingWrapper>
         <LoadingIndicator />
       </LoadingWrapper>
     ),
   },
 );
 