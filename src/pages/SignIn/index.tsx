import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={ logoImg } alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>

        <Input name="email" icon={ FiMail } placeholder="E-mail" />
        <Input name="password" icon={ FiLock } placeholder="Senha" />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="new"><FiLogIn /> Criar conta</a>
    </Content>

    <Background />
  </Container>
);

export default SignIn;
