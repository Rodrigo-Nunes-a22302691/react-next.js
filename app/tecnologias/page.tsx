import React from 'react';
import Card from '@/components/Card/Tecnologias'; 
import produtos from './/private/produtos.json'; 
import styles from '@/components/Card/Card.module.css'; 

export default function Page() {
  return (
    <section className="loja">

      <h2 className={styles.veja}> Veja as tecnologias </h2>

      <section className={styles.produtos}>
        {produtos.map((produto) => (
          <Card key={produto.id} produto={produto} /> 
        ))}
      </section>

    </section>
  );
}