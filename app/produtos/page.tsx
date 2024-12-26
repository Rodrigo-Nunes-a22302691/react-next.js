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
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCarinho(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) => 
        product.title.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setProdutosFiltrados(newFilteredData);
    }
  }, [pesquisa, data]);

  const addCarinho = (produto: Product) => {
    const newCarinho = [...carinho, produto];
    setCarinho(newCarinho);
    localStorage.setItem("cart", JSON.stringify(newCarinho));
  };

  if (error) return <div>Erro a ler dados</div>;
  if (isLoading) return <div>A ler...</div>;
  if (!data) return <div>Nao há dados</div>;

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




      <section className={styles.compra}>
        <p className={styles.precoCarinho}>preço</p>
        <p>
          <span>És estudante da DEISI? <input type="checkbox" id="estudante" /></span>
          <span>Cupão de desconto: <input type="text" id="cupao" /></span>
        </p>
        <p>Diga a sua morada <input type="text" id="moradaInput" className="moradaInput" placeholder="Digite sua morada aqui" /></p>
        <button className={styles.comprar}>Comprar</button>

        <section className={styles.dadosDeCompra}>
          <h3>Produtos no Carrinho</h3>
          {carinho.map((produto) => (
            <Card key={produto.id} produto={produto} addCarinho={addCarinho} />
          ))}
        </section>
      </section>
    </section>
  );
}