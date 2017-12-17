import React from 'react';
import styled from 'styled-components';
import Row from './row';

const UnstyledProductItem = ({ code, name, price, amount, ...props }) => (
  <div {...props}>
    <div>{code}</div>
    <strong>
      {name} × {amount}
    </strong>
    <div>{price.toPrecision(4)}€</div>
  </div>
);

const ProductItem = styled(UnstyledProductItem)`
  width: calc(100% * (1/3));
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  display: flex;
  padding: 1rem;
`;

const UnstyledProductGrid = ({ products, ...props }) => (
  <Row>
    <div {...props}>
      {products.map(product => <ProductItem key={product.id} {...product} />)}
    </div>
  </Row>
);

const ProductGrid = styled(UnstyledProductGrid)`
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
`;

export default ProductGrid;
