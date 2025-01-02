import React from 'react';
import styles from './Card.module.css';

const Card = ({ produto, addCarinho }) => {
  return (
    <div className={`${styles.produto} flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-md`}>
      <h3 className={`${styles.titulo} text-xl font-semibold`}>{produto.title}</h3>
      <img className={`${styles.imagem} w-48 h-48 object-cover rounded-md my-3`} src={produto.image} alt={`Imagem de ${produto.title}`} />
      <p className={`${styles.preco} text-lg font-bold text-gray-700`}>Custo total: {produto.price}€</p>
      <p className={`${styles.descricao} text-sm text-gray-500`}>{produto.description}</p>
      <p className={`${styles.rating} text-sm text-yellow-500`}>{produto.rating.rate} / 5.0 <span className={`${styles.star} text-yellow-400`}>★</span></p>
      <button className={`${styles.button} mt-3 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600`} onClick={() => addCarinho(produto)}>+ Carinho</button>
    </div>
  );
};

export default Card;