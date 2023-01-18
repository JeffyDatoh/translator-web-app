import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { styled, Container, Box, Tab, Grid, TextField, Tooltip, Tabs, Typography, IconButton } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const TabBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
  maxWidth: "md",
});

const TransField = styled(TextField)({
  width: '300px',
  backgroundColor: '#F5F5F5',
});

const Index = () => {
  const [text, setText] = useState();
  const [translate, setTranslate] = useState();
  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('th');

  // Tabs
  const [value_s, setValue_s] = useState(0);
  const [value_t, setValue_t] = useState(1);

  const languages = [
    {
      Name: "English",
      langcode: "en",
    },
    {
      Name: "THAI",
      langcode: "th",
    },
    {
      Name: "SPANISH",
      langcode: "es",
    }];

  const handleChange_s = (event, newValue) => {
    setValue_s(newValue);
  };
  const handleChange_t = (event, newValue) => {
    setValue_t(newValue);
  };
  const handleSwap = () => {
    setSource(target);
    setTarget(source);
    setValue_s(value_t);
    setValue_t(value_s);
    setText(translate);
    setTranslate(text);
  };

  var data = qs.stringify({
    'q': text,
    'source': source,
    'target': target,
    'format': 'text'
  });

  var config = {
    method: 'post',
    url: 'https://translation.googleapis.com/language/translate/v2',
    headers: {
      // api key
      'X-goog-api-key': '',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      setTranslate(response.data.data.translations[0].translatedText);
      console.log(translate);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontFamily: 'Monospace' }}>
          Translator Web Application
        </Typography>

        {/* Languages Tab */}
        <TabBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value_s}
            onChange={handleChange_s}
          >
            {languages.map((item) => (
              <Tab sx={{ fontFamily: 'Monospace' }} key={item.langcode} label={item.Name} onClick={() => { setSource(item.langcode) }} />
            ))}
          </Tabs>

          <Tooltip title="Swap languages" sx={{ width: 47 }}>
            <IconButton onClick={() => { handleSwap() }}>
              <SwapHorizIcon />
            </IconButton>
          </Tooltip>

          <Tabs
            value={value_t}
            onChange={handleChange_t}
            textColor="secondary"
            indicatorColor="secondary"
          >
            {languages.map((item) => (
              <Tab sx={{ fontFamily: 'Monospace' }} key={item.langcode} label={item.Name} onClick={() => { setTarget(item.langcode) }} />
            ))}
          </Tabs>
        </TabBox>

        {/* Text Field */}
        <Grid container sx={{ justifyContent: 'center', mt: 1, width: 'md' }}>
          <Grid item >
            <TextField
              variant="outlined"
              sx={{ width: '300px' }}
              value={text}
              multiline
              inputProps={{ maxLength: 1000 }}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TransField
              disabled
              variant="outlined"
              value={translate}
              multiline
              placeholder="Translation"
            />
          </Grid>
        </Grid>

        {/* Counter character */}
        <Typography variant="h6" gutterBottom sx={{ mt: 1, textAlign: 'center', fontFamily: 'Monospace' }}>
          {text?.length} / 1000
        </Typography>

      </Box>
    </Container>
  )
}

export default Index