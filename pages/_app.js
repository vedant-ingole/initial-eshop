import '../styles/styles.css'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'

NProgress.configure({showSpinner: false})
NProgress.configure({ easing: 'ease', speed: 500 })
NProgress.configure({ trickleRate: 0.2, trickleSpeed: 620 })


Router.events.on('routeChangeStart', () =>  NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
        <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
        </Provider>
      
     )}

export default MyApp


// client side rendering
// Passing the api key through page props to the entire client side application
MyApp.getInitialProps = async () => {
  return{
    pageProps:{
      commercePublicKey : process.env.NEXT_PUBLIC_API_KEY,
      stripePublicKey : process.env.NEXT_STRIPE_PUBLIC_API_KEY
    },
  }
} 