// Registration.js

import React from 'react';
import styles from './Registration.module.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../Redux/Slices/auth';
import { Navigate, Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Не удалось зарегистрироваться!');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const exitClick = () => {
    navigate("/")
  }

  return (
    <div className={styles.body}>
     <Paper sx={{ padding: '20px', width: '300px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}>
     <div onClick={exitClick} className={styles.exit}><LogoutIcon/></div>
        <Typography variant="h5" className={styles.title}>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Полное имя"
            variant="standard"
            type="text"
            fullWidth
            sx={{ marginBottom: 2 }}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName && 'Укажите полное имя'}
            {...register('fullName', { required: true })}
          />
          <TextField
            label="Email"
            variant="standard"
            type="email"
            fullWidth
            sx={{ marginBottom: 2 }}
            error={Boolean(errors.email)}
            helperText={errors.email && 'Укажите почту'}
            {...register('email', { required: true })}
          />
          <TextField
            label="Пароль"
            variant="standard"
            type="password"
            fullWidth
            sx={{ marginBottom: 2 }}
            error={Boolean(errors.password)}
            helperText={errors.password && 'Укажите пароль'}
            {...register('password', { required: true })}
          />
          <TextField
            label="URL аватарки"
            variant="standard"
            type="text"
            fullWidth
            sx={{ marginBottom: 2 }}
            {...register('avatarUrl')}
          />
          <Link className={styles.customButton} to="/login">
            Уже есть аккаунт? Войти
          </Link>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValid}
            className={styles.customButton2}
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Registration;
