//this tells nextjs what pages to build based on paths needs to return params object with id and include fallback so that it renders new paths
import Image from 'next/image';

//this gets called everytime props context geta a valid id
const Details = ({data, data2}) => {
  return ( 
    <div className="card p-1 d-inline-block" >
    <div className="card-header p-3">{data.name}</div>
    <div className='card-title m-3'>{data.username}</div>
    <div className='card-body'>{data2.body}</div>
   
    </div>
   );
}


export async function getStaticPaths() {
  
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  const paths = data.map(user => {
    return {
      params: {id: user.id.toString()}
    }
  })

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
    return {
      paths,
      fallback: 'blocking'
    }
}
//path is for next to know all paths
//params is so that i can grab the context.params.id in Props
//fallback true = run to load that page. 
// false = error 404 page 

//i need to learn this wtf???? 
export async function getStaticProps(context) {


  const id = context.params.id;
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  const data = await res.json();

const res2 = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
const data2 = await res2.json();


if (!data) {
  return {
    notFound: true,
  }
}

if (!data2) {
  return {
    notFound: true,
  }
}





  return {
    props: {data, data2},
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10,
  }
}



/*
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
*/



export default Details;



