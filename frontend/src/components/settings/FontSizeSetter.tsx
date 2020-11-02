import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useHistory} from 'react-router-dom';
import {FontSize} from '../../storage_items/FontSize';
import StorageItemCreator from '../../storage_items/StorageItemCreator';

type Props = {
  className?: string;
};

export default function FontSizeSetter(props: Props) {
  const history = useHistory();
  const storageFontSize = StorageItemCreator.createFontSize();

  const [value, setValue] = React.useState<FontSize>(
    storageFontSize.getCurrentOrDefault()
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value as FontSize;
    setValue(newValue);
    storageFontSize.setValue(newValue);
    reloadPage();
  };

  function reloadPage() {
    history.go(0);
  }

  return (
    <div className={props.className}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Tamanho da fonte</FormLabel>
        <RadioGroup
          aria-label="font-size"
          name="font-size1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value={FontSize.BIG}
            control={<Radio />}
            label="Grande"
          />
          <FormControlLabel
            value={FontSize.NORMAL}
            control={<Radio />}
            label="Normal"
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
