import styled from 'styled-components';

const Button = styled.button`
  height: 35px;
  border-radius: 0;
  background-color: #383b40;
  border: 0;
  color: #fff;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  &:nth-child(2n) {
    background-color: #282a2d;
    color: rgb(224, 224, 224);
  }
  &:nth-child(2n + 1) {
    color: rgb(129, 162, 190);
  }
`;

const Td = styled.td`
  padding: 3px 10px;
  word-wrap: break-word;
  &:nth-child(2) {
    color: rgb(181, 189, 104);
  }
`;

const Title = styled.div`
  color: #fff;
  font-size: 14px;
  padding: 10px 20px;
  background-color: #383b40;
  margin-bottom: 6px;
`;

export { Button, Table, Tr, Td, Title };
