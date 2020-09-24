import React, {useEffect, useState} from 'react';
import {RouteComponentProps, useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import SimpleCard from '../components/SimpleCard';
import SimpleTabs from '../components/SimpleTabs';
import CodeWithViolation from '../CodeWithViolation';

type Params = {
  title: string;
};

type Props = {
  codeWithViolation: CodeWithViolation;
};

export default function ViolationCase(
  props: RouteComponentProps<{}, any, Props | any> // "any" is a Workaround.
) {
  const {title} = useParams<Params>();
  const codeWithViolation: CodeWithViolation =
    props.location.state.codeWithViolation;
  const codeSectionContainingCodeSmell: string = codeWithViolation.getCodeThatCausedViolation();

  const [codeCard, setCodeCard] = useState(<></>);
  const [descriptionCard, setDescriptionCard] = useState(<></>);

  useEffect(() => {
    function renderCodeCard(): JSX.Element {
      return (
        <SimpleCard>
          <Typography
            variant="body2"
            component="p"
            style={{whiteSpace: 'pre-wrap'}}
          >
            {codeWithViolation.getCodeBeforeViolation()}
            <mark>{codeSectionContainingCodeSmell}</mark>
            {codeWithViolation.getCodeAfterViolation()}
          </Typography>
        </SimpleCard>
      );
    }

    setCodeCard(renderCodeCard());
  }, [codeWithViolation, codeSectionContainingCodeSmell]);

  useEffect(() => {
    function renderDescriptionCard(): JSX.Element {
      return (
        <SimpleCard>
          <Typography variant="body2" component="p">
            {codeWithViolation.getViolationDescription(
              codeSectionContainingCodeSmell
            )}
          </Typography>
        </SimpleCard>
      );
    }

    setDescriptionCard(renderDescriptionCard());
  }, [codeWithViolation, codeSectionContainingCodeSmell]);

  return (
    <div className="violation-case">
      <Typography variant="h3">{title}</Typography>
      <SimpleTabs
        itemOne={codeCard}
        itemTwo={descriptionCard}
        itemThree={<SimpleCard>hold</SimpleCard>}
      />
    </div>
  );
}
