import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useHistory} from 'react-router-dom';

export default function FontSizeSetter() {
  const history = useHistory();

  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);
    let newFontSize: string;
    switch (newValue) {
      case 'big': {
        newFontSize = '16';
        break;
      }
      case 'normal': {
        newFontSize = '14';
        break;
      }
      case 'small': {
        newFontSize = '12';
        break;
      }
      default: {
        throw new Error();
      }
    }
    localStorage.setItem('fontSize', newFontSize);
    history.go(0);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Tamanho da fonte</FormLabel>
      <RadioGroup
        aria-label="font-size"
        name="font-size1"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="big" control={<Radio />} label="Grande" />
        <FormControlLabel value="normal" control={<Radio />} label="Normal" />
        <FormControlLabel value="small" control={<Radio />} label="Pequena" />
      </RadioGroup>
    </FormControl>
  );
}
