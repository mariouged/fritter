
  
import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import CardProduct from '../components/product/cardProduct';

const MAX_PRODUCTS = 10;

export function HomeSkeleton() {
  const makeSkeletonForProducts = () => {
    const cards = [];
    for (let i = 0; i < MAX_PRODUCTS; i++) {
      cards.push(<CardProduct key={i} product={null} isLoading={true} />);
    }
    return cards;
  }

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
        <div className="w-48 rounded-md h-4 bg-gray-200 animate-pulse" />
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-6">
          {makeSkeletonForProducts()}
        </div>
      </main>

      <footer className={styles.footer}>
          Powered by me
      </footer>
    </div>
  )
}
