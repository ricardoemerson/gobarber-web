import React from 'react';
import {
  FiArrowLeft, FiMail, FiUser, FiLock,
} from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={ logoImg } alt="GoBarber" />

      <form>
        <h1>Faça seu Cadastro</h1>

        <Input name="name" icon={ FiUser } placeholder="Nome" />
        <Input name="email" icon={ FiMail } placeholder="E-mail" />
        <Input name="password" icon={ FiLock } placeholder="Senha" />

        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="new"><FiArrowLeft /> Voltar para logon</a>
    </Content>
  </Container>
);

export default SignUp;
