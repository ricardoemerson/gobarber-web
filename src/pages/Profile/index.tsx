import React, { useCallback, useRef, ChangeEvent } from 'react';
import {
  FiMail, FiUser, FiLock, FiCamera, FiArrowLeft,
} from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AvatarInput } from './styles';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleAvatarChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const inputFile = new FormData();

      inputFile.append('avatar', e.target.files[0]);

      const { data } = await api.patch('/users/avatar', inputFile);

      updateUser(data);

      addToast({
        type: 'success',
        title: 'Avatar atualizado!',
      });
    }
  }, [addToast, updateUser]);

  const handleSubmit = useCallback(async (formData: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Informe um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required(('Campo obrigatório')),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required(('Campo obrigatório')),
          otherwise: Yup.string(),
        }).oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
      });

      await schema.validate(formData, { abortEarly: false });

      const {
        name, email, old_password, password, password_confirmation,
      } = formData;

      const userProfile = {
        name,
        email,
        ...(old_password ? { old_password, password, password_confirmation } : {}),
      };

      const { data } = await api.put('/profile', userProfile);

      updateUser(data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Perfil atualizado!',
        description: 'Suas informações do perfil foram atualizadas com sucesso!',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na atualização!',
        description: 'Ocorreu um erro ao atualizar o seu perfil, tente novamente.',
      });
    }
  }, [updateUser, history, addToast]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft size={ 26 } color="#999596" />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={ formRef }
          onSubmit={ handleSubmit }
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarInput>
            <img src={ user.avatar_url } alt={ user.name } />

            <label htmlFor="avatar">
              <FiCamera size={ 20 } color="#312e38" />

              <input type="file" id="avatar" onChange={ handleAvatarChange } />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input name="name" icon={ FiUser } placeholder="Nome" />
          <Input name="email" icon={ FiMail } placeholder="E-mail" />

          <Input name="old_password" icon={ FiLock } type="password" placeholder="Senha atual" containerStyle={{ marginTop: 24 }} />
          <Input name="password" icon={ FiLock } type="password" placeholder="Nova senha" />
          <Input name="password_confirmation" icon={ FiLock } type="password" placeholder="Confirmar senha" />

          <Button type="submit">Confirmar Mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
