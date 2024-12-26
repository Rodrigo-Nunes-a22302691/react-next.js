import React from 'react';
import Card from '@/components/Card/Tecnologias';  // Importe o componente Card
import produtos from './/private/produtos.json';  // Importando os produtos do arquivo JSON
import styles from '@/components/Card/Card.module.css'; 

export default function Page() {
  return (
    <section className="loja">

      <h2 className={styles.veja}> Veja as tecnologias </h2>

      <section className="produtos">
        {produtos.map((produto) => (
          <Card key={produto.id} produto={produto} />  /* Passando cada produto como prop */
        ))}
      </section>

    </section>
  );
}