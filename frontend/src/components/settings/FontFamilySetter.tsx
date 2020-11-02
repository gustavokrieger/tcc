import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useHistory} from 'react-router-dom';
import StorageItemCreator from '../../storage_items/StorageItemCreator';
import {FontFamily} from '../../storage_items/FontFamily';

type Props = {
  className?: string;
};

export default function FontFamilySetter(props: Props) {
  const history = useHistory();
  const storageFontFamily = StorageItemCreator.createFontFamily();

  const [value, setValue] = React.useState<FontFamily>(
    storageFontFamily.getCurrentOrDefault()
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value as FontFamily;
    setValue(newValue);
    storageFontFamily.setValue(newValue);
    reloadPage();
  };

  function reloadPage() {
    history.go(0);
  }

  return (
    <div className={props.className}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Tipo da fonte</FormLabel>
        <RadioGroup
          aria-label="font-size"
          name="font-size1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value={FontFamily.ROBOTO}
            control={<Radio />}
            label="Roboto"
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
