"use client";

import React, { useEffect } from 'react';
import Head from 'next/head';

interface PageProps {
  title?: string;
}

const Page: React.FC<PageProps> = ({ title = 'Página Padrão' }) => {
  useEffect(() => {
    // Manipula o DOM após a renderização no cliente
    const p = document.querySelector('p');
    const button = document.querySelector('button');

    if (p && button) {
      let count = 0;
      p.innerHTML = count.toString();

      button.addEventListener('click', () => {
        count++;
        p.innerHTML = count.toString();
      });
    }
  }, []); // Array vazio para executar apenas uma vez

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Counter</h1>
        <p>0</p>
        <button>Incrementar</button>
      </div>
    </>
  );
};

export default Page;