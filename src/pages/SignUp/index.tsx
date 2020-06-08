import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background, AnimationContainer } from './styles';

import logoImg from '../../assets/logo.svg';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpFormaData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormaData) => {
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

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode efetuar o seu logon no GoBarber!',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer o seu cadastro, tente novamente.',
      });
    }
  }, [history, addToast]);

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={ logoImg } alt="GoBarber" />

          <Form ref={ formRef } onSubmit={ handleSubmit }>
            <h1>Faça seu Cadastro</h1>

            <Input name="name" icon={ FiUser } placeholder="Nome" />
            <Input name="email" icon={ FiMail } placeholder="E-mail" />
            <Input name="password" icon={ FiLock } placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/"><FiArrowLeft /> Voltar para logon</Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;