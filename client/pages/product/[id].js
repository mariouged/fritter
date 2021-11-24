import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/socket';

export default function ProductInfo() {

  const socket = useContext(SocketContext);

  const router = useRouter();
  
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleUpdateProduct = useCallback((update) => {
    console.log(update, product);
    setProduct(update.data)
  },[product])

  useEffect(() => {
    socket.on('update_product', handleUpdateProduct);
    return () => {
      socket.off('update_product', handleUpdateProduct)
    }
  }, [socket, product]);


  useEffect( () => {
    setLoading(true);
    const { id } = router.query;
    const url_product_Service = `http://172.16.240.10:3000/api/v1/product/${id}`;
    console.log(url_product_Service);
    axios.get(url_product_Service)
      .then( res => {
        console.log(res);
        setProduct(res.data.data);
        
      })
      .catch( err => console.log(err));
      console.log(product);
      setLoading(false);
  }, [router]);


  return (
    <div className="container px-4">
      <Head>
        <title>Products lists</title>
        <meta name="description" content="Products list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         {product?.name  || 'Product not found'}
        </h1>
        {loading && <p>loading...</p>}
        <div className={styles.grid}>
          {product && (
            <div key={product.id} className={styles.card}>
              <h2>{product.name} &rarr;</h2>
              <p>{product.description}</p>
              <p className={styles.price}>{product.price}{' €'}</p>
            </div>
          )}
        </div>
        <Link href="../">
          <a>&larr; Back</a>
        </Link>
      </main>

      <footer className={styles.footer}>
          Powered by me
      </footer>
    </div>
  )
}
