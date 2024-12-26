'use client'

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import Carinho from '@/components/Card/Carinho';
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

  const removeCarinho = (produto: Product) => {
    const newCarinho = carinho.filter(item => item.id !== produto.id);
    setCarinho(newCarinho);
    localStorage.setItem("cart", JSON.stringify(newCarinho));
  };

  const buy = () => {

    fetch("API/deisishop/buy", {
      method: "POST",
      body: JSON.stringify({
        products: carinho.map(product => product.id),
        name: "",
        student: false,
        coupon: ""
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(response => {
      console.log(response);
      setCarinho([]);
      localStorage.setItem('cart', JSON.stringify([]))
    }).catch(() => {
      console.log("error ao comprar");
    });

  }

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

        <button className={styles.comprar} onClick={() => buy()}>Comprar</button>

        <section className={styles.dadosDeCompra}>
          <h3>Produtos no Carrinho</h3>

          {carinho.map((produto) => (

            <Carinho key={produto.id} produto={produto} removeCarinho={removeCarinho} />

          ))}

        </section>

      </section>

    </section>

  );
}