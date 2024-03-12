import React from 'react';
import styles from './Login.module.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { fetchAuth, selectIsAuth } from '../../Redux/Slices/auth';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert('Не удалось авторизоваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Не удалось авторизоваться!');
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
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="E-Mail"
            type="email"
            variant="standard"
            fullWidth
            sx={{ marginBottom: 2 }}
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register("email", {required: "Укажите Почту"})}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="standard"
            fullWidth
            sx={{ marginBottom: 2 }}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register("password", {required: "Укажите Пароль"})}
          />
          <Link className={styles.customButton} to='/register'>Создать новый аккаунт</Link>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValid}
            className={styles.customButton2}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
