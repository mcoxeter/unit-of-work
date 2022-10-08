import { UserOutlined } from '@ant-design/icons';
import { PageHeader, Button, Progress } from 'antd';
import { useContext } from 'react';
import { PersonContext } from '../../services/person-context';

export const PersonHeader = () => {
  const personContext = useContext(PersonContext);
  const current = personContext.current();
  if (current === undefined) {
    return null;
  }
  const isModified = personContext.isModified();

  return (
    <PageHeader
      title='Person'
      avatar={{
        size: 64,
        icon: <UserOutlined />,
        src: 'http://localhost:4000/static/michael coxeter.jpg'
      }}
      subTitle={`${current.forename} ${current.surname}`}
      extra={
        <>
          <Button
            type='primary'
            disabled={isModified === false}
            onClick={async () => await personContext.save()}
          >
            Save
          </Button>
          ,
          <Button
            type='default'
            disabled={isModified === false}
            onClick={() => personContext.rollback()}
          >
            Restore
          </Button>
          ,
          <Progress
            type='circle'
            format={() => (isModified ? 'Dirty' : 'Saved')}
            width={50}
            status={isModified ? 'exception' : 'success'}
          />
        </>
      }
    ></PageHeader>
  );
};
