import { Col, Collapse, Row, Tag, Typography } from 'antd';
import { useContext, useState } from 'react';
import { PersonContext } from '../../../services/person-context';
import { useGetArrayData } from '../../../services/useGetArrayData';
import { DateEditor } from '../../basic-editors/date-editor';
import { LookupEditor } from '../../basic-editors/lookup-editor';
import { StringEditor } from '../../basic-editors/string-edititor';
import { IdList } from './id-list';
import { LinkList } from './link-list';
import { NameVariantList, NameVariantListSummary } from './name-variant-list';
import { OrcidIDList } from './orcid-id-list';
import { ProfileInformationList } from './profile-information-list';
import { TitleList, TitleListSummary } from './title-list';
const { Panel } = Collapse;
const { Text } = Typography;

export const PersonalDetails = () => {
  const countries = useGetArrayData<string>('countries');
  const cntx = useContext(PersonContext);
  const nameVariantTypes = useGetArrayData<string>('nameVariantTypes');
  const titleTypes = useGetArrayData<string>('titleTypes');
  const linkTypes = useGetArrayData<string>('linkTypes');
  const profileInformationTypes = useGetArrayData<string>(
    'profileInformationTypes'
  );
  const [activePanels, setActivePanels] = useState<string[] | string>([]);
  if (!cntx) {
    return null;
  }
  const person = cntx.current();

  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <StringEditor
            label='Forename'
            value={person.forename}
            onChange={(forename) => cntx.update({ ...person, forename })}
          />
          <StringEditor
            label='Surname'
            value={person.surname}
            onChange={(surname) => cntx.update({ ...person, surname })}
          />
          <LookupEditor
            label='Gender'
            value={person.gender}
            onChange={(v) => cntx.update({ ...person, gender: v })}
            choices={['Male', 'Female', 'Unknown']}
          />
        </Col>
        <Col span={12}>
          <DateEditor
            label='Date of Birth'
            value={person.dob}
            onChange={(dob) => cntx.update({ ...person, dob })}
          />
          <LookupEditor
            label='Nationality'
            value={person.nationality}
            onChange={(v) => cntx.update({ ...person, nationality: v })}
            choices={countries}
          />
          <DateEditor
            label='Start date as independent researched'
            value={person.startDateAsIndependentResearcher}
            onChange={(startDateAsIndependentResearcher) =>
              cntx.update({
                ...person,
                startDateAsIndependentResearcher
              })
            }
          />
          <DateEditor
            label='Retirement date'
            value={person.retirementDate}
            onChange={(retirementDate) =>
              cntx.update({
                ...person,
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
          extra={<NameVariantListSummary nameVariants={person.nameVariants} />}
        >
          <NameVariantList
            nameVariants={person.nameVariants}
            nameVariantTypes={nameVariantTypes}
            onChange={(nameVariants) =>
              cntx.update({ ...person, nameVariants })
            }
          />
        </Panel>
        <Panel
          key={'title-list'}
          header={`Titles`}
          extra={<TitleListSummary titles={person.titles} />}
        >
          <TitleList
            titles={person.titles}
            titleTypes={titleTypes}
            onChange={(titles) => cntx.update({ ...person, titles })}
          />
        </Panel>
        <Panel
          key={'id-list'}
          header={`IDs`}
          extra={person.personId.map((v, i) => (
            <span key={i}>
              <Text>{v.id} </Text>
              <Tag color='processing'>{v.type}</Tag>
            </span>
          ))}
        >
          <IdList
            ids={person.personId}
            idTypes={[]}
            onChange={(personId) => cntx.update({ ...person, personId })}
          />
        </Panel>
        <Panel
          key={'orcidID-list'}
          header={`Orcid IDs`}
          extra={person.orcidId.map((v, i) => (
            <span key={i}>
              <Tag color='processing'>{v}</Tag>{' '}
            </span>
          ))}
        >
          <OrcidIDList
            orcidIDs={person.orcidId}
            onChange={(orcidId) => cntx.update({ ...person, orcidId })}
          />
        </Panel>
        <Panel
          key={'link-list'}
          header={`Links`}
          extra={
            <Tag color='processing'>{`${person.links.length} link${
              person.links.length > 1 ? 's' : ''
            }`}</Tag>
          }
        >
          <LinkList
            links={person.links}
            linkTypes={linkTypes}
            onChange={(v) => cntx.update({ ...person, links: v })}
          />
        </Panel>
        <Panel
          key={'profile-information'}
          header={`Profile Information`}
          extra={
            <Tag color='processing'>{`${
              person.profileInformation.length
            } profile${person.profileInformation.length > 1 ? 's' : ''}`}</Tag>
          }
        >
          <ProfileInformationList
            profileInformations={person.profileInformation}
            profileInformationTypes={profileInformationTypes}
            onChange={(v) => cntx.update({ ...person, profileInformation: v })}
          />
        </Panel>
      </Collapse>
    </>
  );
};
