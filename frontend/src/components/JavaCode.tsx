import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import '../prism.css';

type Props = {
  children: React.ReactNode;
};

export default function JavaCode(props: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className="language-java">{props.children}</code>
    </pre>
  );
}
