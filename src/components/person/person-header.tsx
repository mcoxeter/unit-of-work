import { UserOutlined } from '@ant-design/icons';
import { PageHeader, Button, Progress, Badge, Tag } from 'antd';
import { useContext } from 'react';
import { PersonContext } from '../../services/person-context';
import { Flex } from '../flex';

export const PersonHeader = () => {
  const personContext = useContext(PersonContext);
  if (!personContext) {
    return null;
  }

  const current = personContext.current();
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
        <Flex>
          <Tag>{personContext.changeCount()}</Tag>
          <Button
            type='primary'
            disabled={personContext.canUndo() === false}
            onClick={async () => await personContext.undo()}
          >
            Undo
          </Button>
          <Button
            type='primary'
            disabled={personContext.canRedo() === false}
            onClick={async () => await personContext.redo()}
          >
            Redo
          </Button>
          <Button
            type='primary'
            disabled={isModified === false}
            onClick={async () => await personContext.save()}
          >
            Save
          </Button>
          <Button
            type='default'
            disabled={isModified === false}
            onClick={() => personContext.rollback()}
          >
            Restore
          </Button>
          <Progress
            type='circle'
            format={() => (isModified ? 'Dirty' : 'Saved')}
            width={50}
            status={isModified ? 'exception' : 'success'}
          />
        </Flex>
      }
    ></PageHeader>
  );
};
