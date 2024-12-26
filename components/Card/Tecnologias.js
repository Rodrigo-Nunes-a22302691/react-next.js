import React from 'react';
import styles from './Card.module.css'; 

const Card = ({ produto}) => {
  return (
    <div className={styles.produto}>  {/* Usando a classe como uma propriedade do objeto styles */}
      <h3>{produto.title}</h3>
      <img className={styles.imagem} src={produto.image} alt={`Imagem de ${produto.title}`} />
      <p className={styles.preco}>Custo total: {produto.price}€</p>
      <p className={styles.descricao}>{produto.description}</p>
      <p className={styles.rating}>{produto.rating.rate} / 5.0 <span className={styles.star}>★</span></p>
    </div>
  );
};

export default Card;