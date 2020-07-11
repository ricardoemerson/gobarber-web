import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FiPower, FiClock } from 'react-icons/fi';

import { format, isToday, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-day-picker/lib/style.css';
import api from '../../services/api';

import {
  Container, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { user, signOut } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback(async (month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/providers/${ user.id }/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      });

      setMonthAvailability(data);
    })();
  }, [currentMonth, user.id]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      });

      const appointmentsFormatted = data.map((appointment: Appointment) => ({
        ...appointment,
        hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
      }));


      setAppointments(appointmentsFormatted);
    })();
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => format(selectedDate, "'Dia' dd 'de' MMM", { locale: ptBR }), [selectedDate]);

  const selectedWeekDay = useMemo(() => format(selectedDate, 'cccc', { locale: ptBR }), [selectedDate]);

  const morningAppointments = useMemo(() => appointments.filter(appointment => parseISO(appointment.date).getHours() < 12), [appointments]);

  const afternoonAppointments = useMemo(() => appointments.filter(appointment => parseISO(appointment.date).getHours() >= 12), [appointments]);

  const nextAppointment = useMemo(() => appointments.find(appointment => isAfter(parseISO(appointment.date), new Date())), [appointments]);

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
            { isToday(selectedDate) && <span>Hoje</span> }
            <span>{ selectedDateAsText }</span>
            <span>{ selectedWeekDay }</span>
          </p>

          { isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img src={ nextAppointment.user.avatar_url } alt={ nextAppointment.user.name } />

                <strong>{ nextAppointment.user.name }</strong>

                <span>
                  <FiClock />
                  { nextAppointment?.hourFormatted }
                </span>
              </div>
            </NextAppointment>
          ) }

          <Section>
            <strong>Manhã</strong>

            { !morningAppointments.length && (
              <p>Nenhum agendamento neste período.</p>
            ) }

            { morningAppointments.map(appointment => (
              <Appointment key={ appointment.id }>
                <span>
                  <FiClock />
                  { appointment.hourFormatted }
                </span>

                <div>
                  <img src={ appointment.user.avatar_url } alt={ appointment.user.name } />

                  <strong>{ appointment.user.name }</strong>
                </div>
              </Appointment>
            )) }
          </Section>

          <Section>
            <strong>Tarde</strong>

            { !afternoonAppointments.length && (
              <p>Nenhum agendamento neste período.</p>
            ) }

            { afternoonAppointments.map(appointment => (
              <Appointment key={ appointment.id }>
                <span>
                  <FiClock />
                  { appointment.hourFormatted }
                </span>

                <div>
                  <img src={ appointment.user.avatar_url } alt={ appointment.user.name } />

                  <strong>{ appointment.user.name }</strong>
                </div>
              </Appointment>
            )) }
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            fromMonth={ new Date() }
            disabledDays={ [{ daysOfWeek: [0, 6] }, ...disabledDays] }
            weekdaysShort={ ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] }
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={ handleDateChange }
            onMonthChange={ handleMonthChange }
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
