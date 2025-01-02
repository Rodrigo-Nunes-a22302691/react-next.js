import React from 'react';
import styles from './Card.module.css'; 

const Card = ({ produto, removeCarinho }) => {
  return (
    <div className={styles.produtoCarinho}>
      <h3>{produto.title}</h3>
      <img className={styles.imagem} src={produto.image} alt={`Imagem de ${produto.title}`} />
      <p className={styles.preco}>Custo total: {produto.price}€</p>
      <p className={styles.rating}>{produto.rating.rate} / 5.0 <span className={styles.star}>★</span></p>
      <button className={styles.button}  onClick={ () => removeCarinho(produto)}> -Remover </button>
    </div>
  );
};

export default Card;