import Head from 'next/head';
import Link from 'next/link'
import styles from '../styles/Home.module.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socket';
import { HomeSkeleton } from '../components/homeSkeleton';
import { useProducts } from '../lib/hooks/useProducts';
import CardProduct from '../components/product/cardProduct';

const Home = () => {

  const socket = useContext(SocketContext);
  
  const { products, mutateProducts, isLoading } = useProducts({ count: 0, rows: []});

  const handleNewProduct = useCallback((product) => {
    mutateProducts( oldProducts => ({ count: oldProducts.count + 1, rows: [ product.data, ...oldProducts.rows]}), false);
  },[products])

  useEffect(() => {
    socket.on('new_product', handleNewProduct);
    return () => {
      socket.off('new_product', handleNewProduct)
    }
  }, [socket, products]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Products lists</title>
        <meta name="description" content="Products list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         Products
        </h1>
        <p className="text-gray-800 text-xl text-left dark:text-white font-bold">
          Products count: {products?.count}
        </p>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-6">
          {products && products.rows.map(product => (
            <Link key={product.id} href={`product/${product.id}`}>
              <a>
              <CardProduct product={product} isLoading={isLoading} />
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
          Powered by me
      </footer>
    </div>
  )
}

Home.skeletonLoader = <HomeSkeleton />;

export default Home;