import { Alert, Card, Typography } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';

import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import styles from './Welcome.less';

const CodePreview: React.FC<{ children: string }> = props => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{props.children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.'
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24
          }}
        />
        <Typography.Text strong>
          <FormattedMessage id="pages.welcome.advancedComponent" defaultMessage="Advanced Form" />{' '}
          <a href="https://procomponents.ant.design/components/table" rel="noopener noreferrer" target="__blank">
            <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-table</CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12
          }}
        >
          <FormattedMessage id="pages.welcome.advancedLayout" defaultMessage="Advanced layout" />{' '}
          <a href="https://procomponents.ant.design/components" rel="noopener noreferrer" target="__blank">
            <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-components</CodePreview>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
