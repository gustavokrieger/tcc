import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {FontFamily} from '../../storage_items/FontFamily';

type Props = {
  className?: string;
  value: FontFamily;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FontFamilySetter(props: Props) {
  return (
    <div className={props.className}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Tipo da fonte</FormLabel>
        <RadioGroup
          aria-label="font-size"
          name="font-size1"
          value={props.value}
          onChange={props.handleChange}
        >
          <FormControlLabel
            value={FontFamily.ROBOTO}
            control={<Radio />}
            label="Roboto (padrão)"
          />
          <FormControlLabel
            value={FontFamily.OPEN_SANS}
            control={<Radio />}
            label="Open Sans"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
