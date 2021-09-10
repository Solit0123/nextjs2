import Layout from '../components/layout';
import '../styles/global.css';
import '../styles/bootstrap.min.css';

export default function App({Component, pageProps}) {

    return(

        <Layout>
            <Component {...pageProps}/>
        </Layout>
    ) 
}