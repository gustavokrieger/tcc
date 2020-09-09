import React from 'react';
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

  function renderCodeCard(codeWithViolation: CodeWithViolation): JSX.Element {
    return (
      <SimpleCard>
        <Typography
          variant="body2"
          component="p"
          style={{whiteSpace: 'pre-wrap'}}
        >
          {codeWithViolation.getCodeBeforeViolation()}
          <mark>{codeWithViolation.getCodeThatCausedViolation()}</mark>
          {codeWithViolation.getCodeAfterViolation()}
        </Typography>
      </SimpleCard>
    );
  }

  return (
    <div className="violation-case">
      <Typography variant="h3">{title}</Typography>
      <SimpleTabs
        itemOne={renderCodeCard(codeWithViolation)}
        itemTwo={<SimpleCard>hold</SimpleCard>}
        itemThree={<SimpleCard>hold</SimpleCard>}
      />
    </div>
  );
}
