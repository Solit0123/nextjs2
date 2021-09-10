import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image';
import Link from 'next/link';



function Blog(props){

return(
  <>
  <h1>This is the home page for posts</h1>
  {props.post.map((post)=>{ 
   return (
     <div className='shadow card-body p-4 mb-4 border-success'>
     <Link href={"/" + post.id}> 
     <a><h1>{post.name}</h1></a> 
     </Link>
     
     <h2 className='card-title mt-3'>{post.username}</h2>
     <h3>{post.phone}</h3>
     </div>
)
   })}

</>
)

}



//nextjs has to fetch dataProps before it can load the page.
export async function getStaticProps() {

  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const post =  await res.json();


  const res2 = await fetch('https://jsonplaceholder.typicode.com/photos');
  const images = await res2.json();

return {
  props: {
    post, images
  },
revalidate: 10,
}
}





export default Blog