'use client'

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import styles from '@/components/Card/Card.module.css';
import useSWR from 'swr';
import { Product } from '../models/interfaces';

export default function Page() {
  const [pesquisa, setPesquisa] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>([]);
  const [carinho, setCarinho] = useState<Product[]>([]);
  
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR<Product[], Error>('API/Produtos', fetcher);

  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) => 
        product.title.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setProdutosFiltrados(newFilteredData);
    }
  }, [pesquisa, data]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carinho))
  }, [carinho])

  if(localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  if (error) return <div>Erro a ler dados</div>;
  if (isLoading) return <div>A ler...</div>;
  if (!data) return <div>Nao há dados</div>;

  function addCarinho(product){

    setCarinho((prevCart) => [...prevCart, product]);

  }

  return (
    <section className="loja">
      <section className={styles.pesquisa}>
        <h2>Filters</h2>
        <section className={styles.pesquisaInputs}>
          <p>Pesquisa <input value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} placeholder='Pesquisa' type="text" /></p>
        </section>
      </section>

      <h2 className={styles.veja}>Veja os prodrutos</h2>

      <section className="produtos">
        {produtosFiltrados.map((produto) => (
          <Card key={produto.id} produto={produto} addCarinho={addCarinho} />
        ))}
      </section>

      <section className="produtos"> 

        let produtosCarinho = localStorage.getItem("cart");

        {produtosFiltrados.map((produtosCarinho) => (
          <Card key={produtosCarinho.id} produto={produtosCarinho} addCarinho={addCarinho} />
        ))}
      </section>

    </section>
  );
}