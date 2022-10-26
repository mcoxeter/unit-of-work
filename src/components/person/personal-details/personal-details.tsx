import { Col, Collapse, DatePicker, Form, Row, Tag, Typography } from 'antd';
import { useContext, useState } from 'react';
import { PersonContext } from '../../../services/person-context';
import { useGetArrayData } from '../../../services/useGetArrayData';
import { DateEditor } from '../../basic-editors/date-editor';
import { LookupEditor } from '../../basic-editors/lookup-editor';
import { StringEditor } from '../../basic-editors/string-edititor';
import { IdList } from './id-list';
import { LinkList } from './link-list';
import { NameVariantList } from './name-variant-list';
import { OrcidIDList } from './orcid-id-list';
import { ProfileInformationList } from './profile-information-list';
import { TitleList } from './title-list';
const { Panel } = Collapse;
const { Text } = Typography;

export const PersonalDetails = () => {
  const countries = useGetArrayData<string>('countries');
  const personContext = useContext(PersonContext);
  const nameVariantTypes = useGetArrayData<string>('nameVariantTypes');
  const titleTypes = useGetArrayData<string>('titleTypes');
  const linkTypes = useGetArrayData<string>('linkTypes');
  const profileInformationTypes = useGetArrayData<string>(
    'profileInformationTypes'
  );
  const current = personContext.current();
  const [activePanels, setActivePanels] = useState<string[] | string>([]);

  if (current === undefined) {
    return null;
  }
  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <StringEditor
            label='Forename'
            value={current.forename}
            onChange={(forename) =>
              personContext.update({ ...current, forename })
            }
          />
          <StringEditor
            label='Surname'
            value={current.surname}
            onChange={(surname) =>
              personContext.update({ ...current, surname })
            }
          />
          <LookupEditor
            label='Gender'
            value={current.gender}
            onChange={(v) => personContext.update({ ...current, gender: v })}
            choices={['Male', 'Female', 'Unknown']}
          />
        </Col>
        <Col span={12}>
          <DateEditor
            label='Date of Birth'
            value={current.dob}
            onChange={(dob) => personContext.update({ ...current, dob })}
          />
          <LookupEditor
            label='Nationality'
            value={current.nationality}
            onChange={(v) =>
              personContext.update({ ...current, nationality: v })
            }
            choices={countries}
          />
          <DateEditor
            label='Start date as independent researched'
            value={current.startDateAsIndependentResearcher}
            onChange={(startDateAsIndependentResearcher) =>
              personContext.update({
                ...current,
                startDateAsIndependentResearcher
              })
            }
          />
          <DateEditor
            label='Retirement date'
            value={current.retirementDate}
            onChange={(retirementDate) =>
              personContext.update({
                ...current,
                retirementDate
              })
            }
          />
        </Col>
      </Row>
      <Collapse activeKey={activePanels} onChange={(v) => setActivePanels(v)}>
        <Panel
          key={'variant-list'}
          header={'Variants'}
          extra={current.nameVariants.map((v, i) => (
            <span key={i}>
              <Text>
                {v.forename} {v.surname}{' '}
              </Text>
              <Tag color='processing'>{v.type}</Tag>
            </span>
          ))}
        >
          <NameVariantList
            nameVariants={current.nameVariants}
            nameVariantTypes={nameVariantTypes}
            onChange={(v) =>
              personContext.update({ ...current, nameVariants: v })
            }
          />
        </Panel>
        <Panel
          key={'title-list'}
          header={`Titles`}
          extra={current.titles.map((v, i) => (
            <span key={i}>
              <Text>{v.title} </Text>
              <Tag color='processing'>{v.type}</Tag>
            </span>
          ))}
        >
          <TitleList
            titles={current.titles}
            titleTypes={titleTypes}
            onChange={(v) => personContext.update({ ...current, titles: v })}
          />
        </Panel>
        <Panel
          key={'id-list'}
          header={`IDs`}
          extra={current.personId.map((v, i) => (
            <span key={i}>
              <Text>{v.id} </Text>
              <Tag color='processing'>{v.type}</Tag>
            </span>
          ))}
        >
          <IdList
            ids={current.personId}
            idTypes={[]}
            onChange={(v) => personContext.update({ ...current, personId: v })}
          />
        </Panel>
        <Panel
          key={'orcidID-list'}
          header={`Orcid IDs`}
          extra={current.orcidId.map((v, i) => (
            <span key={i}>
              <Tag color='processing'>{v}</Tag>{' '}
            </span>
          ))}
        >
          <OrcidIDList
            orcidIDs={current.orcidId}
            onChange={(v) => personContext.update({ ...current, orcidId: v })}
          />
        </Panel>
        <Panel
          key={'link-list'}
          header={`Links`}
          extra={
            <Tag color='processing'>{`${current.links.length} link${
              current.links.length > 1 ? 's' : ''
            }`}</Tag>
          }
        >
          <LinkList
            links={current.links}
            linkTypes={linkTypes}
            onChange={(v) => personContext.update({ ...current, links: v })}
          />
        </Panel>
        <Panel
          key={'profile-information'}
          header={`Profile Information`}
          extra={
            <Tag color='processing'>{`${
              current.profileInformation.length
            } profile${current.profileInformation.length > 1 ? 's' : ''}`}</Tag>
          }
        >
          <ProfileInformationList
            profileInformations={current.profileInformation}
            profileInformationTypes={profileInformationTypes}
            onChange={(v) =>
              personContext.update({ ...current, profileInformation: v })
            }
          />
        </Panel>
      </Collapse>
    </>
  );
};
