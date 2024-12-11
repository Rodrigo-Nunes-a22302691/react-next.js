'use client'

import React from 'react';
import Card from '@/components/Card/Card';  // Importe o componente Card
import produtos from './private/produtos.json';  // Importando os produtos do arquivo JSON
import styles from '@/components/Card/Card.module.css'; 
import useSWR from 'swr';

import { Product } from '../models/interfaces'

export default function Page() {

  // Fetch
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR<Product[], Error>('API/Produtos', fetcher);


  // Handler de dados
  if (error){

    return <div> Erro a ler dados </div>

  } 

  if(isLoading){

    return <div> A ler... </div>

  }

  if(!data){

    return <div> Nao há dados </div>

  }


  // return
  return (

    <section className="loja">

      <h2 className={styles.veja}> Veja as tecnologias </h2>

      <section className="produtos">
        {data.map((produto) => (
          <Card key={produto.id} produto={produto} />  /* Passando cada produto como prop */
        ))}
      </section>

    </section>

  );
}