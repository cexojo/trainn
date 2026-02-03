"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from './theme/AppTheme';
import { translations, Lang } from './i18n';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useColorScheme } from '@mui/material/styles';
import { FrontendError } from '@/utils/errors';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  // Set language, could be extended for dynamic usage
  const lang: Lang = "es";
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
  const [loading, setLoading] = React.useState(false);
  const { mode, setMode } = useColorScheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    // front end validate again for safety
    if (!username || username.trim().length === 0) {
      setUsernameError(true);
      setUsernameErrorMessage(translations[lang].loginUsernameRequired);
      setLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(translations[lang].signinPasswordTooShort);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (!response.ok) {
      setLoginError(data.error || translations[lang].signinLoginFailed);
      setSnackbarSeverity('error');
      setSnackbarMsg(data.error || translations[lang].signinLoginFailed);
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
      if (data && data.role) {
        // Remove existing auth cookie before storing new one (all paths/common variants)
        document.cookie = "elena_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "elena_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "elena_auth_token=; path=/training_schedule; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "elena_auth_token=; path=/menu; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        if (data.token) {
          document.cookie = `elena_auth_token=${data.token}; path=/; secure; samesite=lax`;
        }
        setSnackbarSeverity('success');
        setSnackbarMsg(translations[lang].signinLoginSuccess);
        setSnackbarOpen(true);
        setTimeout(() => {
          router.push('/dashboard');
          setLoading(false);
        }, 1200);
      } else {
        setLoginError(translations[lang].unexpectedResponse);
        setSnackbarSeverity('error');
        setSnackbarMsg(translations[lang].unexpectedResponse);
        setSnackbarOpen(true);
        setLoading(false);
      }
    } catch (err) {
      setLoginError(translations[lang].couldNotConnect);
      setSnackbarSeverity('error');
      setSnackbarMsg(translations[lang].couldNotConnect);
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const validateInputs = () => {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!username.value || username.value.trim().length === 0) {
      setUsernameError(true);
      setUsernameErrorMessage(translations[lang].loginUsernameRequired);
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(translations[lang].signinPasswordTooShort);
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        
        <Card variant="outlined">
          <img
            src="/elena_logo.png"
            alt="Elena Logo"
            width={160}
            height={80}
            style={{
              alignSelf: 'center',
              marginTop: 4,
              marginBottom: 4,
              border: '3px solid #000000',
              borderRadius: '12px',
              background: '#000000',
              objectFit: 'contain'
            }}
            loading="eager"
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">{translations[lang].loginUsernameLabel}</FormLabel>
              <TextField
                error={usernameError}
                helperText={usernameErrorMessage}
                id="username"
                name="username"
                placeholder={translations[lang].loginUsernamePlaceholder}
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={usernameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{translations[lang].signinPasswordLabel}</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder={translations[lang].signinPasswordPlaceholder}
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={validateInputs}
              disabled={loading}
              sx={{ position: 'relative', minHeight: 36 }}
            >
              {loading
                ? <CircularProgress size={24} color="inherit" sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                : translations[lang].signinButton
              }
            </Button>
          </Box>
        </Card>
      </SignInContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: '100%' }}
        >
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </AppTheme>
  );
}
