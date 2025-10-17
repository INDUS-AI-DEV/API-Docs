import React, {useState, useCallback} from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './CopyableCode.module.css';

export default function CopyableCode({language, children, className, title, showLineNumbers}) {
  const [copied, setCopied] = useState(false);

  const codeString = typeof children === 'string' ? children : String(children ?? '');

  const copy = useCallback(async () => {
    const text = codeString;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      setCopied(false);
    }
  }, [codeString]);

  return (
    <div className={styles.wrapper}>
      <CodeBlock language={language} className={className} title={title} showLineNumbers={showLineNumbers}>
        {codeString}
      </CodeBlock>
      <button type="button" className={styles.copyBtn} onClick={copy} aria-label="Copy code">
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

