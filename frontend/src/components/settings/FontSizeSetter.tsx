import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {FontSize} from '../../storage_items/FontSize';

type Props = {
  className?: string;
  value: FontSize;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FontSizeSetter(props: Props) {
  return (
    <div className={props.className}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Tamanho da fonte</FormLabel>
        <RadioGroup
          aria-label="font-size"
          name="font-size1"
          value={props.value}
          onChange={props.handleChange}
        >
          <FormControlLabel
            value={FontSize.BIG}
            control={<Radio />}
            label="Grande"
          />
          <FormControlLabel
            value={FontSize.MEDIUM}
            control={<Radio />}
            label="Média (padrão)"
          />
          <FormControlLabel
            value={FontSize.SMALL}
            control={<Radio />}
            label="Pequena"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
