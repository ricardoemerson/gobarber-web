import React, { useState, useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FiPower, FiClock } from 'react-icons/fi';

import 'react-day-picker/lib/style.css';

import {
  Container, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user, signOut } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={ logoImg } alt="GoBarber" />

          <Profile>
            <img src={ user.avatar_url } alt={ user.name } />

            <div>
              <span>Bem-vindo,</span>
              <strong>{ user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={ signOut }><FiPower /></button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="https://avatars3.githubusercontent.com/u/2879795?s=460&u=05d07d6b755eec1da3f661930e1738e24d310e3f&v=4" alt="Ricardo Emerson" />

              <strong>Diego Fernandes</strong>

              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars3.githubusercontent.com/u/2879795?s=460&u=05d07d6b755eec1da3f661930e1738e24d310e3f&v=4" alt="Ricardo Emerson" />

                <strong>Diego Fernandes</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars3.githubusercontent.com/u/2879795?s=460&u=05d07d6b755eec1da3f661930e1738e24d310e3f&v=4" alt="Ricardo Emerson" />

                <strong>Diego Fernandes</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars3.githubusercontent.com/u/2879795?s=460&u=05d07d6b755eec1da3f661930e1738e24d310e3f&v=4" alt="Ricardo Emerson" />

                <strong>Diego Fernandes</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            fromMonth={ new Date() }
            disabledDays={ [{ daysOfWeek: [0, 6] }] }
            weekdaysShort={ ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] }
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={ handleDateChange }
            selectedDays={ selectedDate }
            months={ [
              'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
              'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
            ] }
          />
        </Calendar>
      </Content>
    </Container>
  );
};
export default Dashboard;
