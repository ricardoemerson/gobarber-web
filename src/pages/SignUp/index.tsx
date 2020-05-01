import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Informe um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={ logoImg } alt="GoBarber" />

        <Form ref={ formRef } onSubmit={ handleSubmit }>
          <h1>Faça seu Cadastro</h1>

          <Input name="name" icon={ FiUser } placeholder="Nome" />
          <Input name="email" icon={ FiMail } placeholder="E-mail" />
          <Input name="password" icon={ FiLock } placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="new"><FiArrowLeft /> Voltar para logon</a>
      </Content>
    </Container>
  );
};

export default SignUp;
